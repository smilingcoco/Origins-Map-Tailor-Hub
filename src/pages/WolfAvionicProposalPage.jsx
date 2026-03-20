import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Footer from '../components/Footer';
import ProposalHero from '../components/ProposalHero';
import dataEn from '../data/wolf-avionic-proposal.json';
import dataEs from '../data/wolf-avionic-proposal-es.json';

const OperationsMeshScene = lazy(() => import('../components/OperationsMeshScene'));

const chromeByLocale = {
  en: {
    pageTitle: 'Tailor Hub x Wolf Avionic: Operational monitoring',
    backToHub: '← Back to hub',
    heroPrimaryCta: 'See the flow ↓',
    heroSecondaryCta: 'View investment',
    sectionNavAria: 'Section navigation',
    languageLabel: 'Language',
    languages: { en: 'EN', es: 'ES' },
    nav: {
      problem: 'Problem',
      mvp: 'MVP',
      flow: 'Flow',
      role: 'Tailor role',
      security: 'Security',
      stack: 'Stack',
      roadmap: 'Roadmap',
      team: 'Team',
      investment: 'Investment',
      nextStep: 'Next step'
    },
    sourceA: 'Source A',
    sourceB: 'Source B',
    gapLabel: 'The gap',
    teamHeaders: ['Role', 'Allocation', 'Duration'],
    investmentHeaders: ['Team', 'Allocation', 'Weeks', 'Cost'],
    investmentTotalLabel: 'Total investment',
    investmentNoteLabel: 'Included in this phase',
    loadingScene: 'Loading operational mesh…',
    scene: {
      kicker: 'Operational mesh',
      title: 'Fragmented inputs become one traceable flow.',
      body:
        'Pilots, aircraft, operations, checklists and evidence no longer live in disconnected pockets. AIROPS structures them into one operational chain with a visible record from planning to validation.',
      labels: {
        left: { over: 'Inputs', strong: 'Pilots · Aircraft · Docs' },
        center: { over: 'Core', strong: 'Operational system of record' },
        right: { over: 'Output', strong: 'Validated operation trace' }
      }
    }
  },
  es: {
    pageTitle: 'Tailor Hub x Wolf Avionic: Monitoreo operativo',
    backToHub: '← Volver al hub',
    heroPrimaryCta: 'Ver el flujo ↓',
    heroSecondaryCta: 'Ver inversión',
    sectionNavAria: 'Navegación por secciones',
    languageLabel: 'Idioma',
    languages: { en: 'EN', es: 'ES' },
    nav: {
      problem: 'Problema',
      mvp: 'MVP',
      flow: 'Flujo',
      role: 'Rol Tailor',
      security: 'Seguridad',
      stack: 'Stack',
      roadmap: 'Roadmap',
      team: 'Equipo',
      investment: 'Inversión',
      nextStep: 'Siguiente paso'
    },
    sourceA: 'Fuente A',
    sourceB: 'Fuente B',
    gapLabel: 'El gap',
    teamHeaders: ['Rol', 'Dedicación', 'Duración'],
    investmentHeaders: ['Equipo', 'Dedicación', 'Semanas', 'Coste'],
    investmentTotalLabel: 'Inversión total',
    investmentNoteLabel: 'Incluido en esta fase',
    loadingScene: 'Cargando malla operativa…',
    scene: {
      kicker: 'Malla operativa',
      title: 'Entradas fragmentadas se convierten en un flujo trazable.',
      body:
        'Pilotos, aeronaves, operaciones, checklists y evidencias dejan de vivir en bolsas desconectadas. AIROPS los estructura en una única cadena operativa con registro visible desde planificación hasta validación.',
      labels: {
        left: { over: 'Entradas', strong: 'Pilotos · Aeronaves · Docs' },
        center: { over: 'Core', strong: 'Sistema operativo de registro' },
        right: { over: 'Salida', strong: 'Traza validada de operación' }
      }
    }
  }
};

