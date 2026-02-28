# Mapeo del Pasado — Project Spec
**Tailor Hub · ICP Fase 0 · React + Vercel**
*Prepared by Adri Beloki, Head of Comms · February 2026*

---

## 1. Overview

### What is this

A web document that captures everything Tailor Hub has learned about its ideal client after six years of working with 32 companies. It's not a portfolio. It's not a CRM. It's an honest knowledge base — including the projects that went badly — translated into actionable patterns, archetypes, and decisions for the sales team and the rest of the Modulor group studios.

### Who it's for

- **Primary**: Simón (CEO) and Alex — sales qualification and prospecting
- **Secondary**: The other Modulor group studios (Mendesaltaren, SSTIL, NoCodeHackers, Fik) who may want to replicate the methodology
- **Future**: Feeds Signal Hunter, the prospecting agent being built by Adri Beloki (live before April 2026)

### Where it lives

Deployed on Vercel. React SPA. No backend needed — all content from a local JSON file.

### Reference HTML

The v4 HTML (`mapeo-del-pasado-v4.html`) is the canonical content and layout reference. Every section in this spec maps directly to a section in that file. Use it as the source of truth for copy.

---

## 2. Design System

All visual decisions come from the Tailor Hub design system. Do not deviate from these tokens.

### Typography

| Role | Font | Notes |
|------|------|-------|
| Titles, body, headings | `PPMori` (serif) | Titles always UPPERCASE |
| Labels, metadata, tags, nav, captions | `PPNeueMontrealMono` (monospace) | Always UPPERCASE |

Font files are available in the project assets. Embed them via `@font-face`. Never use system fonts (no Inter, no Roboto, no Arial).

```css
@font-face {
  font-family: 'PPMori';
  src: url('/fonts/PPMori-Regular.otf') format('opentype');
}
@font-face {
  font-family: 'PPNeueMontrealMono';
  src: url('/fonts/PPNeueMontrealMono-Book.otf') format('opentype');
}
```

### Color Tokens

```css
--neutral-00:  #FFFFFF   /* page background */
--neutral-100: #F5F5F5   /* surface, callout bg */
--neutral-200: #E5E5E5   /* borders, dividers */
--neutral-300: #D4D4D4   /* muted text, disabled */
--neutral-600: #837F85   /* secondary text, labels */
--neutral-900: #362C2C   /* primary text */
--blue-500:    #2C54FF   /* brand accent — use sparingly */
```

**Blue-500 usage**: section numbers, active states, links, left borders on callouts, animated accents. Nowhere else. Don't overuse it.

### Spacing

```
Max content width: 800px, centered
Body padding: 80px 48px 120px
Section gap: 72px between major sections
Component internal padding: 24–28px
Grid gap (visual grid lines): 1px with background color trick
```

### Tone

Negative space is part of the design. Leave room. Crowded = wrong.

---

## 3. Page Structure

```
/
├── HeroSection
├── SectionWrapper (01) — Qué es esto y por qué existe
├── SectionWrapper (02) — Lo que este análisis no es
├── SectionWrapper (03) — Cómo se hizo
├── SectionWrapper (04) — El mapa en números         [MetricsGrid]
├── SectionWrapper (05) — Un cambio de posición      [EvolutionBox]
├── SectionWrapper (06) — Los siete patrones         [PatternBlock × 7]
├── SectionWrapper (07) — Los cuatro arquetipos      [ArchetypeGrid + PartnerGrid]
├── SectionWrapper (08) — De documento a sistema     [SignalHunterBox + SignalTable]
├── SectionWrapper (09) — Once decisiones            [ActionList]
├── SectionWrapper (10) — Lo que no ganamos          [PropuestasBox]
└── Footer
```

---

## 4. Component Inventory

### `HeroSection`

Full-viewport hero. The document title takes up most of the screen.

```
- Background: neutral-00
- Title: "MAPEO / DEL PASADO" — PPMori, ~10–12vw, uppercase, letter-spacing: -0.02em
  Break into two lines for rhythm.
- Subtitle below: PPNeueMontrealMono, 13px, uppercase, neutral-600
  "ICP FASE 0 — UNA LECTURA HONESTA DE CON QUIÉN HEMOS TRABAJADO Y QUÉ HEMOS APRENDIDO"
- Meta row: 5 items (Empresas / Patrones / Action points / Arquetipos / Versión)
  font-tech, 11px. Label neutral-600, value neutral-900.
- Scroll indicator: minimal arrow or text "SCROLL" in font-tech, neutral-300, bottom center
- Animation: title fades + slides up on mount (Framer Motion, see §6)
```

