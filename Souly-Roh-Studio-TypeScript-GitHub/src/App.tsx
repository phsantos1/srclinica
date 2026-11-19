import { useEffect, useRef } from 'react';
import {
  Header,
  Hero,
  Ribbon,
  Manifesto,
  Studio,
  Care,
  Experience,
  Massages,
  Gallery,
  Booking,
  Contact,
  Closing,
  Footer,
  GalleryDialog,
  RequestDialog,
  PrivacyDialog,
} from './components/Sections';
import { StudioContext, useStudioController } from './StudioContext';
import { useVisualEffects } from './hooks/useVisualEffects';
import { initializeGlass } from './lib/glass';

export default function App() {
  const studio = useStudioController();
  const pageRef = useRef<HTMLDivElement>(null);
  useVisualEffects(pageRef);
  useEffect(() => (pageRef.current ? initializeGlass(pageRef.current) : undefined), []);
  return (
    <StudioContext.Provider value={studio}>
      <div ref={pageRef}>
        <a className={'skip'} href={'#conteudo'}>
          {'Pular para o conteúdo'}
        </a>
        <div className={'progress'} aria-hidden={'true'}></div>
        <Header />
        <main id="conteudo">
          <Hero />
          <Ribbon />
          <Manifesto />
          <Studio />
          <Care />
          <Experience />
          <Massages />
          <Gallery />
          <Booking />
          <Contact />
          <Closing />
        </main>
        <Footer />
        <GalleryDialog />
        <RequestDialog />
        <PrivacyDialog />
      </div>
    </StudioContext.Provider>
  );
}
