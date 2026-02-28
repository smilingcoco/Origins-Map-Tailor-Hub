import { motion } from 'framer-motion';

const word = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export default function HeroSection({ meta }) {
  const [line1 = 'ORIGINS', ...rest] = meta.title.toUpperCase().split(' ');
  const line2 = rest.join(' ') || 'MAP';

  return (
    <header className="hero-section">
      <p className="doc-label">{meta.label}</p>
      <h1 className="hero-title">
        <motion.span custom={0} variants={word} initial="hidden" animate="visible">
          {line1}
        </motion.span>
        <motion.span custom={1} variants={word} initial="hidden" animate="visible">
          {line2}
        </motion.span>
      </h1>
      <p className="hero-subtitle">{meta.subtitle}</p>
      <div className="hero-actions">
        <a className="hero-action primary" href="#section-01">
          Empezar lectura
        </a>
        <a className="hero-action" href="#section-06">
          Ir a patrones
        </a>
      </div>
      <div className="hero-meta-row">
        {meta.stats.map((item) => (
          <div className="hero-meta-item" key={item.label}>
            {item.label} <span>{item.value}</span>
          </div>
        ))}
      </div>
      <div className="hero-scroll">SCROLL</div>
    </header>
  );
}
