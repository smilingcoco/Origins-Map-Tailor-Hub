import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import data from '../data/novo-nordisk-compliance.json';
import HeroSection from '../components/HeroSection';
import SectionWrapper from '../components/SectionWrapper';
import Footer from '../components/Footer';

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
  const [activeSection, setActiveSection] = useState('section-01');
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeScopeTrack, setActiveScopeTrack] = useState('design');
  const [openScopeItems, setOpenScopeItems] = useState({});

  const navSections = [
    { id: 'section-01', number: '01', title: 'Overview' },
    { id: 'section-02', number: '02', title: 'Problem' },
    { id: 'section-03', number: '03', title: 'Solution' },
    { id: 'section-03b', number: '03B', title: 'Scope' },
    { id: 'section-04', number: '04', title: 'AI pipeline' },
    { id: 'section-05', number: '05', title: 'Team' },
    { id: 'section-06', number: '06', title: 'Why Tailor' },
    { id: 'section-07', number: '07', title: 'Cases' },
    { id: 'section-08', number: '08', title: 'ROI' },
    { id: 'section-09', number: '09', title: 'Investment' },
    { id: 'section-10', number: '10', title: 'Roadmap' },
    { id: 'section-11', number: '11', title: 'Assumptions' },
    { id: 'section-12', number: '12', title: 'Next step' }
  ];

  const toggleScopeItem = (key) => {
    setOpenScopeItems((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  useEffect(() => {
    document.title = 'Tailor Hub x Novo Nordisk: Compliance monitoring';
  }, []);

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
  }, []);

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
    <main className="page-shell">
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      </div>
      <a className="hub-backlink" href="/">
        ← Back to hub
      </a>

      <div className="app-layout">
        <HeroSection
          meta={data.meta}
          actions={{
            primary: { href: '#section-03', label: 'See the solution ↓' },
            secondary: { href: '#section-10', label: 'View roadmap' }
          }}
        >
          <div className="nn-hero-copy">
            {data.hero.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="nn-hero-strip">
            {data.hero.quickStats.map((item) => (
              <article className="nn-hero-stat" key={item.label}>
                <div className="nn-hero-stat-value">{item.value}</div>
                <div className="nn-hero-stat-label">{item.label}</div>
              </article>
            ))}
          </div>
        </HeroSection>

        <aside className="side-nav" aria-label="Section navigation">
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
          <SectionWrapper id="section-01" number="01" title="Overview">
            <p>
              Novo Nordisk needs a compliance workflow that moves from disconnected manual review to a monitored
              system that runs continuously, flags real risk, and gives legal and operations teams a faster path to
              decision.
            </p>
            <div className="scan-summary">
              <p className="scan-summary-label">In 20 seconds</p>
              <ul>
                <li>Two disconnected systems become one monitored workflow.</li>
                <li>Tickets and photos are checked automatically every day.</li>
                <li>Human review focuses only on the cases that actually need a decision.</li>
              </ul>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-02" number="02" title={data.problem.title}>
            <div className="nn-problem-diagram">
              <article className="nn-system-card">
                <p className="nn-system-label">Source A</p>
                <h3 className="nn-system-title">{data.problem.left.name}</h3>
                <DotGrid items={data.problem.left.items} />
              </article>

              <article className="nn-gap-card">
                <p className="nn-system-label">The gap</p>
                <p className="nn-gap-body">{data.problem.center.body}</p>
                <div className="nn-gap-metric">{data.problem.center.metric}</div>
              </article>

              <article className="nn-system-card">
                <p className="nn-system-label">Source B</p>
                <h3 className="nn-system-title">{data.problem.right.name}</h3>
                <DotGrid items={data.problem.right.items} />
              </article>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-03" number="03" title={data.solution.title}>
            <p>{data.solution.intro}</p>
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

          <SectionWrapper id="section-03b" number="03B" title={data.scope.title}>
            <p>{data.scope.intro}</p>
            <div className="nn-scope-toggle" role="tablist" aria-label="Scope tracks">
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

            <div className="nn-scope-grid">
              {data.scope.tracks.map((track) => {
                const isActive = activeScopeTrack === track.id;

                return (
                  <section
                    key={track.id}
                    className={isActive ? 'nn-scope-track active' : 'nn-scope-track'}
                    data-track-id={track.id}
                  >
                    <div className="nn-scope-track-head">
                      <p className="nn-roadmap-label">{track.title}</p>
                      <p className="nn-scope-track-meta">{track.label}</p>
                    </div>

                    <div className="nn-scope-phase-list">
                      {track.phases.map((phase) => {
                        const phaseKey = `${track.id}-${phase.title}`;
                        const isOpen = Boolean(openScopeItems[phaseKey]);

                        return (
                          <article className="nn-scope-phase" key={phaseKey}>
                            <button
                              type="button"
                              className="nn-scope-phase-trigger"
                              onClick={() => toggleScopeItem(phaseKey)}
                              aria-expanded={isOpen}
                            >
                              <span className="nn-scope-phase-title">
                                {isOpen ? '▼' : '▶'} {phase.title}
                              </span>
                              <span className="nn-scope-phase-deliverable">Deliverable: {phase.deliverable}</span>
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
                );
              })}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-04" number="04" title={data.pipelines.title}>
            <p>{data.pipelines.intro}</p>
            <div className="nn-pipelines-grid">
              {data.pipelines.items.map((pipeline) => (
                <article className="nn-pipeline-card" key={pipeline.title}>
                  <h3 className="nn-pipeline-title">{pipeline.title}</h3>
                  <div className="nn-pipeline-flow">
                    {pipeline.steps.map((step) => (
                      <div className="nn-pipeline-step" key={step}>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-05" number="05" title={data.team.title}>
            {data.team.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="signal-table-wrap">
              <table className="signal-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Allocation</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {data.team.roles.map(([role, allocation, duration]) => (
                    <tr key={role}>
                      <td data-label="Role">{role}</td>
                      <td data-label="Allocation">{allocation}</td>
                      <td data-label="Duration">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-06" number="06" title={data.comparison.title}>
            <p className="section-note">{data.comparison.subtitle}</p>
            <div className="signal-table-wrap">
              <table className="signal-table nn-comparison-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Consultancy</th>
                    <th>Tailor Hub</th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparison.rows.map(([category, consultancy, tailor]) => (
                    <tr key={category}>
                      <td data-label="Category">{category}</td>
                      <td data-label="Consultancy">{consultancy}</td>
                      <td data-label="Tailor Hub">{tailor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-07" number="07" title={data.cases.title}>
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

          <SectionWrapper id="section-08" number="08" title={data.roi.title}>
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

          <SectionWrapper id="section-09" number="09" title={data.investment.title}>
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
              <p className="quick-decision-label">Total</p>
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

          <SectionWrapper id="section-10" number="10" title={data.roadmap.title}>
            <p>{data.roadmap.intro}</p>
            <div className="nn-roadmap-grid">
              <article className="nn-roadmap-track">
                <p className="nn-roadmap-label">Design track</p>
                <ul className="nn-roadmap-list">
                  {data.roadmap.designTrack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="nn-roadmap-track">
                <p className="nn-roadmap-label">Dev track</p>
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
