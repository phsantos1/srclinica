import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Scroll work is batched in one animation frame and removed on unmount. */
export function useVisualEffects(rootRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const header = root.querySelector<HTMLElement>('.header');
    const progress = root.querySelector<HTMLElement>('.progress');
    const ribbon = root.querySelector<HTMLElement>('.ribbon>div');
    const frames = Array.from(root.querySelectorAll<HTMLElement>('.gallery-frame'));
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('[data-parallax]'));
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = media.matches;
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    if (!paused && 'IntersectionObserver' in window) {
      document.documentElement.classList.add('motion-enabled');
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer?.unobserve(entry.target);
            }
        },
        { threshold: 0.08 },
      );
      root
        .querySelectorAll('.reveal,.image-reveal')
        .forEach((element) => observer?.observe(element));
    }

    function update(): void {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
      header?.classList.toggle('is-scrolled', scrollY > 70);
      if (paused) return;
      if (ribbon) {
        const rect = ribbon.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight)
          ribbon.style.transform = `translateX(${-scrollY * 0.035}px)`;
      }
      for (const element of frames) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= innerHeight) continue;
        const progress = Math.min(
          1,
          Math.max(0, ((innerHeight - rect.top) / (innerHeight + rect.height)) * 1.5),
        );
        element.style.setProperty('--gallery-inset', `${(1 - progress) * 6}%`);
        element.style.setProperty('--gallery-scale', String(1.13 - progress * 0.13));
      }
      for (const image of images) {
        const rect = image.parentElement?.getBoundingClientRect();
        if (!rect || rect.bottom <= 0 || rect.top >= innerHeight) continue;
        const offset =
          (innerHeight / 2 - rect.top - rect.height / 2) * Number(image.dataset.parallax);
        image.style.transform = `scale(1.12) translateY(${Math.max(-35, Math.min(35, offset))}px)`;
      }
    }
    function schedule(): void {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function motion(event: Event): void {
      paused = (event as CustomEvent<{ paused: boolean }>).detail.paused;
      schedule();
    }
    function preference(event: MediaQueryListEvent): void {
      paused = event.matches;
      schedule();
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('souly:motion', motion);
    media.addEventListener('change', preference);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('souly:motion', motion);
      media.removeEventListener('change', preference);
      document.documentElement.classList.remove('motion-enabled');
    };
  }, [rootRef]);
}