---

### `SectionWrapper`

Wraps every numbered section. Handles the section number + title header.

```
Props:
  number: string      — "01", "02"...
  title: string       — section heading

- section-number: PPNeueMontrealMono, 11px, blue-500, uppercase, mb: 8px
- section-title: PPMori, 28px, uppercase, border-bottom: 1px solid neutral-200, pb: 16px, mb: 32px
- Animation: fade-in + slight translateY when entering viewport (see §6)
```

---

### `CalloutBox`

Highlighted block with left accent border.

```
- Background: neutral-100
- Border-left: 3px solid blue-500
- Padding: 24px 28px
- Body text: PPMori, 15px, neutral-900
- Links inside: PPNeueMontrealMono, 10px, uppercase, blue-500, border-bottom: 1px solid blue-500
```

---

### `WarningBox`

Same structure as CalloutBox but neutral accent — for limitations/caveats.

```
- Border-left: 3px solid neutral-300
- Label above content: PPNeueMontrealMono, 10px, uppercase, neutral-600
- Body: 13px, neutral-600
```

---

### `MetricsGrid`

4-column grid showing key numbers.

```
- Grid: 4 columns, gap: 1px, background: neutral-200 (creates visual grid lines)
- Each cell: background neutral-00, padding 24px 20px
- metric-label: PPNeueMontrealMono, 10px, uppercase, neutral-600
- metric-value: PPMori, 36px, neutral-900
- metric-desc: 13px, neutral-600
- Animation: values count up from 0 when entering viewport (see §6)
```

Data:
```json
[
  { "label": "Clientes analizados", "value": "32", "desc": "Con relación comercial real" },
  { "label": "Ejecución fluida", "value": "~55%", "desc": "De los proyectos con datos" },
  { "label": "Sectores distintos", "value": "12+", "desc": "Ninguno predice el éxito" },
  { "label": "Años de historia", "value": "6", "desc": "Analizados en una sesión" }
]
```

---

### `Timeline`

Vertical timeline for the methodology section.

```
- Each item: flex row, border-bottom: 1px solid neutral-200
- First item: border-top: 1px solid neutral-200
- timeline-date: PPNeueMontrealMono, 10px, blue-500, uppercase, min-width: 100px
- timeline-title: PPMori, 15px, uppercase
- timeline-body: 13px, neutral-600
- Animation: items stagger-in as you scroll (see §6)
```

---

### `EvolutionBox`

Dark full-width box for the Servicio 226 section. High-contrast moment.

```
- Background: neutral-900
- Padding: 36px 32px
- evolution-label: PPNeueMontrealMono, 10px, blue-500, uppercase
- evolution-title: PPMori, 22px, uppercase, neutral-00

Inner VS grid (2 columns):
  - Gap: 1px, background: neutral-600 (creates the dividing line)
  - "Antes" column: background #2a2424 (warm dark)
  - "Ahora" column: background #1a1f3a (cool dark)
  - col-label: PPNeueMontrealMono, 9px, uppercase, neutral-600
  - col-title: PPMori, 15px, uppercase, neutral-00
  - col-body: 13px, neutral-300

- Animation: the two columns slide in from opposite sides when entering viewport (see §6)
```

---

### `PatternBlock`

One of seven pattern entries. Stacked vertically with dividers.

```
- Border-bottom: 1px solid neutral-200
- First item also border-top
- Padding: 28px 0
- pattern-label: PPNeueMontrealMono, 10px, blue-500, uppercase, letter-spacing: 0.12em
- pattern-number (large, behind): PPMori, 120px, neutral-100, absolute positioned as watermark
- pattern-title: PPMori, 18px, uppercase
- pattern-body: 14px, neutral-600. Key phrases in neutral-900 bold.
- Animation: each block fades in as it enters viewport, with the large number
  appearing slightly before the text (stagger, see §6)
```

---

### `ArchetypeGrid`

2×2 grid of archetype cards.

