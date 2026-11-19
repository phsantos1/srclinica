import { useStudio } from '../StudioContext';

export function Header() {
  const studio = useStudio();
  return (
    <header className={'header'}>
      <a className={'brand-logo'} href={'#inicio'} aria-label={'Souly Roh Studio, início'}>
        <img
          src={'/assets/souly-roh-mark.svg'}
          alt={'Logo oficial Souly Roh Studio'}
          width={288}
          height={288}
        />
        <span>
          {'SOULY ROH'}
          <span>{'BEAUTY, CARE & ESSENCE'}</span>
        </span>
      </a>
      <button
        className={'menu-toggle'}
        aria-controls={'navigation'}
        aria-expanded={studio.menuOpen}
        onClick={studio.toggleMenu}
      >
        {'Menu '}
        <span className={'menu-lines'} aria-hidden={'true'}></span>
      </button>
      <nav
        id={'navigation'}
        aria-label={'Navegação principal'}
        className={studio.menuOpen ? 'open' : undefined}
      >
        <a href={'#studio'} onClick={studio.closeMenu}>
          {'O Studio'}
        </a>
        <a href={'#cuidados'} onClick={studio.closeMenu}>
          {'Cuidados'}
        </a>
        <a href={'#experiencia'} onClick={studio.closeMenu}>
          {'Experiência'}
        </a>
        <a href={'#galeria'} onClick={studio.closeMenu}>
          {'Galeria'}
        </a>
        <a href={'#contato'} onClick={studio.closeMenu}>
          {'Contato'}
        </a>
      </nav>
      <a className={'button header-book'} href={'#agendamento'}>
        <span>{'Agendar um momento'}</span>
      </a>
    </header>
  );
}

export function Hero() {
  const studio = useStudio();
  return (
    <section className={'hero'} id={'inicio'}>
      <div className={'glass-stage'} aria-hidden={'true'}>
        <img
          id={'glass-source'}
          src={'/assets/glass-hero.webp'}
          alt={''}
          width={1536}
          height={1024}
          fetchPriority={'high'}
        />
        <canvas id={'glass-canvas'}></canvas>
      </div>
      <div className={'hero-title'}>
        <h1>
          <span className={'title-line'}>{'Sua beleza.'}</span>
          <span className={'title-line'}>
            <em>{'Seu momento.'}</em>
          </span>
        </h1>
      </div>
      <div className={'hero-bottom'}>
        <p>
          {'Um espaço dedicado ao cuidado,'}
          <br />
          {'à beleza e ao bem-estar.'}
          <br />
          <span>{'Sua beleza merece um momento só seu.'}</span>
        </p>
        <a className={'button champagne'} href={'#agendamento'}>
          <span>{'Reserve o seu momento'}</span>
        </a>
        <a className={'hero-discover'} href={'#manifesto'}>
          {'Explore o universo Souly Roh'}
          <span className={'vertical-rule'} aria-hidden={'true'}></span>
        </a>
      </div>
      <button
        className={'motion-toggle'}
        type={'button'}
        aria-pressed={studio.motionPaused}
        onClick={studio.toggleMotion}
      >
        {studio.motionPaused ? 'Ativar movimento' : 'Pausar movimento'}
      </button>
      <div className={'hero-image-note'}>{'COMPOSIÇÃO EDITORIAL · ARTE DIGITAL'}</div>
      <span className={'hero-side'} aria-hidden={'true'}>
        {'BEAUTY / CARE / ESSENCE'}
      </span>
    </section>
  );
}

export function Ribbon() {
  return (
    <div className={'ribbon'} aria-hidden={'true'}>
      <div>
        {'O TEMPO É SEU. '}
        <span>{'A BELEZA TAMBÉM.'}</span>
        {' O TEMPO É SEU. '}
        <span>{'A BELEZA TAMBÉM.'}</span>
      </div>
    </div>
  );
}