function DotGrid({ items }) {
  return (
    <ul className="nn-tag-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function RoadmapGantt({ weeks, locale }) {
  const [activeWeek, setActiveWeek] = useState(0);
  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [expandedMobileWeek, setExpandedMobileWeek] = useState(0);

  useEffect(() => {
    setActiveWeek(0);
    setHoveredWeek(null);
    setExpandedMobileWeek(0);
  }, [locale, weeks]);

  const weekNumbers = weeks.map((_, index) => index + 1);
  const visibleWeekIndex = hoveredWeek ?? activeWeek;
  const selectedWeek = weeks[visibleWeekIndex] ?? weeks[0];
  const copy =
    locale === 'es'
      ? {
          kicker: 'Timeline',
          caption: `${weeks.length} semanas ordenadas como una secuencia de entrega enfocada.`,
          aria: 'Roadmap interactivo'
        }
      : {
          kicker: 'Timeline',
          caption: `${weeks.length} weeks mapped as one focused delivery sequence.`,
          aria: 'Interactive roadmap'
        };

  return (
    <div className="wolf-roadmap">
      <div className="wolf-roadmap-desktop" aria-label={copy.aria}>
        <div className="wolf-roadmap-gantt">
          <div className="wolf-roadmap-header">
            <div className="wolf-roadmap-header-copy">
              <p className="wolf-roadmap-kicker">{copy.kicker}</p>
              <p className="wolf-roadmap-caption">{copy.caption}</p>
            </div>
            <div className="wolf-roadmap-scale" aria-hidden="true">
              {weekNumbers.map((weekNumber, index) => (
                <span key={weekNumber} className={visibleWeekIndex === index ? 'active' : ''}>
                  W{weekNumber}
                </span>
              ))}
            </div>
          </div>

          <div className="wolf-roadmap-rows" role="tablist" aria-orientation="vertical">
            {weeks.map((week, index) => (
              <div className="wolf-roadmap-row" key={week.label}>
                <button
                  type="button"
                  className={[
                    'wolf-roadmap-row-copy',
                    activeWeek === index ? 'is-selected' : '',
                    visibleWeekIndex === index ? 'is-visible' : '',
                    hoveredWeek === index ? 'is-preview' : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setActiveWeek(index)}
                  onMouseEnter={() => setHoveredWeek(index)}
                  onMouseLeave={() => setHoveredWeek(null)}
                  role="tab"
                  aria-selected={activeWeek === index}
                  aria-controls={`wolf-roadmap-panel-${index}`}
                  id={`wolf-roadmap-tab-${index}`}
                >
                  <span className="wolf-roadmap-row-accent" aria-hidden="true" />
                  <span className="wolf-roadmap-row-label">{week.label}</span>
                  <span className="wolf-roadmap-row-title">{week.title}</span>
                </button>

                <div className="wolf-roadmap-row-lane" aria-hidden="true">
                  <div className="wolf-roadmap-lane-grid">
                    {weekNumbers.map((weekNumber) => (
                      <span key={weekNumber} className="wolf-roadmap-grid-cell" />
                    ))}
                  </div>
                  <button
                    type="button"
                    className={[
                      'wolf-roadmap-bar',
                      activeWeek === index ? 'is-selected' : '',
                      visibleWeekIndex === index ? 'is-visible' : '',
                      hoveredWeek === index ? 'is-preview' : ''
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ gridColumn: `${index + 1} / span 1` }}
                    onClick={() => setActiveWeek(index)}
                    onMouseEnter={() => setHoveredWeek(index)}
                    onMouseLeave={() => setHoveredWeek(null)}
                    aria-label={week.label}
                  >
                    <span className="wolf-roadmap-bar-fill" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="wolf-roadmap-detail"
          role="tabpanel"
          id={`wolf-roadmap-panel-${visibleWeekIndex}`}
          aria-labelledby={`wolf-roadmap-tab-${visibleWeekIndex}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedWeek.label}
              className="wolf-roadmap-detail-inner"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <p className="wolf-roadmap-detail-label">{selectedWeek.label}</p>
              <h3 className="wolf-roadmap-detail-title">{selectedWeek.title}</h3>
              <p className="wolf-roadmap-detail-objective">{selectedWeek.objective}</p>
              <ul className="wolf-roadmap-detail-list">
                {selectedWeek.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="wolf-roadmap-detail-team">{selectedWeek.team.join(' · ')}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="wolf-roadmap-mobile">
        <div className="wolf-roadmap-mobile-scale" aria-hidden="true">
          {weeks.map((week, index) => (
            <span key={week.label} className={expandedMobileWeek === index ? 'active' : ''}>
              W{index + 1}
            </span>
          ))}
        </div>

        <div className="wolf-roadmap-mobile-cards">
          {weeks.map((week, index) => {
            const isOpen = expandedMobileWeek === index;
            return (
              <article className={isOpen ? 'wolf-roadmap-mobile-card open' : 'wolf-roadmap-mobile-card'} key={week.label}>
                <button
                  type="button"
                  className="wolf-roadmap-mobile-trigger"
                  onClick={() => setExpandedMobileWeek(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`wolf-roadmap-mobile-panel-${index}`}
                >
                  <span className="wolf-roadmap-mobile-trigger-copy">
                    <span className="wolf-roadmap-mobile-label">{week.label}</span>
                    <span className="wolf-roadmap-mobile-title">{week.title}</span>
                  </span>
                  <span className="wolf-roadmap-mobile-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`wolf-roadmap-mobile-panel-${index}`}
                      className="wolf-roadmap-mobile-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <p className="wolf-roadmap-mobile-objective">{week.objective}</p>
                      <ul className="wolf-roadmap-mobile-list">
                        {week.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="wolf-roadmap-mobile-team">{week.team.join(' · ')}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function WolfAvionicProposalPage() {
  const [locale, setLocale] = useState('en');
  const [activeSection, setActiveSection] = useState('section-01');
  const [readingProgress, setReadingProgress] = useState(0);

  const data = locale === 'es' ? dataEs : dataEn;
  const ui = chromeByLocale[locale];

  const navSections = useMemo(
    () => [
      { id: 'section-01', number: '01', title: ui.nav.problem },
      { id: 'section-02', number: '02', title: ui.nav.mvp },
      { id: 'section-03', number: '03', title: ui.nav.flow },
      { id: 'section-04', number: '04', title: ui.nav.role },
      { id: 'section-05', number: '05', title: ui.nav.security },
      { id: 'section-06', number: '06', title: ui.nav.stack },
      { id: 'section-07', number: '07', title: ui.nav.roadmap },
      { id: 'section-08', number: '08', title: ui.nav.team },
      { id: 'section-09', number: '09', title: ui.nav.investment },
      { id: 'section-10', number: '10', title: ui.nav.nextStep }
    ],
    [ui]
  );

  useEffect(() => {
    const stored = window.localStorage.getItem('wolf-avionic-locale');
    if (stored === 'en' || stored === 'es') {
      setLocale(stored);
      return;
    }

    const browserLanguage = (navigator.language || '').toLowerCase();
    if (browserLanguage.startsWith('es')) {
      setLocale('es');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('wolf-avionic-locale', locale);
    document.title = ui.pageTitle;
  }, [locale, ui.pageTitle]);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-nav-section="true"]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [locale]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className={`page-shell proposal-page locale-${locale}`}>
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      </div>

      <div className="proposal-page-toolbar">
        <a className="hub-backlink" href="/">
          {ui.backToHub}
        </a>
        <div className="locale-switch" aria-label={ui.languageLabel}>
          <button
            type="button"
            className={locale === 'en' ? 'locale-switch-btn active' : 'locale-switch-btn'}
            onClick={() => setLocale('en')}
          >
            {ui.languages.en}
          </button>
          <button
            type="button"
            className={locale === 'es' ? 'locale-switch-btn active' : 'locale-switch-btn'}
            onClick={() => setLocale('es')}
          >
            {ui.languages.es}
          </button>
        </div>
      </div>

      <div className="app-layout">
        <ProposalHero
          title={data.meta.title}
          subtitle={data.meta.deck}
          imageSrc="/wolf-avionic-hero.jpg"
          imageAlt="Abstract green and blue motion background"
          actions={{
            primary: { href: '#section-03', label: ui.heroPrimaryCta },
            secondary: { href: '#section-09', label: ui.heroSecondaryCta }
          }}
          brands={[
            { label: 'Tailor Hub', imageSrc: '/isotipo-tailor-black.png' },
            { label: 'Wolf Avionic' }
          ]}
        />

        <aside className="side-nav" aria-label={ui.sectionNavAria}>
          <div className="side-nav-brand" aria-hidden="true">
            <img src="/isotipo-tailor-black.png" alt="" />
          </div>
          <ul className="side-nav-list">
            {navSections.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'side-nav-link active' : 'side-nav-link'}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  <span>{item.number}.</span> {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="page-content">
          <SectionWrapper id="section-01" number="01" title={data.problem.title}>
            <p>{data.problem.intro}</p>
            <div className="nn-problem-diagram">
              <article className="nn-system-card">
                <p className="nn-system-label">{ui.sourceA}</p>
                <h3 className="nn-system-title">{data.problem.left.name}</h3>
                <DotGrid items={data.problem.left.items} />
              </article>

              <article className="nn-gap-card">
                <p className="nn-system-label">{ui.gapLabel}</p>
                <p className="nn-gap-body">{data.problem.center.body}</p>
                <div className="nn-gap-metric">{data.problem.center.metric}</div>
              </article>

              <article className="nn-system-card">
                <p className="nn-system-label">{ui.sourceB}</p>
                <h3 className="nn-system-title">{data.problem.right.name}</h3>
                <DotGrid items={data.problem.right.items} />
              </article>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-02" number="02" title={data.mvp.title}>
            <p>{data.mvp.intro}</p>
            <div className="nn-editorial-grid">
              {data.mvp.items.map((item, index) => (
                <article className="nn-editorial-card" key={item.title}>
                  <p className="nn-editorial-label">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="nn-editorial-title">{item.title}</h3>
                  <p className="nn-editorial-body">{item.body}</p>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-03" number="03" title={data.flow.title}>
            <p>{data.flow.intro}</p>
            <Suspense fallback={<div className="compliance-scene-loading">{ui.loadingScene}</div>}>
              <OperationsMeshScene copy={ui.scene} />
            </Suspense>
            <div className="nn-flow-grid">
              {data.flow.steps.map((step) => (
                <article className="nn-flow-step" key={step.number}>
                  <p className="nn-flow-step-number">{step.number}</p>
                  <h3 className="nn-flow-step-title">{step.title}</h3>
                  <p className="nn-flow-step-body">{step.body}</p>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-04" number="04" title={data.role.title}>
            <p>{data.role.intro}</p>
            <div className="nn-editorial-grid">
              {data.role.items.map((item) => (
                <article className="nn-editorial-card" key={item.title}>
                  <h3 className="nn-editorial-title">{item.title}</h3>
                  <p className="nn-editorial-body">{item.body}</p>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-05" number="05" title={data.security.title}>
            <p>{data.security.intro}</p>
            <div className="nn-column-grid">
              {data.security.columns.map((column) => (
                <article className="nn-column-card" key={column.title}>
                  <h3 className="nn-column-title">{column.title}</h3>
                  <ul className="nn-column-list">
                    {column.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-06" number="06" title={data.stack.title}>
            <p>{data.stack.intro}</p>
            <div className="nn-editorial-grid">
              {data.stack.items.map((item) => (
                <article className="nn-editorial-card" key={item.title}>
                  <h3 className="nn-editorial-title">{item.title}</h3>
                  <p className="nn-editorial-body">{item.body}</p>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-07" number="07" title={data.roadmap.title}>
            <p>{data.roadmap.intro}</p>
            <RoadmapGantt weeks={data.roadmap.weeks} locale={locale} />
          </SectionWrapper>

          <SectionWrapper id="section-08" number="08" title={data.team.title}>
            {data.team.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="signal-table-wrap">
              <table className="signal-table">
                <thead>
                  <tr>
                    <th>{ui.teamHeaders[0]}</th>
                    <th>{ui.teamHeaders[1]}</th>
                    <th>{ui.teamHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.team.roles.map(([role, allocation, duration]) => (
                    <tr key={role}>
                      <td data-label={ui.teamHeaders[0]}>{role}</td>
                      <td data-label={ui.teamHeaders[1]}>{allocation}</td>
                      <td data-label={ui.teamHeaders[2]}>{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-09" number="09" title={data.investment.title}>
            <p>{data.investment.intro}</p>
            <div className="metrics-grid">
              {data.investment.summary.map(([label, value]) => (
                <div className="metric-cell" key={label}>
                  <div className="metric-value">{value}</div>
                  <div className="metric-desc">{label}</div>
                </div>
              ))}
            </div>
            <div className="signal-table-wrap">
              <table className="signal-table">
                <thead>
                  <tr>
                    <th>{ui.investmentHeaders[0]}</th>
                    <th>{ui.investmentHeaders[1]}</th>
                    <th>{ui.investmentHeaders[2]}</th>
                    <th>{ui.investmentHeaders[3]}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.investment.rows.map(([role, allocation, duration, cost]) => (
                    <tr key={role}>
                      <td data-label={ui.investmentHeaders[0]}>{role}</td>
                      <td data-label={ui.investmentHeaders[1]}>{allocation}</td>
                      <td data-label={ui.investmentHeaders[2]}>{duration}</td>
                      <td data-label={ui.investmentHeaders[3]}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="quick-decision-box">
              <p className="quick-decision-label">{ui.investmentTotalLabel}</p>
              <p className="quick-decision-body">{data.investment.total}</p>
            </div>
            <p className="section-note"><strong>{ui.investmentNoteLabel}.</strong> {data.investment.note}</p>
          </SectionWrapper>

          <SectionWrapper id="section-10" number="10" title={data.contact.title}>
            <div className="nn-contact-card">
              <p className="nn-contact-body">{data.contact.body}</p>
              <div className="nn-contact-person">{data.contact.name}</div>
              <a className="hub-card-link" href={`mailto:${data.contact.email}`}>
                {data.contact.email}
              </a>
              <a className="hub-card-link" href={`tel:${data.contact.phone.replace(/\s+/g, '')}`}>
                {data.contact.phone}
              </a>
            </div>
          </SectionWrapper>

          <Footer footer={data.footer} />
        </div>
      </div>
    </main>
  );
}
