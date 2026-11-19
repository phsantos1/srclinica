# Souly Roh Studio — React + TypeScript

Landing page completa em **React 19, TypeScript e Vite**, pronta para um repositório GitHub e deploy automático no Netlify. O design e as funcionalidades da versão aprovada foram preservados.

## Enviar ao GitHub

1. Extraia o ZIP.
2. Crie um repositório no GitHub.
3. Envie **o conteúdo da pasta extraída**. `package.json`, `index.html`, `src`, `public` e `netlify.toml` devem aparecer na raiz do repositório.
4. Envie também `package-lock.json`, `.nvmrc`, `.gitignore` e `.github` (os dois últimos são ocultos em alguns sistemas).
5. Não envie o ZIP como único arquivo. Não envie `node_modules`.

## Publicar no Netlify pelo GitHub

1. No Netlify, escolha **Add new project → Import an existing project → GitHub**.
2. Autorize e selecione o repositório.
3. Deixe **Base directory vazio**, se os arquivos estiverem na raiz.
4. **Build command:** `npm run build`.
5. **Publish directory:** `dist`.
6. Publique. O arquivo `netlify.toml` já contém essas configurações e define Node 24.

Depois disso, alterações enviadas à branch de produção podem gerar novos deploys automaticamente. Não é necessária chave de API, variável de ambiente, banco de dados ou servidor para o fluxo atual.

> A pasta `public` é a origem das imagens e fontes. A pasta publicada pelo Netlify é **dist**, criada pelo build. Para este projeto TypeScript, não use `public` como diretório de publicação.

## Executar no computador

Use Node 24 (ou uma versão compatível a partir de 22.12).

```sh
npm ci
npm run dev
```

Para conferir a versão de produção:

```sh
npm run build
npm run preview
```

O build executa primeiro a checagem estrita de TypeScript. A automação em `.github/workflows/build.yml` também verifica instalação e build em pushes e pull requests.

## Arquivos principais

```text
src/
  App.tsx                 Composição da página
  StudioContext.tsx       Estado e eventos tipados do menu, galeria e formulário
  components/Sections.tsx Seções da página em React
  hooks/useVisualEffects.ts  Revelações, progresso e parallax com cleanup
  lib/glass.ts            WebGL tipado, pausa e fallback
  styles.css             Design aprovado e layouts responsivos
public/assets/           Logo, fotografias, arte editorial e fontes locais
index.html               Metadados e entrada do Vite
netlify.toml             Build e diretório de publicação
```

## Funcionalidades preservadas

- Menu responsivo, navegação por âncoras e links de contato.
- Galeria de três fotos com ampliação, fechamento e suporte a Escape.
- Formulário validado com pré-seleção de serviço, data mínima e revisão da mensagem.
- Cópia da solicitação com alternativa manual se a área de transferência for bloqueada.
- Links oficiais de Instagram e ligação telefônica.
- Política de privacidade em diálogo.
- Efeitos de vidro em desktop compatível, fallback estático no mobile e respeito a movimento reduzido.
- Todos os arquivos de imagem e fontes incluídos localmente.

**O agendamento prepara uma mensagem para envio manual pelo Instagram. Não envia e-mail, não envia mensagens automaticamente e não confirma uma reserva.** Não foi acrescentada uma integração WhatsApp sem confirmação do número.

## URL definitiva e metadados

Não há dependência do endereço anterior do ChatGPT Sites. Depois de definir seu domínio, você pode adicionar estas tags ao `head` de `index.html`, substituindo a URL pelo endereço real:

```html
<link rel="canonical" href="https://SEU-DOMINIO/" />
<meta property="og:url" content="https://SEU-DOMINIO/" />
<meta property="og:image" content="https://SEU-DOMINIO/assets/glass-hero.webp" />
```

Isso complementa o SEO/compartilhamento; não é necessário para o site carregar e funcionar. Imagens conceituais estão identificadas como editoriais. Cidade, estado, CEP e horários continuam aguardando confirmação do studio.

Referências técnicas: [Vite](https://vite.dev/guide/) e [Vite no Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/).
