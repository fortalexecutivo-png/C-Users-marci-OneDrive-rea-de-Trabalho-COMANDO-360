# Landing Page — Emyle Web Designer

Página de vendas de alta performance, estilo dark luxury com acento verde-limão, inspirada na referência visual da Behance enviada (Gabriel Web Designer).

## Arquivos
- `index.html` — estrutura completa da página
- `style.css` — design system e estilos de todas as seções
- `script.js` — navbar, acordeão FAQ, contagem animada, slider de depoimentos, reveal on scroll, botão flutuante WhatsApp
- `fonts/` — Inter e Bricolage Grotesque self-hosted (variable fonts, subset latin)
- `robots.txt`, `sitemap.xml` — arquivos de SEO técnico
- Fotos: `hero-photo`, `about-photo`, `portfolio-01` a `portfolio-04` (`.jpg` + `.webp` de cada)

## Pendências reais antes de publicar

### 1. Depoimentos fictícios (⚠️ importante)
Os depoimentos de "Marina Souza", "Rafael Lima" e "Camila Andrade" são textos de exemplo que eu criei — não são clientes reais. Apresentar depoimentos fictícios como reais pode configurar propaganda enganosa (CDC). **Troque por depoimentos reais (texto + nome + foto) antes de divulgar o site.**

### 2. Domínio (SEO)
Substitua **todas** as ocorrências de `[SEU_DOMINIO]` por seu domínio real (ex: `emyle.com.br`) em:
- `index.html` (canonical, og:url, og:image, schema JSON-LD)
- `robots.txt`
- `sitemap.xml`

Sem isso, o Open Graph (preview ao compartilhar no WhatsApp/Instagram/LinkedIn) e o canonical apontam para uma URL inválida.

### 3. Logo
O texto "Emyle." na navbar e no footer (classe `.logo`) é um placeholder estilizado. Se tiver uma logo em imagem, substitua o elemento mantendo a classe `.logo` para o espaçamento correto.

### 4. Gatilho de escassez (opcional)
Ainda não foi adicionado. Só vale a pena com um número real de capacidade mensal sua (ex: "só aceito 4 projetos novos por mês") — escassez falsa é dark pattern.

## SEO técnico implementado
- Title (51 caracteres) e meta description (154 caracteres) dentro dos limites recomendados
- Tag `canonical` e `og:url`
- `og:image` em URL absoluta (após substituir `[SEU_DOMINIO]`)
- Schema.org (JSON-LD): `ProfessionalService` com `AggregateRating`/`Review`, e `FAQPage` (rich snippets no Google)
- `robots.txt` e `sitemap.xml`
- Links internos do portfólio levam ao WhatsApp (sem `href="#"` morto)
- Menu de navegação cobre todas as seções, incluindo "O Problema"

## Performance
- Zero frameworks — HTML/CSS/JS puro
- **Fontes self-hosted** (`fonts/inter-latin-var.woff2` + `fonts/bricolage-latin-var.woff2`): zero requisições ao Google Fonts, `font-display: swap`, `preload` com `crossorigin`
- Imagens em **WebP** com fallback JPEG via `<picture>` (fotos) e `image-set()` (backgrounds CSS do portfólio) — ~30% menores
- Hero image com `fetchpriority="high"` + `preload`; demais imagens com `loading="lazy"`
- `font-variant-numeric: tabular-nums` nos contadores para evitar CLS durante a animação
- Animações 100% CSS, exceto contagem numérica e reveal (JS leve via Intersection Observer)

## Acessibilidade
- Contraste do texto cinza (`--color-gray: #a0a0a0`) testado em AAA (7:1+) contra os fundos do site
- Breakpoints em 1024px, 768px e 480px

## Como visualizar localmente
Basta abrir o `index.html` no navegador, ou rodar um servidor local simples:
```
npx serve .
```
