# Layout — Previ Serviços Previdenciários

> Especificação completa para `/desenvolver`. Design aprovado: Versão 2 (Poster + Bento Box), fontes **Fraunces + Outfit**, paleta Previ. Este documento cobre TODAS as seções da página, na ordem de scroll. Hero e "Quem Somos" já existem em código (`index.html`/`style.css` atuais) — aqui eles são re-especificados com precisão total e com o efeito de paralaxe solicitado, para servir de base consistente ao resto da página.

---

## Design Tokens (usar em TODA a página, sem exceção)

### Cores

| Token | Hex | Uso |
|---|---|---|
| `--color-navy` | `#2F4B74` | Marca principal, fundos escuros, texto sobre claro em destaques |
| `--color-navy-deep` | `#1D3355` | Fundos escuros secundários, texto sobre dourado |
| `--color-navy-darker` | `#16273F` | Stop mais escuro de gradientes navy, seções "dor" |
| `--color-gray` | `#E6E6E6` | Neutro de apoio (cards, divisores) |
| `--color-gold` | `#D8A658` | Acento primário, CTAs, ícones-chave |
| `--color-gold-2` | `#D9AC5D` | Gradiente dourado (stop 1) |
| `--color-gold-3` | `#E2BD70` | Gradiente dourado (stop 2), hover de CTA |
| `--color-gold-4` | `#EFDD93` | Gradiente dourado (stop 3), texto dourado sobre navy |
| `--color-bg` | `#FBFAF7` | Fundo padrão das seções claras |
| `--color-bg-alt` | `#F1EFE9` | Fundo alternado (zebra entre seções) |
| `--color-text` | `#23324A` | Corpo de texto sobre fundo claro |
| `--color-text-muted` | `#5C6C82` | Texto secundário sobre fundo claro |
| `--color-text-on-navy` | `#F3F1EC` | Texto principal sobre fundo navy |
| `--color-text-on-navy-muted` | `#B9C3D4` | Texto secundário sobre fundo navy |
| `--color-border` | `#E1DCCE` | Bordas sutis sobre fundo claro |

### Tipografia

- Heading: **Fraunces** (`ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500`) — pesos 400/500/600, itálico 500
- Body: **Outfit** (`wght@400;500;600;700`)
- `h1–h6` sempre `font-family: var(--font-heading); font-weight: 500; line-height: 1.1`

### Espaçamento e Grid

- `--section-py: clamp(4rem, 10vw, 8rem)`
- `--container-px: clamp(1.25rem, 5vw, 2.5rem)`
- `--container-max: 1240px`
- Seções alternam fundo `--color-bg` / `--color-bg-alt` / navy, criando ritmo de "zebra" ao longo do scroll (especificado por seção abaixo)

### Easing padrão (usar consistentemente)

- **Reveal de scroll (AOS/custom):** `cubic-bezier(0.16, 1, 0.3, 1)`, 700–900ms
- **Hover/interação:** `cubic-bezier(0.4, 0, 0.2, 1)`, 250–400ms
- **Parallax:** sem easing (transform ligado diretamente ao scroll, atualizado via `requestAnimationFrame`)

### Breakpoints

- Desktop: `> 1024px`
- Tablet: `641px – 1024px`
- Mobile: `≤ 640px`
- Testar sempre em 375px, 768px e 1440px

---

## Seção 0: Header / Navegação

### Arquétipo e Constraints
- Arquétipo: **Sticky Element** (Baseado em Camadas/Interação)
- Constraints: Transparent Background (Cor), Sticky Element (Layout), Hover Underline (Interação)
- Justificativa: em uma página institucional de longo prazo, um header discreto que não compete com o hero (transparente sobre ele) mas ganha solidez ao rolar dá orientação sem quebrar o impacto do Poster.

### Conteúdo
- Logo/wordmark: "PREVI" (Fraunces 600) + "Serviços Previdenciários" (Outfit 400, menor, abaixo ou ao lado)
- Links: Quem Somos · Serviços · Como Funciona · Equipe · FAQ
- CTA no header: "Fale Conosco" (botão outline dourado)

### Layout
- `position: fixed; top: 0; inset-inline: 0; z-index: 100`
- Altura: `88px` sobre o hero → `64px` quando `scrolled` (classe `.header--scrolled`)
- Container interno: `display:flex; justify-content:space-between; align-items:center; max-width: var(--container-max); padding-inline: var(--container-px)`
- Estado inicial (sobre o hero): `background: transparent`, texto em `--color-navy-deep` (o hero começa em fundo claro nesta versão, então o texto do header permanece escuro desde o início — não precisa alternar cor, só fundo)

### Tipografia
- Logo "PREVI": Fraunces 600, `1.35rem`, `letter-spacing: 0.02em`, `color: var(--color-navy-deep)`
- "Serviços Previdenciários": Outfit 500, `0.65rem`, uppercase, `letter-spacing: 0.14em`, `color: var(--color-gold)`
- Links de navegação: Outfit 500, `0.9rem`, `color: var(--color-navy)`

### Cores
- Fundo inicial: `transparent`
- Fundo scrolled (`scrollY > 80px`): `rgba(251, 250, 247, 0.85)` + `backdrop-filter: blur(12px)` + `box-shadow: 0 1px 0 var(--color-border)`
- CTA outline: `border: 1.5px solid var(--color-gold); color: var(--color-navy-deep)`; hover → `background: var(--color-gold); color: var(--color-navy-deep)`

### Elementos Visuais
- Nenhum elemento decorativo — o header deve ser o elemento mais "quieto" da página

### Animações
- Transição de fundo/altura: `transition: background 300ms ease, height 300ms ease, box-shadow 300ms ease`, disparada por scroll listener (`scrollY > 80` toggla `.header--scrolled`), throttled via `requestAnimationFrame`
- Sem animação de entrada (o header já nasce visível, como o hero)

### Interatividade
- Links: `hover-underline` — pseudo-elemento `::after` largura 0→100% em `220ms cubic-bezier(0.4,0,0.2,1)`, cor `var(--color-gold)`
- Scroll suave (`html { scroll-behavior: smooth }`) ao clicar em âncoras do menu
- Menu mobile: hambúrguer que abre um painel full-screen navy (`--color-navy-deep`) com links grandes em Fraunces, `X` para fechar, `aria-expanded` sincronizado

### Responsividade
- `≤ 1024px`: esconder links de navegação, mostrar botão hambúrguer + CTA "Fale Conosco" compacto (apenas ícone WhatsApp em `≤640px`)
- Painel mobile: `position: fixed; inset: 0; background: var(--color-navy-deep); display:flex; flex-direction:column; justify-content:center; align-items:flex-start; padding: 2rem`