```
- Grid: 2 columns, gap: 1px, background: neutral-200 (grid lines)
- Each card: background neutral-00, padding 28px 24px

Card anatomy:
  - archetype-number: PPNeueMontrealMono, 10px, blue-500, uppercase
  - archetype-name: PPMori, 17px, uppercase, line-height: 1.2
  - archetype-body: 13px, neutral-600
  - champion section (border-top: 1px solid neutral-200):
      label: PPNeueMontrealMono, 9px, uppercase, neutral-300
      name: PPMori, 13px, uppercase
      body: 12px, neutral-600
  - signals section (border-top: 1px solid neutral-200):
      label: PPNeueMontrealMono, 9px, uppercase, neutral-300
      list: 12px, neutral-600
  - examples: PPNeueMontrealMono, 10px, uppercase, neutral-300
      company names: neutral-900

- Animation: cards appear in stagger (top-left, top-right, bottom-left, bottom-right)
  with a slight scale from 0.97 to 1.0 (see §6)
```

---

### `PartnerGrid`

2-column grid for Vercel + Contentful partnerships.

```
- Same visual grid approach as ArchetypeGrid
- partner-name: PPMori, 16px, uppercase
- partner-desc: 13px, neutral-600
- Pipeline items: flex row, space-between, border-bottom: 1px solid neutral-200
- Pills:
    pending: neutral-600 text, neutral-200 border
    done: blue-500 text, blue-500 border
    font: PPNeueMontrealMono, 9px, uppercase
```

---

### `SignalHunterBox`

Dark box, similar to EvolutionBox. Key narrative moment.

```
- Background: neutral-900
- signal-hunter-label: PPNeueMontrealMono, 10px, blue-500, uppercase
- signal-hunter-title: PPMori, 22px, uppercase, neutral-00
- body text: 14px, neutral-300

Signal examples (inside the box):
  - Background: #1a1f3a
  - Border-left: 2px solid blue-500
  - label: PPNeueMontrealMono, 9px, blue-500, uppercase
  - body: 13px, neutral-300
```

---

### `SignalTable`

Full-width table mapping archetypes to signals and channels.

```
- thead: background neutral-900, text neutral-00
  - th: PPNeueMontrealMono, 10px, uppercase, padding: 12px 16px
- tbody rows: border-bottom neutral-200, even rows neutral-100
  - first cell: PPNeueMontrealMono, 10px, uppercase, neutral-600, width: 130px
  - other cells: PPMori, 13px, neutral-900
```

---

### `ActionList`

Numbered list of 11 action points.

```
- List items: flex row, border-bottom neutral-200, padding: 20px 0
- First item border-top
- action-num: PPNeueMontrealMono, 11px, blue-500, min-width: 28px
- action-title (strong): PPMori, 15px, uppercase, display block, mb: 4px
- action-body: 14px, neutral-600
- action-status (em): PPNeueMontrealMono, 10px, neutral-600, uppercase

- Animation: items stagger-in on scroll, each with slight translateX from left (see §6)
```

---

### `PropuestasBox`

Bordered box for the "proposals lost" section.

```
- Border: 1px solid neutral-200
- Padding: 28px
- propuestas-label: PPNeueMontrealMono, 10px, uppercase, neutral-600
- propuestas-title: PPMori, 20px, uppercase
- propuestas-body: 14px, neutral-600
```

---

### `Footer`

```
- Border-top: 1px solid neutral-200
- Padding-top: 32px
- Flex, space-between
- Left: "TAILOR HUB · GRUPO MODULOR" — PPNeueMontrealMono, 11px, uppercase, neutral-600
- Right: "ADRI BELOKI · FEBRERO 2026 · V4.0" — PPNeueMontrealMono, 11px, uppercase, neutral-300
```

---

## 5. Data (JSON)

All content lives in `/src/data/mapeo.json`. Components consume this — no hardcoded copy in JSX.

