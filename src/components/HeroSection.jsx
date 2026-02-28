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
  return (
    <header className="hero-section">
      <p className="doc-label">{meta.label}</p>
      <h1 className="hero-title">
        <motion.span custom={0} variants={word} initial="hidden" animate="visible">
          MAPEO
        </motion.span>
        <motion.span custom={1} variants={word} initial="hidden" animate="visible">
          DEL PASADO
        </motion.span>
      </h1>
      <p className="hero-subtitle">{meta.subtitle}</p>
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