---

## Seção 1: Hero (existente — especificação completa + Paralaxe)

### Arquétipo e Constraints
- Arquétipo: **Poster** (Baseado em Tipografia) — já aprovado
- Constraints: Diagonal Divider (Layout), Color Blocking (Cor), Mixed Weights (Tipografia), **+ Parallax Layers (Mídia/Movimento) — adicionado nesta especificação a pedido do cliente**

### Conteúdo
- Eyebrow: "Previ · Serviços Previdenciários desde 1996"
- Headline: `A aposentadoria certa <em>não</em> é sorte. <strong>É análise técnica.</strong>`
- Subheadline: "Conforme a Reforma da Previdência (EC 103/2019), conduzida por quem já esteve dos dois lados do balcão: ex-servidor do INSS, ex-auditor fiscal da Receita Federal e advogadas especialistas em direito previdenciário."
- CTA: "Quero Minha Análise Previdenciária" → `#contato`
- Stat: "+1.000 planejamentos previdenciários já elaborados" (contador 0→1000)

### Layout
- `.hero__top`: container, `padding-top: clamp(4.5rem, 12vh, 7rem)`, `padding-bottom: clamp(3rem, 8vw, 5rem)`
- `.hero__headline`: `max-width: 16ch`
- `.hero__band`: `min-height: 46vh`, `display:flex; align-items:center`, contém duas camadas absolutas (`hero__band-seam` dourada, `hero__band-fill` navy) recortadas com `clip-path: polygon(0 5%, 100% 0%, 100% 100%, 0 100%)`, offset vertical de `7px` entre as duas para criar o friso dourado
- `.hero__band-inner`: grid `1.4fr 1fr`, gap `clamp(2rem, 5vw, 4rem)`, `align-items: end`

### Tipografia
- Headline: Fraunces 400, `clamp(2.75rem, 7vw, 6rem)`, `line-height: 1.05`, `letter-spacing: -0.01em`, `color: var(--color-navy-deep)`
  - `<em>`: itálico, peso 500, `color: var(--color-text-muted)` (contraste de peso/estilo — Mixed Weights)
  - `<strong>` (equivalente a `.hero__headline-strong`): peso 600, `color: var(--color-navy)`
- Subheadline: Outfit 400, `clamp(1.05rem, 1.4vw, 1.2rem)`, `color: var(--color-text-on-navy-muted)`, `max-width: 48ch`
- Stat number: Fraunces 500, `2.25rem`, `color: var(--color-gold-4)`

### Cores
- Fundo superior: `var(--color-bg)`
- Faixa: seam `linear-gradient(100deg, var(--color-gold) 0%, var(--color-gold-4) 100%)`; fill `radial-gradient(120% 160% at 85% 0%, var(--color-navy) 0%, var(--color-navy-deep) 60%, var(--color-navy-darker) 100%)`

### Elementos Visuais
- Nenhuma foto (ainda não há banco de imagens da cliente) — identidade 100% tipográfica + geométrica, conforme aprovado na V2
- Friso dourado de 7px entre as duas camadas do `hero__band` é o único elemento decorativo

### Animações — PARALAXE (novo, solicitado pelo cliente)

O hero deve permanecer **instantâneo** ao carregar (sem fade/opacity:0 — regra do framework). A paralaxe é um efeito **pós-carregamento, ligado ao scroll**, ativo apenas enquanto o hero está no viewport.

**Camadas e fatores de deslocamento** (`translate3d`, GPU-accelerated):

| Elemento | Fator | Direção | Observação |
|---|---|---|---|
| `.hero__top` (eyebrow + headline) | `scrollY * 0.08` | para cima (`translateY(-Y)`) | leve atraso em relação ao scroll real — sensação de profundidade |
| `.hero__band-fill` | `scrollY * 0.18` | para baixo (`translateY(+Y)`) | a camada navy "atrasa" em relação ao topo |
| `.hero__band-seam` | `scrollY * 0.26` | para baixo (`translateY(+Y)`) | mais lenta ainda que o fill → o friso dourado **engrossa visualmente** conforme desce, reforçando a sensação de camadas |

**Implementação (JS, `script.js`):**
```javascript
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const top = document.querySelector('.hero__top');
  const fill = document.querySelector('.hero__band-fill');
  const seam = document.querySelector('.hero__band-seam');
  if (!hero || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let heroActive = true;
  let ticking = false;

  const observer = new IntersectionObserver(([entry]) => {
    heroActive = entry.isIntersecting;
  }, { threshold: 0 });
  observer.observe(hero);

  function update() {
    if (heroActive) {
      const y = window.scrollY;
      top.style.transform = `translate3d(0, ${-y * 0.08}px, 0)`;
      fill.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      seam.style.transform = `translate3d(0, ${y * 0.26}px, 0)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}
