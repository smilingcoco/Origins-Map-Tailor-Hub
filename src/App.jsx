import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import data from './data/mapeo.json';
import HeroSection from './components/HeroSection';
import SectionWrapper from './components/SectionWrapper';
import CalloutBox from './components/CalloutBox';
import WarningBox from './components/WarningBox';
import MetricsGrid from './components/MetricsGrid';
import Timeline from './components/Timeline';
import EvolutionBox from './components/EvolutionBox';
import PatternBlock from './components/PatternBlock';
import ArchetypeGrid from './components/ArchetypeGrid';
import PartnerGrid from './components/PartnerGrid';
import SignalHunterBox from './components/SignalHunterBox';
import SignalTable from './components/SignalTable';
import ActionList from './components/ActionList';
import PropuestasBox from './components/PropuestasBox';
import Footer from './components/Footer';

export default function App() {
  const [metricsActive, setMetricsActive] = useState(false);
  const [activeSection, setActiveSection] = useState('section-01');
  const [readingProgress, setReadingProgress] = useState(0);

  const navSections = [
    { id: 'section-01', number: '01', title: 'Qué es esto' },
    { id: 'section-02', number: '02', title: 'Qué nos falta' },
    { id: 'section-03', number: '03', title: 'Método' },
    { id: 'section-04', number: '04', title: 'Números' },
    { id: 'section-05', number: '05', title: 'Cambio' },
    { id: 'section-06', number: '06', title: 'Patrones' },
    { id: 'section-07', number: '07', title: 'Arquetipos' },
    { id: 'section-08', number: '08', title: 'Signal Hunter' },
    { id: 'section-09', number: '09', title: 'Decisiones' },
    { id: 'section-10', number: '10', title: 'No ganamos' }
  ];

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
      <div className="app-layout">
        <aside className="side-nav" aria-label="Navegación por secciones">
          <div className="side-nav-label">Secciones</div>
          <ul className="side-nav-list">
            {navSections.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'side-nav-link active' : 'side-nav-link'}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  <span>{item.number}</span> {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="page-content">
          <HeroSection meta={data.meta} />

          <SectionWrapper id="section-01" number="01" title="Qué es esto y por qué existe">
            {data.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <CalloutBox text={data.intro.callout} notionLinks={data.intro.notionLinks} />
          </SectionWrapper>

          <SectionWrapper id="section-02" number="02" title="Qué nos falta para que sea perfecto">
            <p>{data.limitationsIntro}</p>
            <WarningBox items={data.limitations} />
          </SectionWrapper>

          <SectionWrapper id="section-03" number="03" title="Cómo se hizo">
            <p>{data.methodologyIntro}</p>
            <Timeline items={data.methodology} />
            <p className="section-note">{data.methodologyOutro}</p>
          </SectionWrapper>

          <SectionWrapper id="section-04" number="04" title="El mapa en números">
            <motion.div
              onViewportEnter={() => setMetricsActive(true)}
              viewport={{ once: true, margin: '-80px' }}
            >
              <MetricsGrid metrics={data.metrics} active={metricsActive} />
            </motion.div>
          </SectionWrapper>

          <SectionWrapper id="section-05" number="05" title="Un cambio de posición">
            <p>{data.evolution.intro}</p>
            <EvolutionBox evolution={data.evolution} />
          </SectionWrapper>

          <SectionWrapper id="section-06" number="06" title="Los siete patrones">
            {data.patternsIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {data.patterns.map((pattern) => (
              <PatternBlock pattern={pattern} key={pattern.number} />
            ))}
          </SectionWrapper>

          <SectionWrapper id="section-07" number="07" title="Los cuatro arquetipos de cliente">
            <p>{data.archetypesIntro}</p>
            <ArchetypeGrid archetypes={data.archetypes} />
            <p className="partner-intro">
              Dentro del arquetipo 04, los <strong>partnerships tecnológicos</strong> son un canal emergente con
              pipeline concreto ya en marcha.
            </p>
            <PartnerGrid partners={data.partners} />
          </SectionWrapper>

          <SectionWrapper id="section-08" number="08" title="De documento a sistema activo">
            <p>{data.signalHunterIntro}</p>
            <SignalHunterBox signalHunter={data.signalHunter} />
            <SignalTable rows={data.signalHunter.table} />
          </SectionWrapper>

          <SectionWrapper id="section-09" number="09" title="Once decisiones accionables">
            <p>{data.actionsIntro}</p>
            <ActionList items={data.actionPoints} />
          </SectionWrapper>

          <SectionWrapper id="section-10" number="10" title="Lo que no ganamos">
            <p>{data.propuestas.intro}</p>
            <PropuestasBox data={data.propuestas} />
          </SectionWrapper>

          <Footer footer={data.footer} />
        </div>
      </div>
    </main>
  );
}
