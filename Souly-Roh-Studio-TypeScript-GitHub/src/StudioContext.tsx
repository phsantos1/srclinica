import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';

export interface GalleryImage {
  src: string;
  caption: string;
}

function localDate(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** All form values stay in this browser. Sending through Instagram is manual. */
export function useStudioController() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [service, setService] = useState('');
  const [galleryImage, setGalleryImage] = useState<GalleryImage | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [today] = useState(localDate);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const requestRef = useRef<HTMLDialogElement>(null);
  const privacyRef = useRef<HTMLDialogElement>(null);
  const requestTextRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = (event: MediaQueryListEvent) => setMotionPaused(event.matches);
    document.addEventListener('keydown', onKey);
    media.addEventListener('change', onPreference);
    return () => {
      document.removeEventListener('keydown', onKey);
      media.removeEventListener('change', onPreference);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('motion-paused', motionPaused);
    document.documentElement.classList.toggle('motion-opted-in', !motionPaused);
    window.dispatchEvent(new CustomEvent('souly:motion', { detail: { paused: motionPaused } }));
    return () => {
      document.documentElement.classList.remove('motion-paused', 'motion-opted-in');
    };
  }, [motionPaused]);

  function openGallery(src: string, caption: string): void {
    setGalleryImage({ src, caption });
    lightboxRef.current?.showModal();
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      event.currentTarget.close();
  }

  function submitRequest(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string): string => String(data.get(key) ?? '').trim();
    const dateField = form.elements.namedItem('date');
    if (value('date') < today && dateField instanceof HTMLInputElement) {
      dateField.setCustomValidity('Escolha uma data a partir de hoje.');
      dateField.reportValidity();
      return;
    }
    const date = new Intl.DateTimeFormat('pt-BR').format(new Date(`${value('date')}T12:00:00`));
    setRequestMessage(
      `Olá! Conheci a Souly Roh Studio pelo site e gostaria de solicitar um atendimento.\n\nNome: ${value('name')}\nTelefone: ${value('phone')}\nServiço: ${value('service')}\nData desejada: ${date}\nPeríodo: ${value('period')}\nObservações: ${value('message') || 'Sem observações.'}\n\nAguardo a confirmação de disponibilidade.`,
    );
    setCopyStatus('');
    requestRef.current?.showModal();
  }

  async function copyRequest(): Promise<void> {
    try {
      await navigator.clipboard.writeText(requestMessage);
      setCopyStatus('Mensagem copiada. Agora abra o Instagram e envie ao studio.');
    } catch {
      requestTextRef.current?.focus();
      requestTextRef.current?.select();
      setCopyStatus('Selecione e copie a mensagem acima para enviar ao studio.');
    }
  }

  return {
    menuOpen,
    motionPaused,
    service,
    galleryImage,
    requestMessage,
    copyStatus,
    today,
    year: new Date().getFullYear(),
    lightboxRef,
    requestRef,
    privacyRef,
    requestTextRef,
    toggleMenu: () => setMenuOpen((open) => !open),
    closeMenu: () => setMenuOpen(false),
    toggleMotion: () => setMotionPaused((paused) => !paused),
    chooseService: (value: string) => setService(value),
    openPrivacy: () => privacyRef.current?.showModal(),
    clearDateError: (event: ChangeEvent<HTMLInputElement>) => event.target.setCustomValidity(''),
    openGallery,
    closeOnBackdrop,
    submitRequest,
    copyRequest,
  };
}

type StudioController = ReturnType<typeof useStudioController>;
export const StudioContext = createContext<StudioController | null>(null);
export function useStudio(): StudioController {
  const context = useContext(StudioContext);
  if (!context) throw new Error('Componente fora do contexto do studio.');
  return context;
}