```
- Chamar `initHeroParallax()` no `DOMContentLoaded`, junto com `initAOS`, `initCounters`, `initYear`
- **Progressive enhancement opcional:** onde suportado, usar `animation-timeline: view()` em CSS puro como alternativa nativa; manter o JS acima como fallback universal (Safari/Firefox ainda com suporte parcial a scroll-timelines em 2026)
- `will-change: transform` em `.hero__top`, `.hero__band-fill`, `.hero__band-seam`
- **Respeitar `prefers-reduced-motion: reduce`**: a função retorna cedo e nenhum transform é aplicado — o hero permanece estático

### Interatividade
- CTA `.btn--gold`: hover `translateY(-2px)`, `box-shadow: 0 12px 28px -8px rgba(216,166,88,0.7)`, `250ms cubic-bezier(0.4,0,0.2,1)`
- Contador do stat: anima de 0 a 1000 (sufixo "+") via `IntersectionObserver` (threshold 0.4), `1400ms`, easing `easeOutCubic` (`1 - Math.pow(1-progress, 3)`) — já implementado em `script.js`

### Responsividade
- `≤ 1024px`: `.hero__band-inner` vira 1 coluna (`grid-template-columns: 1fr`), `align-items: start`
- `≤ 640px`: `.hero__headline { max-width: none }`, `.hero__band { min-height: auto }`, `.hero__actions { width: 100% }`
- **Paralaxe em mobile:** manter ativo, mas reduzir todos os fatores em 50% (`* 0.5`) via checagem `matchMedia('(max-width: 640px)')` — em telas pequenas o efeito precisa ser mais sutil para não causar jitter percebido durante o scroll por toque

---

## Seção 2: Quem Somos (existente — Bento Box)

### Arquétipo e Constraints
- Arquétipo: **Bento Box** (Baseado em Grid) — já aprovado
- Constraints: Duocromático (Cor), Noise Texture (Efeitos Especiais), Stagger (Movimento)

### Conteúdo
- Célula texto: "Décadas de dedicação exclusiva à previdência." + parágrafo institucional (1996, escritórios BH/Santa Luzia, atendimento nacional/internacional)
- Célula dourada: "1996" / "Ano de fundação"
- Célula navy: "+1.000" / "Planejamentos previdenciários elaborados"
- Célula quote: "Nossa maior alegria profissional é buscar o melhor benefício para o segurado." — Dra. Bruna Clarindo, OAB/MG 144.232
- Célula branca: "2" / "Escritórios — Belo Horizonte e Santa Luzia (MG)"

### Layout
- `.bento`: `grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(160px, auto); gap: 1.25rem`
- `.bento__cell--text`: `grid-column: span 2; grid-row: span 2`
- `.bento__cell--quote`: `grid-column: span 2`

### Tipografia
- `.bento__heading`: Fraunces 500, `clamp(1.75rem, 2.6vw, 2.25rem)`, `max-width: 16ch`
- `.bento__value`: Fraunces 500, `clamp(2rem, 3vw, 2.5rem)`
- `.bento__quote`: Fraunces itálico 500, `clamp(1.1rem, 1.6vw, 1.3rem)`

### Cores
- Fundo da seção: `var(--color-bg-alt)`
- Célula dourada: `linear-gradient(150deg, var(--color-gold) 0%, var(--color-gold-3) 100%)`
- Célula navy: `linear-gradient(150deg, var(--color-navy) 0%, var(--color-navy-deep) 100%)`, valor em `--color-gold-4`
- Demais células: `#FFFFFF`, borda `var(--color-border)`

### Elementos Visuais
- `::after` com noise SVG (`feTurbulence`, `baseFrequency 0.85`), `opacity: 0.05`, `mix-blend-mode: overlay` em todas as células

### Animações
- `data-aos="fade-up"` por célula, delays escalonados `0/80/160/240/320ms` (Stagger)
- Contadores (1996, 1000+, 2) animam via `IntersectionObserver`, mesmo mecanismo do hero

### Interatividade
- Nenhum hover elaborado nesta seção (propositalmente "quieta" após o impacto do hero)

### Responsividade
- `≤ 1024px`: `grid-template-columns: repeat(2, 1fr)`; `.bento__cell--text` e `.bento__cell--quote` mantêm `grid-column: span 2`
- `≤ 640px`: 1 coluna; todas as células `grid-column: span 1`

---

## Seção 3: O Problema

### Arquétipo e Constraints
- Arquétipo: **Spotlight** (Baseado em Foco)
- Constraints: Dark Mode (Cor), Text Reveal (Movimento), Vignette (Efeitos Especiais)
- Justificativa: depois do ritmo denso do Bento Box, uma pausa escura e quase vazia — só uma pergunta — cria tensão antes de apresentar a solução. Contraste emocional deliberado.

### Conteúdo
- Título (a pergunta central): "As regras da aposentadoria mudaram. Você sabe qual é o seu melhor caminho?"
- Corpo: "Desde a Reforma da Previdência, calcular o momento certo e a modalidade mais vantajosa de aposentadoria ficou mais complexo. Erros de cadastro, tempo de contribuição mal contado ou a escolha da regra errada podem significar anos de espera a mais — ou um benefício menor do que você teria direito."

### Layout
- `min-height: 72vh; display:flex; align-items:center; justify-content:center; text-align:center`
- Container estreito: `max-width: 780px; margin-inline: auto; padding-inline: var(--container-px)`

### Tipografia
- Título: Fraunces 500, `clamp(2rem, 4.5vw, 3.25rem)`, `line-height: 1.2`, `color: var(--color-text-on-navy)`
- Corpo: Outfit 400, `clamp(1.05rem, 1.3vw, 1.15rem)`, `color: var(--color-text-on-navy-muted)`, `margin-top: 2rem`, `max-width: 58ch; margin-inline: auto`

### Cores
- Fundo: `radial-gradient(80% 100% at 50% 30%, var(--color-navy-deep) 0%, var(--color-navy-darker) 100%)`
- Vinheta: `::after` absoluto, `background: radial-gradient(60% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)`, `pointer-events: none`

### Elementos Visuais
- Nenhuma imagem — o "spotlight" é puramente tipográfico e de luz/sombra (vinheta)
- Palavra "mudaram" no título recebe `.text-gradient-gold` (mesmo utilitário já definido)

### Animações
- **Text Reveal** ao entrar em viewport: título dividido em `<span>` por linha (via JS, `splitLines()`), cada linha revelada com `clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)`, `700ms cubic-bezier(0.16,1,0.3,1)`, stagger de `90ms` entre linhas, disparado por `IntersectionObserver` (threshold 0.3, `once: true` — mesma filosofia do AOS, mas custom porque precisa dividir por linha)
- Corpo: `data-aos="fade-up"` `data-aos-delay="300"`

### Interatividade
- Nenhuma — seção contemplativa, sem CTA (o CTA vem na seção seguinte, como resposta ao problema)

### Responsividade
- `≤ 640px`: `min-height: 60vh`, título `clamp(1.75rem, 7vw, 2.5rem)`

---

## Seção 4: A Solução — Planejamento Previdenciário

### Arquétipo e Constraints
- Arquétipo: **Timeline** (Estruturas Especiais)
- Constraints: Draw SVG (Movimento — linha conectora desenhada ao scroll), Selective Color (Cor — apenas os números em dourado), Asymmetric Padding (Layout)
- Justificativa: o conteúdo original é um parágrafo denso de processo técnico — transformar em 5 etapas numeradas conectadas por uma linha viva evita bullet list genérica e comunica "processo profissional" visualmente.

### Conteúdo
- Eyebrow: "O que é o Planejamento Previdenciário"
- Título: "Um raio-x completo da sua vida contributiva"
- Intro: "Uma análise técnica e criteriosa da sua situação junto ao INSS, em conformidade com a legislação atual (EC 103/2019)."
- 5 etapas da timeline:
  1. Regularização de cadastro
  2. Contagem do tempo de contribuição/serviço
  3. Identificação de períodos com recolhimentos em atraso (dentro ou fora da decadência)
  4. Cálculo de todas as opções de aposentadoria, incluindo projeções com contribuições a recolher
  5. Apresentação clara das opções: valor estimado do benefício (RMI), investimento necessário e tempo de retorno

