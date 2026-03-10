import { useEffect, useState } from 'react';
import data from '../data/benchmark-cmss.json';
import HeroSection from '../components/HeroSection';
import SectionWrapper from '../components/SectionWrapper';

function scoreToPercent(score) {
  const value = Number(score.split('/')[0]);
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value * 10));
}

export default function BenchmarkCmssPage() {
  const [activeSection, setActiveSection] = useState('section-01');
  const [readingProgress, setReadingProgress] = useState(0);

  const navSections = [
    { id: 'section-01', number: '01', title: 'Objetivo' },
    { id: 'section-02', number: '02', title: 'Monolítico vs headless' },
    { id: 'section-03', number: '03', title: 'WordPress' },
    { id: 'section-04', number: '04', title: 'Drupal' },
    { id: 'section-05', number: '05', title: 'Sanity' },
    { id: 'section-06', number: '06', title: 'Contentful' },
    { id: 'section-07', number: '07', title: 'Resultado benchmark' },
    { id: 'section-08', number: '08', title: 'FAQ' },
    { id: 'section-09', number: '09', title: 'Quiénes somos' },
    { id: 'section-10', number: '10', title: 'Fuentes' }
  ];

  const [wordpress, drupal, sanity, contentful] = data.platforms;

  useEffect(() => {
    document.title = "Benchmark CMS's - Tailor Hub";
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

  const renderPlatform = (platform) => (
    <>
      <p className="section-note benchmark-kicker">{platform.kicker}</p>
      {platform.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <div className="decision-grid">
        <article className="decision-card">
          <h3 className="decision-card-title">Cuándo sí</h3>
          <ul className="decision-list">
            {platform.whenYes.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>

        <article className="decision-card">
          <h3 className="decision-card-title">Cuándo no</h3>
          <ul className="decision-list">
            {platform.whenNo.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="quick-decision-box">
        <p className="quick-decision-label">Decisión rápida</p>
        <p className="quick-decision-body">{platform.decision}</p>
        <p className="quick-decision-complexity">
          Complejidad operativa <span>{platform.complexity}</span>
        </p>
      </div>
    </>
  );

  return (
    <main className="page-shell">
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      </div>
      <a className="hub-backlink" href="/">
        ← Volver al hub
      </a>

      <div className="app-layout">
        <HeroSection
          meta={data.meta}
          actions={{
            primary: { href: '#section-01', label: 'Empezar lectura' },
            secondary: { href: '#section-07', label: 'Ver benchmark' }
          }}
        />

        <aside className="side-nav" aria-label="Navegación por secciones">
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
          <SectionWrapper id="section-01" number="01" title="Objetivo del benchmark">
            {data.objective.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="scan-summary">
              <p className="scan-summary-label">En 20 segundos</p>
              <ul>
                {data.quickTakeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-02" number="02" title="El modelo que lo cambió todo">
            {data.modelShift.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="model-grid">
              {data.modelComparison.map((model) => (
                <article className="model-card" key={model.name}>
                  <p className="model-card-label">Modelo</p>
                  <h3 className="model-card-title">{model.name}</h3>
                  <p className="model-card-fit">{model.fit}</p>
                  <ul className="model-points">
                    {model.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-03" number="03" title={wordpress.name}>
            {renderPlatform(wordpress)}
          </SectionWrapper>

          <SectionWrapper id="section-04" number="04" title={drupal.name}>
            {renderPlatform(drupal)}
          </SectionWrapper>

          <SectionWrapper id="section-05" number="05" title={sanity.name}>
            {renderPlatform(sanity)}
          </SectionWrapper>

          <SectionWrapper id="section-06" number="06" title={contentful.name}>
            {renderPlatform(contentful)}
          </SectionWrapper>

          <SectionWrapper id="section-07" number="07" title="Resultado benchmark">
            <div className="signal-table-wrap">
              <table className="signal-table">
                <thead>
                  <tr>
                    <th>CMS</th>
                    <th>Fit principal</th>
                    <th>Score</th>
                    <th>Fortaleza</th>
                    <th>Riesgo</th>
                  </tr>
                </thead>
                <tbody>
                  {data.benchmark.map((item) => (
                    <tr key={item.cms}>
                      <td data-label="CMS">{item.cms}</td>
                      <td data-label="Fit principal">{item.fit}</td>
                      <td data-label="Score">
                        <div className="score-cell">
                          <span className="score-value">{item.score}</span>
                          <div className="score-track" aria-hidden="true">
                            <div className="score-bar" style={{ width: `${scoreToPercent(item.score)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td data-label="Fortaleza">{item.strength}</td>
                      <td data-label="Riesgo">{item.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flow-grid">
              {data.decisionFlow.map((step, index) => (
                <article className="flow-step" key={step.title}>
                  <p className="flow-step-num">Paso {index + 1}</p>
                  <h3 className="flow-step-title">{step.title}</h3>
                  <p className="flow-step-body">{step.body}</p>
                </article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="section-08" number="08" title="Lo que nos preguntan siempre">
            <ul className="action-list">
              {data.faq.map((item, index) => (
                <li key={item.question}>
                  <span className="action-num">{String(index + 1).padStart(2, '0')}</span>
                  <div className="action-text">
                    <strong>{item.question}</strong>
                    {item.answer}
                  </div>
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper id="section-09" number="09" title="Quiénes somos y por qué escribimos esto">
            {data.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </SectionWrapper>

          <SectionWrapper id="section-10" number="10" title="Fuentes y referencias">
            <ul className="source-list">
              {data.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </SectionWrapper>
        </div>
      </div>
    </main>
  );
}