```json
{
  "meta": {
    "title": "Mapeo del Pasado",
    "subtitle": "ICP Fase 0 — Una lectura honesta de con quién hemos trabajado y qué hemos aprendido",
    "stats": [
      { "label": "Empresas analizadas", "value": "32" },
      { "label": "Patrones", "value": "7" },
      { "label": "Action points", "value": "11" },
      { "label": "Arquetipos ICP", "value": "4" },
      { "label": "Versión", "value": "4.0 · Feb 2026" }
    ]
  },

  "metrics": [
    { "label": "Clientes analizados", "value": 32, "display": "32", "desc": "Con relación comercial real" },
    { "label": "Ejecución fluida", "value": 55, "display": "~55%", "desc": "De los proyectos con datos" },
    { "label": "Sectores distintos", "value": 12, "display": "12+", "desc": "Ninguno predice el éxito" },
    { "label": "Años de historia", "value": 6, "display": "6", "desc": "Analizados en una sesión" }
  ],

  "methodology": [
    {
      "step": "Paso 01",
      "title": "Identificación de empresas",
      "body": "Cruce de la base de proyectos con la memoria del equipo. Se separaron clientes reales de propuestas perdidas y proyectos de Old Tailor. Resultado: 32 clientes documentados."
    },
    {
      "step": "Paso 02",
      "title": "Enriquecimiento de fichas",
      "body": "Para cada empresa: sector, tamaño, momento al contratarnos, perfil del interlocutor, qué construimos, canal de entrada y cómo fue la ejecución."
    },
    {
      "step": "Paso 03",
      "title": "Análisis de patrones",
      "body": "Con las fichas completas se cruzaron variables: ejecución vs. tamaño, vs. canal de entrada, vs. perfil de interlocutor, vs. geografía. Resultado: 7 patrones con capacidad predictiva real."
    },
    {
      "step": "Paso 04",
      "title": "Arquetipos y decisiones",
      "body": "Los patrones se tradujeron en 4 arquetipos de cliente ideal y 11 decisiones concretas para ventas, operaciones y comunicación."
    },
    {
      "step": "Próximo paso",
      "title": "Fase 1 — Datos financieros + propuestas perdidas",
      "body": "Cruzar el análisis cualitativo con rentabilidad real por cliente. Investigar Pipedrive con Ops para documentar el histórico de propuestas no ganadas."
    }
  ],

  "patterns": [
    {
      "number": "01",
      "title": "El tamaño importa, pero no de la forma esperada",
      "body": "dormakaba tiene 16.000 empleados y es nuestro mejor cliente. Cargill es la mayor empresa privada del mundo y fue una maravilla. Pampling factura 30M€ y fue el peor proyecto que hemos tenido. El tamaño no predice nada. Lo que predice es si la empresa tiene cultura de externalización y respeta el valor del trabajo externo.",
      "highlight": "tiene cultura de externalización y respeta el valor del trabajo externo"
    },
    {
      "number": "02",
      "title": "Las grandes corporaciones son dos cosas muy distintas",
      "body": "dormakaba, Cargill, Mondélez y Volkswagen: fluidos. El Corte Inglés, Mediapro, Conurma e Inditex: con fricciones. La diferencia no es el sector. Es si el interlocutor tiene poder real para tomar decisiones.",
      "highlight": "si el interlocutor tiene poder real para tomar decisiones"
    },
    {
      "number": "03",
      "title": "El canal de entrada predice la calidad del cliente",
      "body": "Referido es consistentemente el canal de mayor calidad. La confianza viene preconstruida, el cliente entra con expectativas calibradas y el ciclo de venta es más corto. Los canales-partner son un multiplicador: McKinsey abre mesas de decisión a las que Tailor no llegaría solo.",
      "highlight": "canales-partner son un multiplicador"
    },
    {
      "number": "04",
      "title": "La geografía tiene consecuencias operativas concretas",
      "body": "Clientes con sede operativa en España o Europa: sin fricción relevante. Cargill trabaja desde Ginebra y va perfecto. VRAI está 100% en Estados Unidos y generó fricciones exclusivamente por el desfase horario. La clave no es la nacionalidad de la empresa sino dónde está el equipo con el que trabajamos día a día.",
      "highlight": "dónde está el equipo con el que trabajamos día a día"
    },
    {
      "number": "05",
      "title": "El sector no es el filtro — el momento sí lo es",
      "body": "Tailor ha trabajado bien en más de doce sectores. No hay uno que sea mejor que otro. Lo que sí importa es en qué momento está la empresa cuando nos contrata. El momento ideal: problema concreto, presupuesto asignado, decisión de externalizar ya tomada.",
      "highlight": "en qué momento está la empresa cuando nos contrata"
    },
    {
      "number": "06",
      "title": "Hay un perfil de interlocutor que predice el éxito",
      "body": "En todos los proyectos fluidos aparece el mismo perfil: criterio técnico propio, autonomía real para decidir, experiencia previa externalizando, orientación al resultado. Sabe lo que es complejo sin que se lo expliques. Puede decir sí sin escalar. En el discovery hay que cualificar a la persona, no solo a la empresa.",
      "highlight": "criterio técnico propio, autonomía real para decidir, experiencia previa externalizando, orientación al resultado"
    },
    {
      "number": "07",
      "title": "La retención la genera el vínculo humano, no solo el delivery",
      "body": "dormakaba lleva años. Mediapro, más de ocho proyectos. Intermundial empezó con una auditoría y se quedó. Lo que tienen en común no es solo que entregamos bien — es que alguien de Tailor construyó una relación real con alguien del cliente. Una gran consultora no puede hacer esto.",
      "highlight": "alguien de Tailor construyó una relación real con alguien del cliente"
    }
  ],

  "archetypes": [
    {
      "number": "01",
      "name": "La gran corporación con interlocutor con poder",
      "body": "Empresa grande, presupuesto real, experiencia en externalización. El interlocutor tiene autonomía y criterio técnico. Potencial de relación muy larga y creciente en complejidad. Requiere PM sólido desde el primer día para absorber la fricción burocrática del cliente.",
      "champion": {
        "name": "René — Cargill",
        "body": "Basado fuera de España. La relación se mantiene viva con reuniones mensuales o bimestrales lideradas por Jorge y Nico. La distancia geográfica no es un problema cuando hay confianza construida."
      },
      "signals": ["Cambio de CTO/CDO", "Fusión o adquisición", "Nueva unidad digital", "Transformación anunciada"],
      "cases": ["dormakaba", "Cargill", "Mondélez", "Volkswagen"],
      "entryChannel": "Referido · Canal-partner"
    },
    {
      "number": "02",
      "name": "La startup con tracción y cultural fit",
      "body": "Startup post-ronda o scale-up con producto validado. CTO o head of product con criterio propio. Busca un acelerador tecnológico, no solo un ejecutor. Cultural fit máximo — hablan el mismo idioma que Tailor. Las señales de activación son rastreables.",
      "champion": {
        "name": "Iñigo Merino — Dcycle",
        "body": "CTO con criterio técnico sólido y alineamiento total de mindset. La ejecución fue perfecta precisamente porque confió en el equipo y no interfirió en el cómo."
      },
      "signals": ["Cierre Serie A/B", "Head of Product nuevo", "Entrada aceleradora", "Roadmap nuevo producto"],
      "cases": ["Dcycle", "FUDCLUB", "Essentialist"],
      "entryChannel": "Referido · Outreach directo"
    },
    {
      "number": "03",
      "name": "La empresa mediana en transformación",
      "body": "Empresa española consolidada que decide digitalizar o modernizar. Interlocutor cercano a dirección, muchas veces con perfil técnico o de producto. La entrada ideal es un proyecto acotado — auditoría, Servicio 226 — que demuestra valor antes de hablar de relación larga.",
      "champion": {
        "name": "Raúl Cruz Rius — Mediapro",
        "body": "Stakeholder principal en uno de los clientes más longevos de Tailor. La relación con Raúl es lo que ha sostenido más de ocho proyectos a lo largo de los años, pese a la complejidad organizativa de Mediapro."
      },
      "signals": ["Cambio de liderazgo", "Rebranding", "Expansión a nuevo mercado", "Posición técnica abierta"],
      "cases": ["Mediapro", "Intermundial", "Mentor Places"],
      "entryChannel": "Referido · Servicio 226"
    },
    {
      "number": "04",
      "name": "El canal-partner",
      "body": "No es un cliente final — es una puerta de entrada. Consultoras estratégicas, tecnológicas o partners de producto que tienen acceso a decisores pero necesitan brazo ejecutor digital de calidad. Tailor aporta lo que ellos no pueden dar: ejecución ágil y la cercanía que las grandes no tienen.",
      "champion": {
        "name": "Equipo McKinsey",
        "body": "Llegan con proyectos ya cualificados a nivel C-suite. La visibilidad de Tailor con el cliente final crece conforme ejecutamos — el caso Santander Portugal es el mejor ejemplo."
      },
      "signals": ["Licitación pública ganada", "Búsqueda subcontratistas", "RFP técnico publicado"],
      "cases": ["McKinsey", "Vercel", "Contentful", "Ayesa-tipo"],
      "entryChannel": "Relación directa con partner"
    }
  ],

  "partners": [
    {
      "name": "Vercel",
      "year": "2026",
      "desc": "Partnership oficial firmado en 2026. Vercel conecta a Tailor con empresas que necesitan desarrollo frontend de alto nivel sobre su plataforma.",
      "pipeline": [
        { "company": "Kave Home", "status": "pending" },
        { "company": "Revel", "status": "done", "note": "Intro realizada" },
        { "company": "Mango", "status": "pending" }
      ]
    },
    {
      "name": "Contentful",
      "year": "2025",
      "desc": "Partnership oficial firmado en 2025. Tailor es partner de implementación de Contentful — el CMS headless líder — para sus clientes en España.",
      "pipeline": [
        { "company": "Barceló", "status": "pending", "note": "En conversación" },
        { "company": "VIVA", "status": "pending", "note": "En conversación" }
      ]
    }
  ],

  "signalHunter": {
    "label": "En desarrollo · Adri Beloki, Head of Comms · Operativo antes de abril 2026",
    "title": "Signal Hunter",
    "body": "Signal Hunter es un agente de IA que monitoriza señales públicas — prensa económica, LinkedIn, bases de datos de rondas de inversión, licitaciones, movimientos de directivos — y alerta cuando una empresa encaja con alguno de los cuatro arquetipos y está emitiendo una señal de activación.\n\nEn lugar de que Simón o Alex busquen manualmente, reciben cada semana una lista cualificada: empresa, arquetipo al que corresponde, señal detectada, canal de entrada recomendado y argumento inicial sugerido.",
    "examples": [
      {
        "label": "Ejemplo de alerta · Arquetipo 02",
        "body": "Expansión publica que una startup con sede en Madrid ha cerrado una ronda de 14M€ Serie A. Signal Hunter la cruza con el arquetipo 02, detecta que acaban de contratar un Head of Product, y sugiere outreach directo con el Servicio 226 como entrada."
      },
      {
        "label": "Ejemplo de alerta · Arquetipo 01",
        "body": "LinkedIn muestra que el CTO de una empresa industrial europea acaba de cambiar. Signal Hunter lo cruza con el arquetipo 01 y sugiere activar la red de referidos para conseguir una introducción antes de que el nuevo CTO consolide sus decisiones de proveedor."
      }
    ],
    "table": [
      { "archetype": "Gran corporación", "signals": "Cambio CTO/CDO, M&A, transformación digital, nueva unidad", "channel": "Referido · Canal-partner" },
      { "archetype": "Startup con tracción", "signals": "Serie A/B, Head of Product nuevo, aceleradora, roadmap", "channel": "Referido · Outreach directo" },
      { "archetype": "Empresa mediana", "signals": "Cambio liderazgo, rebranding, expansión, posición técnica", "channel": "Referido · Servicio 226" },
      { "archetype": "Canal-partner", "signals": "Licitación ganada, búsqueda subcontratistas, RFP técnico", "channel": "Relación directa con partner" }
    ]
  },

  "actionPoints": [
    {
      "number": "01",
      "title": "Replicar el modelo canal-consultora",
      "body": "McKinsey abre mesas a las que Tailor no llega solo. ¿Hay otras — BCG, Accenture, Oliver Wyman, Roland Berger — con el mismo gap y a las que proponer la misma relación?",
      "status": "Hipótesis validada. Pendiente explorar candidatos."
    },
    {
      "number": "02",
      "title": "Servicio 226 antes que externalización larga",
      "body": "Si el cliente no tiene historial de externalización, la primera propuesta tiene que ser acotada. El Servicio 226 es el formato ideal. Intermundial lo valida. Embat lo valida al revés.",
      "status": "Siendo implementado. Convertir en criterio de venta explícito."
    },
    {
      "number": "03",
      "title": "Política clara para clientes americanos sin base europea",
      "body": "VRAI generó fricción exclusivamente por desfase horario. O se cobra ese coste, o se construye capacidad en LATAM. No se puede ignorar.",
      "status": "Patrón identificado. Pendiente decisión interna."
    },
    {
      "number": "04",
      "title": "Chequear historial de externalización en el discovery",
      "body": "¿Cuándo han externalizado antes? Si la respuesta es nunca, cambiar el enfoque de la propuesta. Esta pregunta tiene que estar en el proceso.",
      "status": "Recomendable implementar de inmediato."
    },
    {
      "number": "05",
      "title": "El PM en Big Corporates no es opcional — y tiene que estar presupuestado",
      "body": "El PM protege al equipo técnico del desgaste burocrático. Si no está en la propuesta, lo estamos absorbiendo sin cobrar.",
      "status": "Revisar modelos de propuesta para este perfil."
    },
    {
      "number": "06",
      "title": "Sin ownership de cuenta, no hay proyecto",
      "body": "Pampling, Clikalia y Conurma llegaron vía estudio hermano sin interlocutor de Tailor con vínculo real desde el principio. Essentialist es el modelo: Víctor Chamizo en las ceremonias desde el día uno, se monetice o no.",
      "status": "Aplicado en Essentialist. Pendiente sistematizar."
    },
    {
      "number": "07",
      "title": "El cliente quemado de una consultora tradicional es el más fácil de conquistar",
      "body": "Hola Islas Canarias llegó frustrado de su proveedor anterior. El contraste con Tailor hizo el trabajo. Alto potencial como argumento de marketing — sin nombrar a nadie.",
      "status": "Patrón identificado. Pendiente articular como mensaje."
    },
    {
      "number": "08",
      "title": "Sector público: objetivo a medio plazo, no ahora",
      "body": "Tailor ejecuta muy bien en proyectos públicos. Para optar a licitaciones directas hacen falta tamaño y estructura que todavía no tenemos. Vale la pena trazarlo como horizonte.",
      "status": "Aspiración identificada. Pendiente evaluar viabilidad."
    },
    {
      "number": "09",
      "title": "La relación personal protege contra el robo de talento",
      "body": "Clikalia intentó fichar equipo de Tailor. Cuando el cliente solo ve un proveedor, el talento es intercambiable. Cuando hay amistad real, robar es traicionar a alguien.",
      "status": "Especialmente relevante en staff augmentation y proyectos largos."
    },
    {
      "number": "10",
      "title": "Motivación del equipo: detectar pronto",
      "body": "SeQura salió mal por una razón interna. ¿Cubren las retrospectivas actuales el estado motivacional del equipo, no solo lo técnico?",
      "status": "Pendiente evaluar si el proceso actual lo cubre."
    },
    {
      "number": "11",
      "title": "El tamaño pequeño es una ventaja — usarla de forma deliberada",
      "body": "Una gran consultora no puede mandar a su fundador a cenar. Tailor sí. Hay que convertir esto en algo más consciente: una cena el día de la firma, una llamada cuando termina el primer proyecto, un café cuando hay un problema.",
      "status": "Ventaja identificada. Convertir en protocolo de onboarding de clientes."
    }
  ],

  "limitations": [
    {
      "title": "Proyectos de Old Tailor excluidos",
      "body": "Hay una primera etapa de la empresa — Convertia, LastLap, Vasalto, Mido y otros — que hemos dejado fuera. No porque no tengan valor histórico, sino porque ya no representan lo que Tailor hace hoy ni el tipo de relación que buscamos."
    },
    {
      "title": "Sin datos financieros por cliente",
      "body": "No sabemos todavía qué cliente fue más rentable. Este análisis es cualitativo, no financiero. Es una capa que hay que añadir en la siguiente fase."
    },
    {
      "title": "Fichas incompletas",
      "body": "Ibexa, Prodigioso Volcán, McCann y GeminAI tienen contexto pendiente. La persona que tiene la información no participó en esta sesión."
    },
    {
      "title": "Propuestas perdidas: ejercicio pendiente",
      "body": "Solo tenemos un caso documentado (Embat). El análisis completo requiere investigar Pipedrive con Ops."
    }
  ],

  "notionLinks": {
    "empresas": "https://www.notion.so/b0f9d238dbaa4d2b8282372a50845717",
    "proyectos": "https://www.notion.so/c2342d262fcd4a978eb0d4eafeefc834"
  }
}
```