### Layout
- Título + intro: coluna esquerda estreita, `max-width: 34ch`, `position: sticky; top: 7rem` em desktop (fica visível enquanto a timeline rola ao lado)
- Grid: `display:grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(2rem, 6vw, 5rem)`
- Timeline: coluna direita, `padding-left: 2.5rem`, linha vertical (`::before`, `width:2px`) a `1.1rem` da esquerda
- Cada etapa: `padding-block: 2rem`, número grande sobreposto à linha (`position:absolute; left:-0.4rem`, `background:var(--color-bg)` para "cortar" a linha por trás do número)

### Tipografia
- Título: Fraunces 500, `clamp(1.9rem, 3.2vw, 2.6rem)`
- Número de cada etapa: Fraunces 500, `1.75rem`, `color: var(--color-gold)`
- Texto de cada etapa: Outfit 400, `1.05rem`, `color: var(--color-text)`

### Cores
- Fundo: `var(--color-bg)`
- Linha da timeline: `var(--color-border)` (neutra) — só os números recebem cor (Selective Color)
- Etapa "ativa" (a que está cruzando o centro do viewport durante o scroll): número ganha `background: var(--color-gold); color: var(--color-navy-deep); border-radius:50%` (destaque temporário)

### Elementos Visuais
- Linha vertical conectora desenhada com **Draw SVG**: `<svg>` absoluto sobrepondo a coluna, `<path>` vertical com `stroke-dasharray`/`stroke-dashoffset` animado de 100%→0% conforme o scroll atravessa a seção (via `animation-timeline: view()` com fallback JS de `stroke-dashoffset` proporcional ao scroll)

### Animações
- Cada etapa: `data-aos="fade-up"` `data-aos-delay` incremental de `100ms`
- Linha SVG: desenha progressivamente acompanhando o scroll (não é um "fade" — é literalmente o traço crescendo), `stroke: var(--color-gold)`, `stroke-width: 2`
- Número "ativo": transição de cor `300ms ease` ao entrar na faixa central do viewport (via `IntersectionObserver` com `rootMargin: "-45% 0px -45% 0px"`)

### Interatividade
- Hover em cada etapa: `background: var(--color-bg-alt)` sutil no bloco inteiro, `200ms`

### Responsividade
- `≤ 1024px`: grid vira 1 coluna, título deixa de ser `sticky`, timeline ocupa largura total
- `≤ 640px`: números reduzem para `1.4rem`, `padding-left: 2rem`

---

## Seção 5: Nossos Serviços

### Arquétipo e Constraints
- Arquétipo: **Scroll Horizontal** (Baseado em Fluxo)
- Constraints: Scroll Snap (Interação), Bleed Right (Layout), Color Blocking (Cor)
- Justificativa: 13 serviços em lista viraria "grid simétrico de features" (proibido). Uma galeria horizontal com scroll-snap trata os serviços como um catálogo navegável, não uma lista burocrática.

### Conteúdo
Título: "Atuação completa em direito e consultoria previdenciária"

13 cards (um por serviço, texto exato da copy):
Aposentadoria por idade · Aposentadoria por tempo de contribuição · Aposentadoria por invalidez · Aposentadoria especial (PPP) · Aposentadoria rural · Pensão por morte · Benefícios por incapacidade · Benefícios assistenciais (BPC/LOAS) · Certidão de Tempo de Contribuição (CTC) · Acerto de vínculos e remunerações · Atualização de cadastro no INSS · Revisões e ações judiciais · Palestras previdenciárias para empresas

### Layout
- Título: container normal, `margin-bottom: 3rem`
- Trilho de cards: `display:flex; gap:1.25rem; overflow-x:auto; scroll-snap-type: x mandatory; padding-inline: var(--container-px); padding-bottom: 1.5rem` — **sem** `container` (Bleed Right: o trilho vaza a margem direita da viewport, `width: 100vw` relativo ao body)
- Cada card: `flex: 0 0 clamp(240px, 28vw, 300px); scroll-snap-align: start; aspect-ratio: 4/5`
- Scrollbar customizada: barra fina dourada (`::-webkit-scrollbar`, altura 4px, `background: var(--color-gold)`, trilho `var(--color-border)`)

### Tipografia
- Título da seção: Fraunces 500, `clamp(1.9rem, 3vw, 2.5rem)`
- Nome do serviço (dentro do card): Fraunces 500, `1.35rem`, `line-height:1.25`
- Índice do card ("01"–"13"): Outfit 600, `0.8rem`, `color: var(--color-gold)`

### Cores
- Fundo da seção: `var(--color-bg-alt)`
- Cards em **Color Blocking**: alternam entre 3 tratamentos em sequência cíclica (a cada 3 cards): (1) fundo `#FFFFFF` + borda `var(--color-border)`, texto navy; (2) fundo `linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-deep) 100%)`, texto `var(--color-text-on-navy)`; (3) fundo `linear-gradient(160deg, var(--color-gold) 0%, var(--color-gold-3) 100%)`, texto `var(--color-navy-deep)`

### Elementos Visuais
- Sem ícones (evitar "grid de features com ícone" mesmo dentro dos cards) — cada card é só índice numérico + nome do serviço + espaço negativo generoso
- Setas de navegação (desktop): dois botões circulares dourados flutuantes nas laterais do trilho, `opacity: 0` até `hover` na seção, `300ms`

### Animações
- Cards entram com `data-aos="fade-right"` `data-aos-delay` escalonado (`60ms` por card, máx 5 primeiros cards, os demais aparecem só ao rolar horizontalmente — não precisa animar o que está fora do viewport inicial)
- Scroll horizontal suave ao clicar nas setas: `scrollBy({ left: 320, behavior: 'smooth' })`

### Interatividade
- **Hover Lift** em cada card: `translateY(-6px)`, `box-shadow: 0 20px 40px -12px rgba(29,51,85,0.25)`, `350ms cubic-bezier(0.4,0,0.2,1)`
- Drag horizontal com mouse (desktop) além do scroll nativo: `cursor: grab` → `grabbing` durante arraste (implementar com `pointerdown/pointermove/pointerup`, sem bloquear o scroll nativo por touch)
- Setas: `hover-scale(1.08)`, `focus-visible` com outline dourado

### Responsividade
- `≤ 1024px`: cards `flex: 0 0 clamp(200px, 60vw, 260px)`, setas de navegação ocultas (usar apenas swipe nativo)
- `≤ 640px`: `gap: 0.85rem`, cards `flex-basis: 78vw` (quase full-bleed, 1 card + prévia do próximo)

