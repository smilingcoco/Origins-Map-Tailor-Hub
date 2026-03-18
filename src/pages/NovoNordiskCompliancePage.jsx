import { useEffect, useState } from 'react';
import data from '../data/novo-nordisk-compliance.json';
import HeroSection from '../components/HeroSection';
import SectionWrapper from '../components/SectionWrapper';
import Footer from '../components/Footer';

export default function NovoNordiskCompliancePage() {
  const [activeSection, setActiveSection] = useState('section-01');
  const [readingProgress, setReadingProgress] = useState(0);

  const navSections = [{ id: 'section-01', number: '01', title: 'Overview' }].concat(
    data.sections.map((section) => ({
      id: section.id,
      number: section.number,
      title: section.navTitle
    }))
  );

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
        ← Volver al hub
      </a>

      <div className="app-layout">
        <HeroSection
          meta={data.meta}
          actions={{
            primary: { href: '#section-01', label: 'Empezar lectura' },
            secondary: { href: '#section-07', label: 'Ver next steps' }
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
          <SectionWrapper id="section-01" number="01" title="Overview">
            {data.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="scan-summary">
              <p className="scan-summary-label">In 20 seconds</p>
              <ul>
                {data.quickTakeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </SectionWrapper>

          {data.sections.map((section) => (
            <SectionWrapper key={section.id} id={section.id} number={section.number} title={section.title}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </SectionWrapper>
          ))}

          <Footer footer={data.footer} />
        </div>
      </div>
    </main>
  );
}
