import { useState } from 'react';
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

  return (
    <main className="page-shell">
      <HeroSection meta={data.meta} />

      <SectionWrapper number="01" title="Que es esto y por que existe">
        {data.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <CalloutBox text={data.intro.callout} notionLinks={data.intro.notionLinks} />
      </SectionWrapper>

      <SectionWrapper number="02" title="Lo que este analisis no es">
        <p>{data.limitationsIntro}</p>
        <WarningBox items={data.limitations} />
      </SectionWrapper>

      <SectionWrapper number="03" title="Como se hizo">
        <p>{data.methodologyIntro}</p>
        <Timeline items={data.methodology} />
        <p className="section-note">{data.methodologyOutro}</p>
      </SectionWrapper>

      <SectionWrapper number="04" title="El mapa en numeros">
        <motion.div
          onViewportEnter={() => setMetricsActive(true)}
          viewport={{ once: true, margin: '-80px' }}
        >
          <MetricsGrid metrics={data.metrics} active={metricsActive} />
        </motion.div>
      </SectionWrapper>

      <SectionWrapper number="05" title="Un cambio de posicion">
        <p>{data.evolution.intro}</p>
        <EvolutionBox evolution={data.evolution} />
      </SectionWrapper>

      <SectionWrapper number="06" title="Los siete patrones">
        {data.patternsIntro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {data.patterns.map((pattern) => (
          <PatternBlock pattern={pattern} key={pattern.number} />
        ))}
      </SectionWrapper>

      <SectionWrapper number="07" title="Los cuatro arquetipos de cliente">
        <p>{data.archetypesIntro}</p>
        <ArchetypeGrid archetypes={data.archetypes} />
        <p className="partner-intro">
          Dentro del arquetipo 04, los <strong>partnerships tecnologicos</strong> son un canal emergente con
          pipeline concreto ya en marcha.
        </p>
        <PartnerGrid partners={data.partners} />
      </SectionWrapper>

      <SectionWrapper number="08" title="De documento a sistema activo">
        <p>{data.signalHunterIntro}</p>
        <SignalHunterBox signalHunter={data.signalHunter} />
        <SignalTable rows={data.signalHunter.table} />
      </SectionWrapper>

      <SectionWrapper number="09" title="Once decisiones accionables">
        <p>{data.actionsIntro}</p>
        <ActionList items={data.actionPoints} />
      </SectionWrapper>

      <SectionWrapper number="10" title="Lo que no ganamos">
        <p>{data.propuestas.intro}</p>
        <PropuestasBox data={data.propuestas} />
      </SectionWrapper>

      <Footer footer={data.footer} />
    </main>
  );
}