---

## Seção 6: Como Funciona

### Arquétipo e Constraints
- Arquétipo: **Broken Grid** (Baseado em Grid)
- Constraints: Bleed Left (Layout), Mixed Weights (Tipografia — numeral gigante + legenda pequena), Reveal on Demand (Interação)
- Justificativa: 4 passos sequenciais ganham dinamismo quando não estão alinhados em grade perfeita — numerais grandes deslocados criam ritmo de leitura sem parecer "timeline" (já usada na Seção 4) nem "3 cards" (proibido).

### Conteúdo
Título: "Do primeiro contato ao seu planejamento em mãos"

1. Você entra em contato e explica sua situação
2. Assinatura do contrato e envio dos documentos
3. Nossa equipe realiza a análise técnica (prazo de 30 a 45 dias)
4. Entrega do planejamento com as opções de aposentadoria, valores e prazos

### Layout
- `display:grid; grid-template-columns: repeat(12, 1fr); gap: 1.5rem`
- Título: `grid-column: 1 / 7`
- Passo 1: `grid-column: 1 / 6; margin-top: 3rem` (offset para baixo — "quebra" do grid)
- Passo 2: `grid-column: 7 / 13`
- Passo 3: `grid-column: 2 / 8; margin-top: 4rem`
- Passo 4: `grid-column: 8 / 13; margin-top: 1rem`
- Passo 4 (bleed): estende `margin-right: calc(var(--container-px) * -1)` para sangrar levemente a margem direita (Bleed Left conceitual aplicado como assimetria geral do grid, não literalmente só à esquerda)

### Tipografia
- Numeral ("01"–"04"): Fraunces 400, `clamp(4rem, 8vw, 7rem)`, `color: var(--color-gold-3)`, `line-height: 0.85`, `opacity: 0.9` (Mixed Weights: peso leve mas tamanho extremo)
- Texto do passo: Outfit 500, `1.15rem`, `color: var(--color-navy-deep)`, `margin-top: -1rem` (sobrepõe levemente o numeral)

### Cores
- Fundo: `var(--color-bg)`
- Numerais em degradê dourado via `.text-gradient-gold`

### Elementos Visuais
- Nenhuma ilustração — o próprio numeral tipográfico gigante é o elemento gráfico
- Linha fina horizontal (`1px`, `var(--color-border)`) atrás dos numerais 2 e 4, apenas decorativa, `z-index: -1`

### Animações
- Cada passo: `data-aos="fade-up"` com delay `0/120/240/360ms`
- **Reveal on Demand**: ao clicar/tocar em um passo, expande um micro-detalhe extra abaixo do texto (ex.: passo 3 revela "Prazo pode variar conforme volume de documentos"), `max-height: 0 → auto` via `grid-template-rows: 0fr → 1fr` (técnica CSS Grid para altura animável), `400ms cubic-bezier(0.16,1,0.3,1)`

### Interatividade
- Passo clicável: `cursor: pointer`, numeral ganha `color: var(--color-gold)` sólido ao expandir
- Teclado: cada passo é um `<button>` semântico com `aria-expanded`

### Responsividade
- `≤ 1024px`: grid simplifica para `repeat(6, 1fr)`, cada passo ocupa `grid-column: span 6`, offsets verticais reduzidos pela metade
- `≤ 640px`: 1 coluna, numeral `clamp(3rem, 18vw, 4rem)`, sem offsets (`margin-top: 0`, exceto espaçamento padrão entre passos de `2.5rem`)

---

## Seção 7: Nossa Equipe

### Arquétipo e Constraints
- Arquétipo: **Layered** (Baseado em Camadas)
- Constraints: Imagem Duotone (Mídia), Overlap Elements (Layout), Hover Reveal (Interação)
- Justificativa: nomes reais com credenciais fortes (OAB, ex-INSS, ex-Receita Federal) merecem tratamento editorial — retrato + nome tipográfico sobreposto, mais memorável que um "grid de equipe" padrão.

> **Dependência de conteúdo:** esta seção assume 3 fotos reais (Antônio Medeiros, Dra. Bruna Clarindo, Dra. Eliana Leite Praça). Elas não existem ainda em `/images/`. Enquanto não forem fornecidas, usar os blocos de cor sólida (`--color-navy`, `--color-gold-3`, `--color-bg-alt`) no lugar do retrato, mantendo nome e cargo sobrepostos — a composição funciona igual, só sem a foto. Trocar por foto real assim que disponível, sempre via CDN Netlify (`/.netlify/images?url=/images/nome.jpg&w=600&q=80`), tratamento duotone aplicado via CSS `filter` (não pré-processar a imagem).

### Conteúdo
Título: "Quem vai cuidar do seu caso"

1. **Antônio Medeiros** — Consultor Previdenciário. Atua na área desde 1996. Administrador e Bacharel em Ciências Contábeis. Ex-servidor do INSS. Auditor Fiscal da Receita Federal aposentado. Diversos cursos de especialização previdenciária.
2. **Dra. Bruna Clarindo** — Advogada, OAB/MG 144.232. Especialista em Direito Previdenciário, pós-graduada em Processo Previdenciário. Mais de 1.000 planejamentos previdenciários elaborados.
3. **Dra. Eliana Leite Praça** — Advogada, OAB/MG 103.395. Pós-graduada em Direito Previdenciário, com experiência também nas áreas cível e empresarial. Ênfase em planejamentos e consultorias para segurados do RGPS (INSS).

### Layout
- `display:grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; align-items: end`
- Card do meio (Dra. Bruna) deslocado para cima: `transform: translateY(-2rem)` (overlap sutil, quebra a simetria dos 3 em linha)
- Cada card: retrato `aspect-ratio: 3/4`, nome sobreposto na base com `position:absolute; bottom:-0.5rem; left:-0.5rem` (Overlap Elements — o nome "vaza" para fora da moldura da foto)

### Tipografia
- Nome: Fraunces 500, `clamp(1.6rem, 2.2vw, 2rem)`, `color: var(--color-text-on-navy)` sobre uma faixa `background: var(--color-navy-deep)` que envolve só o texto (`padding: 0.5rem 0.9rem`, `display:inline-block`)
- Cargo/credenciais: Outfit 400, `0.9rem`, `color: var(--color-text-muted)`, revelado no hover (ver Interatividade)

