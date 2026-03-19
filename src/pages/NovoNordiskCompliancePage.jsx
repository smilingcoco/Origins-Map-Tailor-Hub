import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dataEn from '../data/novo-nordisk-compliance.json';
import dataEs from '../data/novo-nordisk-compliance-es.json';
import SectionWrapper from '../components/SectionWrapper';
import Footer from '../components/Footer';
import EditorialPipelineDiagram from '../components/EditorialPipelineDiagram';
import ProposalHero from '../components/ProposalHero';

const ComplianceFlowScene = lazy(() => import('../components/ComplianceFlowScene'));

const chromeByLocale = {
  en: {
    localeLabel: 'EN',
    pageTitle: 'Tailor Hub x Novo Nordisk: Compliance monitoring',
    backToHub: '← Back to hub',
    heroEyebrow: 'Commercial proposal',
    heroFooterRight: 'Novo Nordisk · Mar 2026',
    heroPrimaryCta: 'See the solution ↓',
    heroSecondaryCta: 'View roadmap',
    nav: {
      overview: 'Overview',
      problem: 'Problem',
      solution: 'Solution',
      prototype: 'Prototype',
      scope: 'Scope',
      pipeline: 'AI pipeline',
      team: 'Team',
      investment: 'Investment',
      comparison: 'Why Tailor',
      cases: 'Cases',
      roi: 'ROI',
      roadmap: 'Roadmap',
      assumptions: 'Assumptions',
      nextStep: 'Next step'
    },
    overviewTitle: 'Overview',
    overviewBody:
      'Novo Nordisk needs a compliance workflow that moves from disconnected manual review to a monitored system that runs continuously, flags real risk, and gives legal and operations teams a faster path to decision.',
    scanSummaryLabel: 'In 20 seconds',
    scanSummaryItems: [
      'Two disconnected systems become one monitored workflow.',
      'Tickets and photos are checked automatically every day.',
      'Human review focuses only on the cases that actually need a decision.'
    ],
    sourceA: 'Source A',
    sourceB: 'Source B',
    gapLabel: 'The gap',
    scopeTabAria: 'Scope tracks',
    phases: 'phases',
    deliverable: 'Deliverable',
    loadingFlow: 'Loading live flow…',
    teamHeaders: ['Role', 'Allocation', 'Duration'],
    investmentTotal: 'Total',
    comparisonHeaders: ['Category', 'Consultancy', 'Tailor Hub'],
    roadmapLabels: ['Design track', 'Dev track'],
    sectionNavAria: 'Section navigation',
    prototypeAria: 'Open Novo Nordisk prototype',
    languageLabel: 'Language',
    languages: { en: 'EN', es: 'ES' },
    scene: {
      kicker: 'Live correlation engine',
      title: 'Two data streams. One decision layer.',
      body:
        'SAP Concur and NovoVision flow into a single correlation engine. Normal cases pass quietly. Signals with real risk pulse out into the alert inbox with evidence attached.',
      labels: {
        left: { over: 'Source A', strong: 'SAP Concur' },
        right: { over: 'Source B', strong: 'NovoVision' },
        center: { over: 'Core', strong: 'AI correlation engine' },
        bottom: { over: 'Output', strong: 'Prioritized alerts' }
      }
    }
  },
  es: {
    localeLabel: 'ES',
    pageTitle: 'Tailor Hub x Novo Nordisk: Monitoreo de compliance',
    backToHub: '← Volver al hub',
    heroEyebrow: 'Propuesta comercial',
    heroFooterRight: 'Novo Nordisk · Mar 2026',
    heroPrimaryCta: 'Ver la solución ↓',
    heroSecondaryCta: 'Ver roadmap',
    nav: {
      overview: 'Resumen',
      problem: 'Problema',
      solution: 'Solución',
      prototype: 'Prototipo',
      scope: 'Scope',
      pipeline: 'Pipeline IA',
      team: 'Equipo',
      investment: 'Inversión',
      comparison: 'Por qué Tailor',
      cases: 'Casos',
      roi: 'ROI',
      roadmap: 'Roadmap',
      assumptions: 'Supuestos',
      nextStep: 'Siguiente paso'
    },
    overviewTitle: 'Resumen',
    overviewBody:
      'Novo Nordisk necesita un flujo de compliance que pase de una revisión manual desconectada a un sistema monitorizado que corre de forma continua, detecta riesgo real y da a los equipos de legal y operaciones un camino más rápido hacia la decisión.',
    scanSummaryLabel: 'En 20 segundos',
    scanSummaryItems: [
      'Dos sistemas desconectados se convierten en un flujo monitorizado único.',
      'Los tickets y las fotos se comprueban automáticamente cada día.',
      'La revisión humana se centra solo en los casos que realmente requieren decisión.'
    ],
    sourceA: 'Fuente A',
    sourceB: 'Fuente B',
    gapLabel: 'El gap',
    scopeTabAria: 'Tracks del scope',
    phases: 'fases',
    deliverable: 'Entregable',
    loadingFlow: 'Cargando flujo en vivo…',
    teamHeaders: ['Rol', 'Dedicación', 'Duración'],
    investmentTotal: 'Total',
    comparisonHeaders: ['Categoría', 'Consultora', 'Tailor Hub'],
    roadmapLabels: ['Track de diseño', 'Track de desarrollo'],
    sectionNavAria: 'Navegación por secciones',
    prototypeAria: 'Abrir prototipo de Novo Nordisk',
    languageLabel: 'Idioma',
    languages: { en: 'EN', es: 'ES' },
    scene: {
      kicker: 'Motor de correlación en vivo',
      title: 'Dos corrientes de datos. Una capa de decisión.',
      body:
        'SAP Concur y NovoVision fluyen hacia un único motor de correlación. Los casos normales pasan sin ruido. Las señales con riesgo real emergen en la bandeja de alertas con la evidencia asociada.',
      labels: {
        left: { over: 'Fuente A', strong: 'SAP Concur' },
        right: { over: 'Fuente B', strong: 'NovoVision' },
        center: { over: 'Core', strong: 'Motor de correlación IA' },
        bottom: { over: 'Salida', strong: 'Alertas priorizadas' }
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

export default function NovoNordiskCompliancePage() {
  const [locale, setLocale] = useState('en');
  const [activeSection, setActiveSection] = useState('section-01');
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeScopeTrack, setActiveScopeTrack] = useState('design');
  const [openScopeItems, setOpenScopeItems] = useState({});

  const data = locale === 'es' ? dataEs : dataEn;
  const ui = chromeByLocale[locale];

  const activeTrack = data.scope.tracks.find((track) => track.id === activeScopeTrack) ?? data.scope.tracks[0];
  const inactiveTrack = data.scope.tracks.find((track) => track.id !== activeScopeTrack);

  const navSections = useMemo(
    () => [
      { id: 'section-01', number: '01', title: ui.nav.overview },
      { id: 'section-02', number: '02', title: ui.nav.problem },
      { id: 'section-03', number: '03', title: ui.nav.solution },
      { id: 'section-03a', number: '03A', title: ui.nav.prototype },
      { id: 'section-03b', number: '03B', title: ui.nav.scope },
      { id: 'section-04', number: '04', title: ui.nav.pipeline },
      { id: 'section-05', number: '05', title: ui.nav.team },
      { id: 'section-09', number: '06', title: ui.nav.investment },
      { id: 'section-06', number: '07', title: ui.nav.comparison },
      { id: 'section-07', number: '08', title: ui.nav.cases },
      { id: 'section-08', number: '09', title: ui.nav.roi },
      { id: 'section-10', number: '10', title: ui.nav.roadmap },
      { id: 'section-11', number: '11', title: ui.nav.assumptions },
      { id: 'section-12', number: '12', title: ui.nav.nextStep }
    ],
    [ui]
  );

  const toggleScopeItem = (key) => {
    setOpenScopeItems((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  useEffect(() => {
    const stored = window.localStorage.getItem('novo-nordisk-locale');
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
    window.localStorage.setItem('novo-nordisk-locale', locale);
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
    <main className="page-shell proposal-page">
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
          title={`${data.meta.title} ${data.meta.subtitle}`}
          subtitle={data.hero.intro[0]}
          facts={data.hero.quickStats}
          actions={{
            primary: { href: '#section-03', label: ui.heroPrimaryCta },
            secondary: { href: '#section-10', label: ui.heroSecondaryCta }
          }}
          brands={[
            { label: 'Tailor Hub', imageSrc: '/isotipo-tailor-black.png' },
            { label: 'Novo Nordisk' }
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
          <SectionWrapper id="section-01" number="01" title={ui.overviewTitle}>
            <p>{ui.overviewBody}</p>
            <div className="scan-summary">
              <p className="scan-summary-label">{ui.scanSummaryLabel}</p>
              <ul>
                {ui.scanSummaryItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-02" number="02" title={data.problem.title}>
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

          <SectionWrapper id="section-03" number="03" title={data.solution.title}>
            <p>{data.solution.intro}</p>
            <Suspense fallback={<div className="compliance-scene-loading">{ui.loadingFlow}</div>}>
              <ComplianceFlowScene copy={ui.scene} />
            </Suspense>
            <div className="nn-pillars-grid">
              {data.solution.pillars.map((pillar) => (
                <article className="nn-pillar-card" key={pillar.number}>
                  <div className="nn-pillar-number">{pillar.number}</div>
                  <h3 className="nn-pillar-title">{pillar.title}</h3>
                  <p className="nn-pillar-body">{pillar.body}</p>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-03a" number="03A" title={data.prototype.title}>
            <div className="nn-prototype-layout">
              <div className="nn-prototype-copy">
                <p>{data.prototype.body}</p>
                <ul className="nn-prototype-highlights">
                  {data.prototype.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="hub-card-link" href={data.prototype.url} target="_blank" rel="noreferrer">
                  {data.prototype.cta}
                </a>
              </div>

              <a
                className="nn-prototype-preview"
                href={data.prototype.url}
                target="_blank"
                rel="noreferrer"
                aria-label={ui.prototypeAria}
              >
                <div className="nn-prototype-browserbar">
                  <span className="nn-prototype-dot" />
                  <span className="nn-prototype-dot" />
                  <span className="nn-prototype-dot" />
                  <span className="nn-prototype-url">{data.prototype.url.replace('https://', '')}</span>
                </div>
                <div className="nn-prototype-canvas" aria-hidden="true">
                  <div className="nn-prototype-statline">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="nn-prototype-columns">
                    <div className="nn-prototype-sidebar" />
                    <div className="nn-prototype-main">
                      <div className="nn-prototype-chart" />
                      <div className="nn-prototype-table">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                  <div className="nn-prototype-tags">
                    {data.prototype.highlights.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-03b" number="03B" title={data.scope.title}>
            <p>{data.scope.intro}</p>
            <div className="nn-scope-toggle" role="tablist" aria-label={ui.scopeTabAria}>
              {data.scope.tracks.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  className={activeScopeTrack === track.id ? 'nn-scope-toggle-btn active' : 'nn-scope-toggle-btn'}
                  onClick={() => setActiveScopeTrack(track.id)}
                  role="tab"
                  aria-selected={activeScopeTrack === track.id}
                >
                  {track.title}
                </button>
              ))}
            </div>

            <div className="nn-scope-summary">
              <div className="nn-scope-summary-main">
                <p className="nn-roadmap-label">{activeTrack.title}</p>
                <p className="nn-scope-summary-meta">{activeTrack.label}</p>
              </div>
              {inactiveTrack ? (
                <p className="nn-scope-summary-secondary">
                  {inactiveTrack.title} · {inactiveTrack.phases.length} {ui.phases}
                </p>
              ) : null}
            </div>

            <section className="nn-scope-track active" data-track-id={activeTrack.id}>
              <div className="nn-scope-phase-list">
                {activeTrack.phases.map((phase) => {
                  const phaseKey = `${activeTrack.id}-${phase.title}`;
                  const isOpen = Boolean(openScopeItems[phaseKey]);

                  return (
                    <article className="nn-scope-phase" key={phaseKey}>
                      <button
                        type="button"
                        className="nn-scope-phase-trigger"
                        onClick={() => toggleScopeItem(phaseKey)}
                        aria-expanded={isOpen}
                      >
                        <div className="nn-scope-phase-copy">
                          <span className="nn-scope-phase-title">{phase.title}</span>
                          <span className="nn-scope-phase-deliverable">
                            <span className="nn-scope-phase-deliverable-label">{ui.deliverable}</span>
                            <span>{phase.deliverable}</span>
                          </span>
                        </div>
                        <span className={isOpen ? 'nn-scope-phase-icon open' : 'nn-scope-phase-icon'} aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            className="nn-scope-phase-body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                          >
                            <ul className="nn-scope-detail-list">
                              {phase.details.map((detail) => (
                                <li key={detail}>{detail}</li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </div>
            </section>
          </SectionWrapper>

          <SectionWrapper id="section-04" number="04" title={data.pipelines.title}>
            <p>{data.pipelines.intro}</p>
            <EditorialPipelineDiagram items={data.pipelines.items} />
          </SectionWrapper>

          <SectionWrapper id="section-05" number="05" title={data.team.title}>
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

          <SectionWrapper id="section-09" number="06" title={data.investment.title}>
            <p>{data.investment.intro}</p>
            <div className="nn-investment-grid">
              {data.investment.phases.map(([title, value, body]) => (
                <article className="nn-investment-card" key={title}>
                  <p className="nn-investment-label">{title}</p>
                  <div className="nn-investment-value">{value}</div>
                  <p className="nn-investment-body">{body}</p>
                </article>
              ))}
            </div>
            <div className="quick-decision-box">
              <p className="quick-decision-label">{ui.investmentTotal}</p>
              <p className="quick-decision-body">{data.investment.total}</p>
            </div>
            <div className="nn-postlaunch-list">
              {data.investment.postLaunch.map(([title, value, body]) => (
                <article className="nn-postlaunch-item" key={title}>
                  <div>
                    <p className="nn-postlaunch-label">{title}</p>
                    <p className="nn-postlaunch-body">{body}</p>
                  </div>
                  <div className="nn-postlaunch-value">{value}</div>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-06" number="07" title={data.comparison.title}>
            <p className="section-note">{data.comparison.subtitle}</p>
            <div className="signal-table-wrap">
              <table className="signal-table nn-comparison-table">
                <thead>
                  <tr>
                    <th>{ui.comparisonHeaders[0]}</th>
                    <th>{ui.comparisonHeaders[1]}</th>
                    <th>{ui.comparisonHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparison.rows.map(([category, consultancy, tailor]) => (
                    <tr key={category}>
                      <td data-label={ui.comparisonHeaders[0]}>{category}</td>
                      <td data-label={ui.comparisonHeaders[1]}>{consultancy}</td>
                      <td data-label={ui.comparisonHeaders[2]}>{tailor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-07" number="08" title={data.cases.title}>
            <p>{data.cases.intro}</p>
            <div className="nn-case-grid">
              {data.cases.items.map((item) => (
                <article className="nn-case-card" key={item.title}>
                  <p className="nn-case-label">{item.label}</p>
                  <h3 className="nn-case-title">{item.title}</h3>
                  <div className="nn-case-body">
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {item.metrics ? (
                    <div className="nn-case-metrics">
                      {item.metrics.map(([value, label]) => (
                        <div className="nn-case-metric" key={value + label}>
                          <div className="nn-case-metric-value">{value}</div>
                          <div className="nn-case-metric-label">{label}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {item.quote ? <blockquote className="nn-case-quote">"{item.quote}"</blockquote> : null}
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-08" number="09" title={data.roi.title}>
            <p>{data.roi.intro}</p>
            <div className="metrics-grid">
              {data.roi.metrics.map(([value, label]) => (
                <div className="metric-cell" key={value + label}>
                  <div className="metric-value">{value}</div>
                  <div className="metric-desc">{label}</div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-10" number="10" title={data.roadmap.title}>
            <p>{data.roadmap.intro}</p>
            <div className="nn-roadmap-grid">
              <article className="nn-roadmap-track">
                <p className="nn-roadmap-label">{ui.roadmapLabels[0]}</p>
                <ul className="nn-roadmap-list">
                  {data.roadmap.designTrack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="nn-roadmap-track">
                <p className="nn-roadmap-label">{ui.roadmapLabels[1]}</p>
                <ul className="nn-roadmap-list">
                  {data.roadmap.devTrack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-11" number="11" title={data.assumptions.title}>
            <div className="nn-assumptions">
              {data.assumptions.items.map(([title, body]) => (
                <details className="nn-assumption-item" key={title}>
                  <summary>{title}</summary>
                  <p>{body}</p>
                </details>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-12" number="12" title={data.contact.title}>
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