---

## 6. Animations (Framer Motion)

Install: `npm install framer-motion`

All animations follow the same principle: **subtle and intentional**. Nothing decorative. Everything serves legibility or emphasis.

### Viewport entry (used everywhere)

```jsx
// Reusable hook pattern
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

// Usage with Framer Motion whileInView
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

### Hero title entrance

```jsx
// Title words animate in sequence
const word = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  })
}
// "MAPEO" → delay 0, "DEL PASADO" → delay 0.15
```

### Metrics count-up

```jsx
// Use useMotionValue + useTransform or a simple counter hook
// Only animate numeric values (32, 6). "~55%" and "12+" animate as text swap.
// Duration: 1.2s, ease: easeOut
// Trigger: on viewport enter (once)
```

### Pattern blocks — watermark number

```jsx
// Large background number appears 100ms before the text block
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const watermark = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
const content = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }
```

### Archetype cards stagger

```jsx
const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const card = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
}
```

### Evolution box — columns slide in from sides

```jsx
const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}
const slideRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}
// Wrap parent in motion.div with whileInView, stagger the two columns
```

### Action list items

```jsx
const listItem = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" }
  })
}
// Max stagger delay: ~0.44s for 11 items — fast enough not to feel slow
```

### Timeline items

```jsx
// Same stagger as action list but with translateY instead of translateX
// Delay: i * 0.07
```

---

## 7. Project File Structure

```
mapeo-del-pasado/
├── public/
│   └── fonts/
│       ├── PPMori-Regular.otf
│       └── PPNeueMontrealMono-Book.otf
├── src/
│   ├── data/
│   │   └── mapeo.json              ← all content here
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── SectionWrapper.jsx
│   │   ├── CalloutBox.jsx
│   │   ├── WarningBox.jsx
│   │   ├── MetricsGrid.jsx
│   │   ├── Timeline.jsx
│   │   ├── EvolutionBox.jsx
│   │   ├── PatternBlock.jsx
│   │   ├── ArchetypeGrid.jsx
│   │   ├── ArchetypeCard.jsx
│   │   ├── PartnerGrid.jsx
│   │   ├── SignalHunterBox.jsx
│   │   ├── SignalTable.jsx
│   │   ├── ActionList.jsx
│   │   ├── PropuestasBox.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   └── globals.css             ← tokens, font-face, reset
│   └── App.jsx                     ← composes all sections
├── vercel.json
└── package.json
```

---

## 8. Placeholders & Known Gaps

The following content is incomplete in the current dataset. Leave visible placeholders — don't hide them. The gaps are honest and intentional.

| Location | Gap | Placeholder text |
|----------|-----|-----------------|
| Arquetipo 03 champion body | Poco detalle comparado con otros arquetipos | `"Más detalle pendiente — próxima sesión"` |
| Fichas Ibexa, Prodigioso Volcán, McCann, GeminAI | Sin datos | Not shown in current version |
| Propuestas perdidas | Solo Embat documentado | Already noted in PropuestasBox copy |
| Datos financieros por cliente | No disponibles en Fase 0 | Already noted in WarningBox copy |

---

## 9. Deployment Notes

- Deploy target: Vercel (free tier sufficient)
- No `.env` variables needed — fully static
- `vercel.json` config: standard SPA, no rewrites needed beyond `/*` → `index.html`
- Performance: fonts are the heaviest assets (~200–300kb combined). Preload them in `<head>`.

```html
<link rel="preload" href="/fonts/PPMori-Regular.otf" as="font" type="font/otf" crossorigin>
<link rel="preload" href="/fonts/PPNeueMontrealMono-Book.otf" as="font" type="font/otf" crossorigin>
```

---

## 10. What This Spec Does Not Cover

- **Authentication**: This is a public document. No login needed.
- **CMS integration**: Content lives in JSON for now. If Tailor wants to edit content without touching code in the future, the JSON structure is already CMS-ready (Sanity, Contentful, or Notion API would all map cleanly).
- **Signal Hunter integration**: When Signal Hunter is live (before April 2026), the archetypes and signals in this document are the direct input to its configuration. The JSON structure here anticipates that connection.
- **Mobile optimization**: The design system is desktop-first. At minimum, the 2-column grids should collapse to 1 column below 640px. Typography scales should be reviewed for mobile.

---

*Tailor Hub · Grupo Modulor · Adri Beloki · February 2026*