### Cores
- Fundo da seção: `var(--color-bg)`
- Placeholder de foto (enquanto não há imagem real): Antônio → `var(--color-navy)`; Dra. Bruna → `var(--color-gold-3)`; Dra. Eliana → `var(--color-bg-alt)` com borda `var(--color-border)`
- Duotone (quando a foto existir): `filter: grayscale(1) contrast(1.1); background: var(--color-navy); background-blend-mode: luminosity` + overlay `linear-gradient(180deg, transparent 50%, var(--color-navy-deep) 100%)` para o nome ficar legível na base

### Elementos Visuais
- Moldura fina dourada (`1px solid var(--color-gold)`, `inset: 8px`) aparece só no hover, como um "convite" para o clique

### Animações
- Cards: `data-aos="fade-up"` delay `0/150/300ms`
- Card da Dra. Bruna já nasce com o `translateY(-2rem)` (não é animado, é estrutural)

### Interatividade
- **Hover Reveal**: no hover/focus do card, painel de credenciais desliza de baixo (`translateY(100%) → translateY(0)`, `350ms cubic-bezier(0.16,1,0.3,1)`) cobrindo parcialmente a foto com `background: rgba(29,51,85,0.92)`, texto em `--color-text-on-navy`
- Foto (quando real): `filter: grayscale(1) → grayscale(0.2)` no hover, `400ms`
- Em touch devices: painel de credenciais fica sempre visível (sem depender de hover) — via `@media (hover: hover)` para aplicar o comportamento de reveal apenas onde há mouse

### Responsividade
- `≤ 1024px`: grid 2 colunas, terceiro card ocupa `grid-column: span 2`, remove o `translateY(-2rem)` do card do meio
- `≤ 640px`: 1 coluna, painel de credenciais sempre visível abaixo da foto (não em overlay)

---

## Seção 8: Diferenciais

### Arquétipo e Constraints
- Arquétipo: **Kinetic** (Baseado em Movimento) — faixa "ticker" contínua
- Constraints: Infinite Scroll marquee (Estruturas Especiais), Duocromático (Cor), Pause on Hover (Interação)
- Justificativa: 5 diferenciais como lista viraria "bullets com check" (proibido). Uma faixa cinética contínua comunica "constância/tradição" (a marca tem quase 3 décadas) através do próprio movimento repetitivo, sem parecer um carrossel de vendas.

### Conteúdo
Título: "Por que escolher a Previ"

Itens (repetidos em loop): Quase 30 anos de atuação exclusiva na área previdenciária · Equipe com bagagem dentro do próprio sistema: ex-servidor do INSS e ex-auditor fiscal da Receita Federal · Mais de 1.000 planejamentos previdenciários já elaborados · Atendimento remoto ou presencial, para clientes em todo o Brasil e no exterior · Análise personalizada — nunca uma resposta genérica

> Nota: o texto acima ainda usa "Quase 30 anos" — como decidido para o restante da página, ajustar aqui também para **"Décadas de atuação exclusiva na área previdenciária"** ao implementar, mantendo consistência com a Seção 2.

### Layout
- Título: container centralizado, `text-align:center`, `margin-bottom: 2.5rem`
- Faixa: `width: 100vw` (full-bleed, sem container), `overflow: hidden`
- Trilho interno: `display:flex; width: max-content`, contém a lista de 5 itens **duplicada 2x sequencialmente** (para permitir loop infinito sem salto visual)
- Cada item: `display:flex; align-items:center; gap: 1rem; padding-inline: 2rem`, separado do próximo por um `•` dourado (`Fraunces`, `1.5rem`)

### Tipografia
- Item: Fraunces 500 itálico, `clamp(1.3rem, 2.4vw, 1.9rem)`, `white-space: nowrap`
- Separador `•`: `color: var(--color-gold)`

### Cores
- Fundo da faixa: `var(--color-navy-deep)` (Duocromático: só navy + dourado nesta seção, nada de branco/cinza)
- Texto dos itens: `var(--color-text-on-navy)`
- Separador: `var(--color-gold-4)`

### Elementos Visuais
- Gradiente de máscara nas bordas esquerda/direita da faixa (`mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent)`) para o texto "surgir/sumir" suavemente nas bordas, não cortar abruptamente

### Animações
- Trilho: `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }` (50% porque o conteúdo está duplicado 2x), `animation: marquee 32s linear infinite`
- **Pause on Hover**: `.marquee__track:hover { animation-play-state: paused }`
- `prefers-reduced-motion: reduce` → `animation: none`, trilho mostra apenas a primeira passagem estática (sem duplicata visível — ocultar a cópia extra com `[aria-hidden="true"]` no segundo bloco)

### Interatividade
- Pausa no hover (acima); sem outra interação — é uma seção ambiente, não clicável

### Responsividade
- `≤ 640px`: reduzir velocidade da animação para `20s` (textos maiores relativamente à tela passam rápido demais em 32s) e reduzir `padding-inline` dos itens para `1.25rem`

---

## Seção 9: Depoimentos

### Arquétipo e Constraints
- Arquétipo: **Single Focus** (Baseado em Foco) — uma citação por vez, centralizada
- Constraints: Fade + Slide transition (Movimento), Framed Content (Layout)
- Justificativa: sem depoimentos reais de clientes ainda (ver nota abaixo), uma citação por vez — grande, editorial — funciona tanto com depoimento real curto quanto com a citação profissional que já temos, sem parecer "seção vazia" ou "3 cards de depoimento genéricos" (proibido).

> **PLACEHOLDER — conteúdo pendente.** Nenhum depoimento real de cliente foi fornecido. A estrutura abaixo está pronta para receber 2–3 depoimentos reais assim que a cliente os enviar (texto + nome +, opcionalmente, print de avaliação). **Até lá**, usar como conteúdo temporário a citação profissional já disponível (Dra. Bruna Clarindo, já citada na Seção 2 — aqui usar uma citação diferente para não repetir; sugerir à cliente que envie ao menos 1 depoimento real antes do `/desenvolver` final desta seção) e o número "+1.000 planejamentos elaborados" como prova indireta.

### Conteúdo (placeholder até receber depoimentos reais)
- Slide 1: "Já elaboramos mais de 1.000 planejamentos previdenciários, sempre com a intenção de conseguir a melhor aposentadoria para nossos constituintes." — Previ Consultoria
- Slide 2 (placeholder explícito): `[Depoimento real de cliente — pendente]`
- Slide 3 (placeholder explícito): `[Depoimento real de cliente — pendente]`

### Layout
- `max-width: 760px; margin-inline: auto; text-align:center`
- Moldura decorativa (Framed Content): aspas gigantes tipográficas (Fraunces, `8rem`, `color: var(--color-gold-3)`, `opacity: 0.35`) posicionadas atrás da citação (`position:absolute`, `top:-2rem; left:50%; translateX(-50%)`)
- Navegação: dots abaixo da citação, `display:flex; gap:0.6rem; justify-content:center`