export function Manifesto() {
  return (
    <section className={'manifesto section'} id={'manifesto'}>
      <div className={'manifesto-layout'}>
        <div className={'manifesto-aside'}>
          <img
            src={'/assets/editorial.jpg'}
            alt={'Composição ilustrativa com cerâmica, flor e toalhas'}
            loading={'lazy'}
            width={1536}
            height={1024}
          />
          <span>{'O CUIDADO COMEÇA NA PAUSA.'}</span>
        </div>
        <div className={'manifesto-main'}>
          <h2 className={'reveal'}>
            {'O verdadeiro luxo'}
            <br />
            {'é dedicar '}
            <em>
              {'tempo'}
              <br />
              {'a você.'}
            </em>
          </h2>
          <div className={'manifesto-text reveal'}>
            <span className={'decor-rule'} aria-hidden={'true'}></span>
            <p>
              {
                'Em meio à rotina, existe um momento que merece ser inteiramente seu. Na Souly Roh Studio, acreditamos na beleza do autocuidado e na importância de reservar um tempo para si.'
              }
            </p>
            <p>
              {
                'Um convite para desacelerar, valorizar sua essência e transformar pequenos momentos em experiências especiais.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Studio() {
  return (
    <section className={'studio'} id={'studio'}>
      <figure className={'studio-photo image-reveal'}>
        <img
          src={'/assets/beauty-editorial.webp'}
          alt={
            'Fotografia editorial ilustrativa de um gesto delicado de autocuidado, com luz natural'
          }
          loading={'lazy'}
          width={1024}
          height={1536}
          data-parallax={'0.06'}
        />
        <figcaption>
          {'UM GESTO DE CUIDADO. UM ENCONTRO COM VOCÊ.'}
          <span>{'IMAGEM EDITORIAL ILUSTRATIVA'}</span>
        </figcaption>
      </figure>
      <div className={'studio-copy'}>
        <span className={'small-label'}>{'O STUDIO'}</span>
        <h2 className={'reveal'}>
          {'Sua essência.'}
          <br />
          {'Nosso '}
          <em>
            {'ponto'}
            <br />
            {'de partida.'}
          </em>
        </h2>
        <p className={'reveal'}>
          {
            'A Souly Roh Studio é um espaço dedicado à beleza, aos cuidados pessoais e ao bem-estar.'
          }
        </p>
        <p className={'reveal'}>
          {
            'Nossa proposta é valorizar cada momento de autocuidado, proporcionando uma experiência acolhedora e especial. Um espaço para valorizar sua essência.'
          }
        </p>
        <a className={'text-link'} href={'#contato'}>
          {'Conheça o studio '}
          <svg
            className={'action-icon'}
            viewBox={'0 0 20 20'}
            aria-hidden={'true'}
            focusable={'false'}
          >
            <path d={'M10 3v14M3 10h14'}></path>
          </svg>
        </a>
        <div className={'studio-detail'}>
          <img
            src={'/assets/cabelo-liso.webp'}
            alt={'Detalhe de trabalho de cabelo realizado no studio'}
            loading={'lazy'}
            width={654}
            height={803}
          />
          <p>
            {'Beleza que expressa.'}
            <br />
            {'Cuidado que acolhe.'}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Care() {
  const studio = useStudio();
  return (
    <section className={'care section'} id={'cuidados'}>
      <div className={'care-heading'}>
        <h2 className={'reveal'}>
          {'A arte de'}
          <br />
          <em>{'cuidar de você.'}</em>
        </h2>
        <p>
          {
            'Da beleza dos cabelos aos pequenos rituais de bem-estar. Conheça as experiências disponíveis na Souly Roh Studio.'
          }
        </p>
      </div>
      <div className={'service-panels'}>
        <a
          className={'service-panel service-hair'}
          href={'#agendamento'}
          data-service={'Cabelos'}
          onClick={() => studio.chooseService('Cabelos')}
        >
          <div className={'service-photo'}>
            <img
              src={'/assets/cabelo-ondas.webp'}
              alt={'Trabalho de cabelos com ondas e tons dourados'}
              loading={'lazy'}
              width={680}
              height={737}
            />
          </div>
          <div className={'service-title'}>
            <span className={'service-number'}>{'01'}</span>
            <h3>{'Cabelos'}</h3>
            <span className={'service-action'}>
              {'Conhecer os cuidados '}
              <svg
                className={'action-icon'}
                viewBox={'0 0 20 20'}
                aria-hidden={'true'}
                focusable={'false'}
              >
                <path d={'M10 3v14M3 10h14'}></path>
              </svg>
            </span>
          </div>
          <p>
            {'Movimento, beleza e expressão.'}
            <br />
            {'O cuidado encontra a sua identidade.'}
          </p>
        </a>
        <a
          className={'service-panel service-nails'}
          href={'#agendamento'}
          data-service={'Unhas'}
          onClick={() => studio.chooseService('Unhas')}
        >
          <div className={'service-photo'}>
            <img
              src={'/assets/unhas.webp'}
              alt={'Trabalho de unhas com esmalte escuro e brilho'}
              loading={'lazy'}
              width={798}
              height={856}
            />
          </div>
          <div className={'service-title'}>
            <span className={'service-number'}>{'02'}</span>
            <h3>{'Unhas'}</h3>
            <span className={'service-action'}>
              {'Conhecer os cuidados '}
              <svg
                className={'action-icon'}
                viewBox={'0 0 20 20'}
                aria-hidden={'true'}
                focusable={'false'}
              >
                <path d={'M10 3v14M3 10h14'}></path>
              </svg>
            </span>
          </div>
          <p>
            {'A beleza mora nos detalhes.'}
            <br />
            {'E acompanha cada gesto seu.'}
          </p>
        </a>
      </div>
      <div className={'wellness-editorial'}>
        <div className={'wellness-image image-reveal'}>
          <img
            src={'/assets/editorial.jpg'}
            alt={'Imagem ilustrativa de um ritual de pausa, com água, flor e toalhas'}
            loading={'lazy'}
            width={1536}
            height={1024}
          />
          <span>{'COMPOSIÇÃO EDITORIAL ILUSTRATIVA'}</span>
        </div>
        <div className={'wellness-copy'}>
          <span className={'service-number'}>{'03'}</span>
          <h3>
            {'Corpo leve.'}
            <br />
            <em>{'Mente presente.'}</em>
          </h3>
          <p>{'Conheça as opções de massagens e reserve um tempo para o seu bem-estar.'}</p>
          <a className={'text-link'} href={'#massagens'}>
            {'Encontre a sua pausa '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className={'experience'} id={'experiencia'}>
      <div className={'experience-intro'}>
        <span className={'small-label'}>{'THE ART OF SELF-CARE'}</span>
        <h2 className={'reveal'}>
          {'Mais do que beleza.'}
          <br />
          <em>
            {'Uma experiência'}
            <br />
            {'de cuidado.'}
          </em>
        </h2>
        <p>
          {'Um convite para estar presente.'}
          <br />
          {'Na sua pele. No seu tempo. Na sua vida.'}
        </p>
      </div>
      <div className={'experience-chapters'}>
        <article className={'chapter'}>
          <h3>
            {'Você,'}
            <br />
            <em>{'por inteiro.'}</em>
          </h3>
          <p>{'Uma experiência pensada para valorizar a individualidade de cada pessoa.'}</p>
        </article>
        <article className={'chapter'}>
          <h3>
            {'O tempo'}
            <br />
            <em>{'é seu.'}</em>
          </h3>
          <p>{'Um convite para reservar tempo para si e para o autocuidado.'}</p>
        </article>
        <article className={'chapter'}>
          <h3>
            {'Cuidado'}
            <br />
            <em>{'que acolhe.'}</em>
          </h3>
          <p>{'Beleza e cuidados pessoais em uma proposta acolhedora.'}</p>
        </article>
      </div>
      <img
        className={'experience-monogram'}
        src={'/assets/souly-roh-logo.png'}
        alt={''}
        aria-hidden={'true'}
        width={288}
        height={288}
      />
    </section>
  );
}

export function Massages() {
  const studio = useStudio();
  return (
    <section className={'massages section'} id={'massagens'}>
      <div className={'massage-heading'}>
        <h2 className={'reveal'}>
          {'Uma pausa.'}
          <br />
          <em>{'Novas sensações.'}</em>
        </h2>
        <p>
          {'Escolha o seu momento de pausa.'}
          <br />
          {'Consulte disponibilidade e valores atuais ao agendar.'}
        </p>
      </div>
      <div className={'massage-list'}>
        <a
          href={'#agendamento'}
          data-service={'Massagem relaxante'}
          onClick={() => studio.chooseService('Massagem relaxante')}
        >
          <span className={'massage-name'}>{'Massagem relaxante'}</span>
          <span className={'duration'}>{'50 MINUTOS'}</span>
          <span className={'massage-action'}>
            {'Consultar '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </span>
        </a>
        <a
          href={'#agendamento'}
          data-service={'Drenagem linfática'}
          onClick={() => studio.chooseService('Drenagem linfática')}
        >
          <span className={'massage-name'}>{'Drenagem linfática'}</span>
          <span className={'duration'}>{'50 MINUTOS'}</span>
          <span className={'massage-action'}>
            {'Consultar '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </span>
        </a>
        <a
          href={'#agendamento'}
          data-service={'Massagem desportiva'}
          onClick={() => studio.chooseService('Massagem desportiva')}
        >
          <span className={'massage-name'}>{'Massagem desportiva'}</span>
          <span className={'duration'}>{'50 MINUTOS'}</span>
          <span className={'massage-action'}>
            {'Consultar '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}

export function Gallery() {
  const studio = useStudio();
  return (
    <section className={'gallery section'} id={'galeria'}>
      <div className={'gallery-heading'}>
        <h2 className={'reveal'}>
          {'Nosso universo,'}
          <br />
          <em>{'em detalhes.'}</em>
        </h2>
        <div>
          <p>
            {'Beleza real. Diferentes expressões.'}
            <br />
            {'Um olhar para os trabalhos do studio.'}
          </p>
          <a
            className={'text-link'}
            href={'https://www.instagram.com/srsoulyrohstudio/'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            {'Acompanhe no Instagram '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </a>
        </div>
      </div>
      <div className={'gallery-grid'}>
        <button
          className={'gallery-item gallery-one'}
          data-image={'/assets/cabelo-liso.webp'}
          data-caption={'Cabelos · detalhes que valorizam'}
          onClick={() =>
            studio.openGallery('/assets/cabelo-liso.webp', 'Cabelos · detalhes que valorizam')
          }
        >
          <span className={'gallery-frame'}>
            <img
              src={'/assets/cabelo-liso.webp'}
              alt={'Ampliar foto de cabelo liso com penteado'}
              loading={'lazy'}
              width={654}
              height={803}
            />
          </span>
          <span className={'gallery-caption'}>
            {'CABELOS / DETALHES QUE VALORIZAM '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </span>
        </button>
        <div className={'gallery-quote'} aria-hidden={'true'}>
          {'O carinho'}
          <br />
          {'está em'}
          <br />
          <em>{'cada detalhe.'}</em>
        </div>
        <button
          className={'gallery-item gallery-two'}
          data-image={'/assets/unhas.webp'}
          data-caption={'Unhas · beleza em cada gesto'}
          onClick={() => studio.openGallery('/assets/unhas.webp', 'Unhas · beleza em cada gesto')}
        >
          <span className={'gallery-frame'}>
            <img
              src={'/assets/unhas.webp'}
              alt={'Ampliar foto de unhas com esmalte escuro'}
              loading={'lazy'}
              width={798}
              height={856}
            />
          </span>
          <span className={'gallery-caption'}>
            {'UNHAS / BELEZA EM CADA GESTO '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </span>
        </button>
        <button
          className={'gallery-item gallery-three'}
          data-image={'/assets/cabelo-ondas.webp'}
          data-caption={'Cabelos · movimento e leveza'}
          onClick={() =>
            studio.openGallery('/assets/cabelo-ondas.webp', 'Cabelos · movimento e leveza')
          }
        >
          <span className={'gallery-frame'}>
            <img
              src={'/assets/cabelo-ondas.webp'}
              alt={'Ampliar foto de cabelo ondulado'}
              loading={'lazy'}
              width={680}
              height={737}
            />
          </span>
          <span className={'gallery-caption'}>
            {'CABELOS / MOVIMENTO E LEVEZA '}
            <svg
              className={'action-icon'}
              viewBox={'0 0 20 20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              <path d={'M10 3v14M3 10h14'}></path>
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}

export function Booking() {
  const studio = useStudio();
  return (
    <section className={'booking section'} id={'agendamento'}>
      <div className={'booking-copy reveal'}>
        <span className={'small-label'}>{'SEU PRÓXIMO MOMENTO'}</span>
        <h2>
          {'Um momento'}
          <br />
          {'só seu.'}
          <br />
          <em>{'Vamos marcar?'}</em>
        </h2>
        <p>
          {
            'Conte o que você procura. Prepare sua solicitação e fale com a Souly Roh Studio para combinar os detalhes.'
          }
        </p>
        <a className={'phone'} href={'tel:+551136734965'}>
          {'(11) 3673-4965'}
        </a>
        <p className={'booking-note'}>
          {'Prefere conversar? Ligue para o studio ou envie uma mensagem pelo Instagram.'}
        </p>
      </div>
      <form id={'booking-form'} onSubmit={studio.submitRequest}>
        <div className={'field full'}>
          <label htmlFor={'name'}>{'Nome completo'}</label>
          <input
            id={'name'}
            name={'name'}
            autoComplete={'name'}
            required={true}
            minLength={3}
            maxLength={100}
            placeholder={'Como podemos chamar você?'}
          />
        </div>
        <div className={'field'}>
          <label htmlFor={'phone'}>{'Telefone'}</label>
          <input
            id={'phone'}
            name={'phone'}
            type={'tel'}
            autoComplete={'tel'}
            required={true}
            pattern={'[+\\(\\)0-9\\s\\-]{10,20}'}
            maxLength={20}
            placeholder={'(11) 99999-9999'}
          />
        </div>
        <div className={'field'}>
          <label htmlFor={'service'}>{'Seu cuidado de interesse'}</label>
          <select
            id={'service'}
            name={'service'}
            required={true}
            value={studio.service}
            onChange={(event) => studio.chooseService(event.target.value)}
          >
            <option value={''}>{'Selecione um cuidado'}</option>
            <option>{'Cabelos'}</option>
            <option>{'Unhas'}</option>
            <option>{'Massagem relaxante'}</option>
            <option>{'Drenagem linfática'}</option>
            <option>{'Massagem desportiva'}</option>
            <option>{'Quero conhecer as opções'}</option>
          </select>
        </div>
        <div className={'field'}>
          <label htmlFor={'date'}>{'Data de preferência'}</label>
          <input
            id={'date'}
            name={'date'}
            type={'date'}
            required={true}
            min={studio.today}
            onChange={studio.clearDateError}
          />
        </div>
        <div className={'field'}>
          <label htmlFor={'period'}>{'Período de preferência'}</label>
          <select id={'period'} name={'period'} required={true}>
            <option value={''}>{'Selecione o período'}</option>
            <option>{'Manhã'}</option>
            <option>{'Tarde'}</option>
            <option>{'Sem preferência'}</option>
          </select>
        </div>
        <div className={'field full'}>
          <label htmlFor={'message'}>
            {'Algo que gostaria de nos contar? '}
            <span>{'(opcional)'}</span>
          </label>
          <textarea
            id={'message'}
            name={'message'}
            rows={2}
            maxLength={1000}
            placeholder={'Compartilhe suas preferências'}
          ></textarea>
        </div>
        <button className={'button champagne full'} type={'submit'}>
          {'Preparar solicitação de agendamento'}
        </button>
        <p className={'form-note full'}>
          {
            'Você poderá copiar a solicitação e enviá-la pelo Instagram. O preenchimento não envia seus dados nem confirma uma reserva. '
          }
          <button
            className={'inline-button'}
            type={'button'}
            data-privacy={''}
            onClick={studio.openPrivacy}
          >
            {'Privacidade'}
          </button>
        </p>
      </form>
    </section>
  );
}

export function Contact() {
  return (
    <section className={'contact section'} id={'contato'}>
      <div>
        <h2 className={'reveal'}>
          {'O seu próximo'}
          <br />
          <em>{'encontro é aqui.'}</em>
        </h2>
        <p>{'Estamos esperando por você.'}</p>
      </div>
      <div className={'contact-details'}>
        <span className={'small-label'}>{'SOULY ROH STUDIO'}</span>
        <p className={'address'}>
          {'Rua Monte Alegre, 1086'}
          <br />
          <span>{'Sobreloja'}</span>
        </p>
        <a href={'tel:+551136734965'}>{'(11) 3673-4965'}</a>
        <a
          href={'https://www.instagram.com/srsoulyrohstudio/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          {'@srsoulyrohstudio'}
        </a>
        <p className={'contact-note'}>
          {'Entre em contato para orientações de chegada e horários de atendimento.'}
        </p>
        <a className={'text-link'} href={'tel:+551136734965'}>
          {'Falar com o studio '}
          <svg
            className={'action-icon'}
            viewBox={'0 0 20 20'}
            aria-hidden={'true'}
            focusable={'false'}
          >
            <path d={'M10 3v14M3 10h14'}></path>
          </svg>
        </a>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={'closing'}>
      <h2 className={'reveal'}>
        {'Permita-se'}
        <br />
        <em>{'florescer.'}</em>
      </h2>
      <div>
        <p>
          {'Permita-se viver a beleza de cuidar de você.'}
          <br />
          {'Seu próximo momento especial começa na Souly Roh Studio.'}
        </p>
        <a className={'button champagne'} href={'#agendamento'}>
          <span>{'Reserve o seu momento'}</span>
        </a>
      </div>
      <span className={'closing-note'}>{'BEAUTY, CARE & ESSENCE.'}</span>
    </section>
  );
}

export function Footer() {
  const studio = useStudio();
  return (
    <footer>
      <img
        className={'footer-monogram'}
        src={'/assets/souly-roh-logo.png'}
        alt={''}
        aria-hidden={'true'}
        width={288}
        height={288}
      />
      <div className={'footer-top'}>
        <a className={'footer-wordmark'} href={'#inicio'}>
          {'souly roh'}
          <span>{'STUDIO'}</span>
        </a>
        <p>
          {'Beleza que acolhe.'}
          <br />
          {'Cuidado que valoriza sua essência.'}
        </p>
        <nav aria-label={'Redes e contato'}>
          <a
            href={'https://www.instagram.com/srsoulyrohstudio/'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            {'Instagram'}
          </a>
          <a href={'tel:+551136734965'}>{'Telefone'}</a>
          <button className={'inline-button'} data-privacy={''} onClick={studio.openPrivacy}>
            {'Privacidade'}
          </button>
        </nav>
      </div>
      <div className={'footer-bottom'}>
        <span>
          {'© '}
          <span id={'year'}>{studio.year}</span>
          {' Souly Roh Studio.'}
        </span>
        <span>{'BEAUTY, CARE & ESSENCE.'}</span>
        <a href={'#inicio'}>{'Voltar ao início'}</a>
      </div>
    </footer>
  );
}

export function GalleryDialog() {
  const studio = useStudio();
  return (
    <dialog
      id={'lightbox'}
      className={'lightbox'}
      ref={studio.lightboxRef}
      onClick={studio.closeOnBackdrop}
    >
      <button
        className={'dialog-close'}
        aria-label={'Fechar imagem'}
        type={'button'}
        onClick={() => studio.lightboxRef.current?.close()}
      >
        <svg
          className={'close-icon'}
          viewBox={'0 0 24 24'}
          aria-hidden={'true'}
          focusable={'false'}
        >
          <path d={'m6 6 12 12M18 6 6 18'}></path>
        </svg>
      </button>
      <img src={studio.galleryImage?.src} alt={studio.galleryImage?.caption ?? ''} />
      <p>{studio.galleryImage?.caption}</p>
    </dialog>
  );
}

export function RequestDialog() {
  const studio = useStudio();
  return (
    <dialog id={'request-dialog'} ref={studio.requestRef} onClick={studio.closeOnBackdrop}>
      <button
        className={'dialog-close'}
        aria-label={'Fechar solicitação'}
        type={'button'}
        onClick={() => studio.requestRef.current?.close()}
      >
        <svg
          className={'close-icon'}
          viewBox={'0 0 24 24'}
          aria-hidden={'true'}
          focusable={'false'}
        >
          <path d={'m6 6 12 12M18 6 6 18'}></path>
        </svg>
      </button>
      <h2>
        {'Vamos combinar'}
        <br />
        <em>{'os detalhes?'}</em>
      </h2>
      <p>
        {
          'Copie a mensagem abaixo e envie pelo Instagram do studio. A equipe confirmará a disponibilidade.'
        }
      </p>
      <label htmlFor={'request-text'}>{'Sua solicitação'}</label>
      <textarea
        id={'request-text'}
        readOnly={true}
        rows={9}
        value={studio.requestMessage}
        ref={studio.requestTextRef}
      ></textarea>
      <div className={'dialog-actions'}>
        <button
          className={'button'}
          id={'copy-request'}
          type={'button'}
          onClick={studio.copyRequest}
        >
          {'Copiar solicitação'}
        </button>
        <a
          className={'button outline'}
          href={'https://www.instagram.com/srsoulyrohstudio/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          {'Abrir Instagram'}
        </a>
      </div>
      <p id={'copy-status'} aria-live={'polite'}>
        {studio.copyStatus}
      </p>
      <a className={'text-link'} href={'tel:+551136734965'}>
        {'Ou ligue: (11) 3673-4965'}
      </a>
    </dialog>
  );
}

export function PrivacyDialog() {
  const studio = useStudio();
  return (
    <dialog id={'privacy-dialog'} ref={studio.privacyRef} onClick={studio.closeOnBackdrop}>
      <button
        className={'dialog-close'}
        aria-label={'Fechar privacidade'}
        type={'button'}
        onClick={() => studio.privacyRef.current?.close()}
      >
        <svg
          className={'close-icon'}
          viewBox={'0 0 24 24'}
          aria-hidden={'true'}
          focusable={'false'}
        >
          <path d={'m6 6 12 12M18 6 6 18'}></path>
        </svg>
      </button>
      <h2>
        {'Seu cuidado.'}
        <br />
        <em>{'Seus dados.'}</em>
      </h2>
      <p>
        {
          'Os dados preenchidos neste formulário são usados apenas no seu navegador para montar a mensagem de solicitação. Esta página não armazena nem envia esses dados a um servidor.'
        }
      </p>
      <p>
        {
          'Se você escolher enviar a mensagem pelo Instagram ou entrar em contato por telefone, os dados serão compartilhados por sua iniciativa com o studio. O Instagram aplica suas próprias regras de privacidade.'
        }
      </p>
      <p>
        {
          'A página não utiliza cookies de análise ou publicidade. As fontes são hospedadas junto à página, sem conexão externa para carregá-las.'
        }
      </p>
      <p>
        {
          'Para esclarecer o tratamento de dados após o contato, fale com a Souly Roh Studio pelo (11) 3673-4965.'
        }
      </p>
    </dialog>
  );
}