### Tipografia
- Citação: Fraunces itálico 500, `clamp(1.5rem, 3vw, 2.25rem)`, `line-height: 1.3`, `color: var(--color-navy-deep)`
- Autoria: Outfit 500, `0.95rem`, `color: var(--color-gold)`, uppercase, `letter-spacing: 0.08em`, `margin-top: 1.5rem`

### Cores
- Fundo: `var(--color-bg-alt)`
- Dots: inativo `var(--color-border)`; ativo `var(--color-gold)`, `width` expande de `8px` para `24px` (pill) na transição ativa

### Elementos Visuais
- Aspas gigantes translúcidas (acima)

### Animações
- Troca de slide: citação atual `opacity:1, translateX(0) → opacity:0, translateX(-24px)` saindo (`400ms`), próxima entra de `translateX(24px), opacity:0 → translateX(0), opacity:1` (`400ms`, delay `150ms` sobre a saída) — **Fade + Slide**
- Autoplay a cada `7s`, pausa automaticamente no hover/focus e ao interagir com os dots (retoma após `10s` de inatividade)

### Interatividade
- Dots clicáveis (`role="tablist"`, cada dot `role="tab"`, `aria-selected`)
- Setas prev/next discretas nas laterais em desktop (`opacity: 0.5 → 1` no hover)
- Swipe horizontal em mobile (`touchstart/touchend`, threshold `50px`)

### Responsividade
- `≤ 640px`: aspas decorativas reduzem para `5rem`, citação `clamp(1.2rem, 6vw, 1.6rem)`

---

## Seção 10: FAQ

### Arquétipo e Constraints
- Arquétipo: **Split Vertical** (Baseado em Divisão) — lista de perguntas à esquerda, resposta ativa à direita
- Constraints: Sticky Element (Layout — coluna de perguntas fixa), Clip Reveal (Movimento), Selective Color (Cor)
- Justificativa: substitui o "accordion básico" (proibido) por uma navegação de duas colunas — mais parecido com uma central de ajuda premium do que com uma lista de perguntas empilhadas.

### Conteúdo
Título: "Perguntas frequentes"

1. **Quanto custa o Planejamento Previdenciário?** — O investimento é de R$ 3.000,00, dividido em duas parcelas: entrada na assinatura do contrato e o restante na entrega do trabalho. *(confirmar com a cliente se este valor deve ficar público — ver nota de publicidade OAB no `copy.md`)*
2. **Quanto tempo leva para receber meu planejamento?** — Entre 30 e 45 dias após a assinatura do contrato e o envio de todos os documentos necessários.
3. **Atendem clientes fora de Belo Horizonte?** — Sim. Temos clientes em várias partes do Brasil e do mundo, atendidos 100% remotamente, além do atendimento presencial em Belo Horizonte e Santa Luzia (MG).
4. **Estou perto de me aposentar, ainda vale a pena fazer o planejamento?** — Sim. É justamente nessa fase que o planejamento evita erros — muitas pessoas se aposentam por uma regra menos vantajosa por falta de análise técnica prévia.
5. **Que documentos preciso ter em mãos?** — `[PLACEHOLDER: lista de documentos — confirmar com a cliente]`

### Layout
- `display:grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(2rem, 5vw, 4rem)`
- Coluna esquerda (perguntas): `position: sticky; top: 7rem; align-self: start`, lista vertical, cada pergunta é um item clicável com `padding-block: 1.25rem`, `border-bottom: 1px solid var(--color-border)`
- Coluna direita: painel único que troca de conteúdo conforme a pergunta ativa, `min-height: 240px`, `padding: 2.5rem`, `background: var(--color-bg-alt)`, `border-radius: 1rem`

### Tipografia
- Título da seção: Fraunces 500, `clamp(1.9rem, 3vw, 2.5rem)`
- Pergunta na lista: Outfit 500, `1.05rem`; ativa: `600`, `color: var(--color-navy)` (Selective Color — só a pergunta ativa recebe cor de marca, as demais em `--color-text-muted`)
- Resposta no painel: Outfit 400, `1.05rem`, `line-height:1.7`, `color: var(--color-text)`

### Cores
- Fundo da seção: `var(--color-bg)`
- Indicador da pergunta ativa: barra vertical `4px`, `background: var(--color-gold)`, `position:absolute; left:-1rem`, altura igual à linha do texto

### Elementos Visuais
- Ícone "+"/"×" à direita de cada pergunta, desenhado em CSS (dois `::before`/`::after` de `2px` cruzados), rotaciona `45deg` quando ativo — não usa ícone de biblioteca

### Animações
- Troca de resposta: **Clip Reveal** — `clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)`, `450ms cubic-bezier(0.16,1,0.3,1)`; conteúdo anterior sai com `clip-path: inset(0 0 0 0) → inset(100% 0 0 0)`, `300ms`
- Barra indicadora: `top` anima suavemente entre posições (`transition: top 300ms cubic-bezier(0.4,0,0.2,1)`) — efeito de "elevador" ao trocar de pergunta

### Interatividade
- Cada pergunta é um `<button>` (`aria-expanded`, `aria-controls` apontando para o painel), navegável por teclado (`↑↓` move entre perguntas quando a lista tem foco)
- Hover na pergunta inativa: `color: var(--color-navy)`, `200ms`

### Responsividade
- `≤ 1024px`: perde o `sticky`, mas mantém duas colunas
- `≤ 640px`: vira 1 coluna — comportamento reverte para accordion vertical tradicional (pergunta clicável expande a resposta **abaixo dela**, mesma transição Clip Reveal, mas vertical) — única seção da página com fallback estrutural diferente em mobile, por necessidade de legibilidade

---

## Seção 11: CTA Final + Formulário de Contato

### Arquétipo e Constraints
- Arquétipo: **Contained Center** (Baseado em Foco) — cartão de formulário flutuante centralizado sobre fundo dramático
- Constraints: Glassmorphism (Efeitos Especiais), Gradiente Mesh (Cor), Hover Glow (Interação)
- Justificativa: última seção antes do footer — precisa ser o pico visual de conversão. Fundo dramático + cartão flutuante concentra 100% da atenção no formulário, sem elementos concorrentes.

### Conteúdo
- Título: "Pronto para descobrir o melhor caminho para sua aposentadoria?"
- Subtítulo: "Fale agora com a equipe da Previ e receba uma análise técnica da sua situação previdenciária."
- Formulário (nome `contato`): Nome, E-mail, WhatsApp (intl-tel-input), botão "Quero Minha Análise Previdenciária"
- Microcopy abaixo do botão: "Resposta em até 1 dia útil · Sem compromisso"

### Layout
- Seção `id="contato"`, `min-height: 90vh; display:flex; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden`
- Título + subtítulo: acima do cartão, `max-width: 640px; margin-inline:auto; margin-bottom: 3rem`
- Cartão do formulário: `max-width: 480px; margin-inline:auto; padding: 2.5rem`, `border-radius: 1.25rem`

### Tipografia
- Título: Fraunces 500, `clamp(2.1rem, 4vw, 3rem)`, `color: var(--color-text-on-navy)`
- Subtítulo: Outfit 400, `1.1rem`, `color: var(--color-text-on-navy-muted)`
- Labels do form: Outfit 500, `0.85rem`, `color: var(--color-text-on-navy-muted)`

### Cores
- Fundo da seção: **Gradiente Mesh** — múltiplos radial-gradients sobrepostos: `radial-gradient(45% 55% at 20% 20%, rgba(216,166,88,0.25), transparent 60%), radial-gradient(50% 60% at 85% 15%, rgba(217,172,93,0.18), transparent 65%), radial-gradient(70% 80% at 50% 100%, var(--color-navy) 0%, var(--color-navy-darker) 100%)`
- Cartão (Glassmorphism): `background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); backdrop-filter: blur(20px)`
- Inputs: `background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: var(--color-text-on-navy)`; foco: `border-color: var(--color-gold-4); box-shadow: 0 0 0 3px rgba(239,221,147,0.2)`
- Botão: `.btn--gold` padrão

### Elementos Visuais
- Grão sutil (`Noise Texture`, `opacity:0.03`) sobre todo o fundo, para o gradiente mesh não parecer "liso demais"
- Nenhum elemento decorativo adicional — o cartão de vidro já é o protagonista

### Animações
- `data-aos="fade-up"` no cartão inteiro (não é hero, então permitido), `700ms`
- Gradiente mesh com leve **Ambient Motion**: os centros dos radial-gradients deslocam `±20px` em ciclo de `18s` (`@keyframes meshDrift`, `ease-in-out infinite alternate`) — movimento quase imperceptível, só evita a sensação de imagem estática

### Interatividade
- Botão submit: **Hover Glow** — `box-shadow: 0 0 0 rgba(216,166,88,0) → 0 0 32px rgba(216,166,88,0.55)`, `350ms`, além do lift já padrão do `.btn--gold`
- Validação, envio via AJAX, redirect com parâmetros: conforme `skills/forms/SKILL.md` (intl-tel-input, Netlify Forms, honeypot, `form-name` hidden idêntico ao `name`, `action="/lp-previdenciario/obrigado.html"`)
- Estado de loading no botão: texto muda para "Enviando..." + `disabled`, conforme já implementado em `initForms()`/`handleFormSubmit`

### Responsividade
- `≤ 640px`: `min-height: auto; padding-block: 5rem`, cartão `padding: 2rem`, título `clamp(1.75rem, 7vw, 2.25rem)`

### Pendência técnica
- Precisa existir `lp-previdenciario/obrigado.html` (página de agradecimento) antes do deploy — usar o template padrão da skill `forms`, personalizando com a identidade Previ (fundo navy, "Recebemos sua solicitação!", contagem regressiva não é necessária aqui — trocar por "Em breve entraremos em contato pelo WhatsApp informado")

---

## Footer

### Conteúdo
- Logo "PREVI" (versão reduzida) + "Serviços Previdenciários"
- Colunas: Navegação (mesmos links do header) · Contato (endereços BH e Santa Luzia, telefone/WhatsApp, e-mail) · Redes sociais (placeholders — confirmar com a cliente)
- Linha final: `© {ano} Previ Serviços Previdenciários. Todos os direitos reservados.`
- `[PLACEHOLDER opcional]`: linha de conformidade com publicidade OAB, caso a cliente confirme necessidade (ex.: "Sociedade de Advogados inscrita na OAB/MG sob o nº ...")

### Layout
- Fundo `var(--color-navy-deep)`, `padding-block: 4rem 2rem`
- `display:grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 2.5rem` acima da linha de copyright; linha de copyright em faixa própria abaixo, `border-top: 1px solid rgba(255,255,255,0.12)`, `padding-top: 1.5rem`, `text-align:center`, `font-size: 0.85rem`, `color: var(--color-text-on-navy-muted)`

### Tipografia
- Títulos de coluna: Outfit 600, `0.85rem`, uppercase, `letter-spacing: 0.1em`, `color: var(--color-gold-4)`
- Links: Outfit 400, `0.95rem`, `color: var(--color-text-on-navy-muted)`; hover: `color: var(--color-text-on-navy)` + `hover-underline` (mesmo padrão do header)

### Responsividade
- `≤ 768px`: grid vira 1 coluna, `gap: 2rem`, colunas empilhadas e centralizadas

---

## Resumo de Arquétipos (checagem de variedade)

| # | Seção | Arquétipo |
|---|---|---|
| 0 | Header | Sticky Element |
| 1 | Hero | Poster (+ Parallax Layers) |
| 2 | Quem Somos | Bento Box |
| 3 | O Problema | Spotlight |
| 4 | Solução | Timeline |
| 5 | Serviços | Scroll Horizontal |
| 6 | Como Funciona | Broken Grid |
| 7 | Equipe | Layered |
| 8 | Diferenciais | Kinetic (marquee) |
| 9 | Depoimentos | Single Focus |
| 10 | FAQ | Split Vertical |
| 11 | CTA Final | Contained Center |

Nenhum arquétipo se repete — 11 composições distintas para 11 seções de conteúdo + header.

## Pendências de conteúdo antes do `/desenvolver` final

1. **Fotos da equipe** (Seção 7) — usar blocos de cor até receber
2. **Depoimentos reais de clientes** (Seção 9) — usar citação institucional até receber
3. **Confirmar exibição pública do valor R$ 3.000,00** (Seção 10, FAQ) — regras de publicidade OAB
4. **Lista de documentos necessários** (Seção 10, FAQ, pergunta 5)
5. **Ajustar "Quase 30 anos" → "Décadas de..."** no conteúdo-fonte da Seção 8 (Diferenciais), já corrigido nas Seções 1 e 2
6. **Redes sociais e endereços completos** (Footer)

Nenhuma dessas pendências bloqueia o `/desenvolver` — a especificação já prevê o comportamento com conteúdo placeholder.
