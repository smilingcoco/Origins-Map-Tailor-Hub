import { motion } from 'framer-motion';

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export default function ProposalHero({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  facts = [],
  actions,
  brands = []
}) {
  const primaryAction = actions?.primary;
  const secondaryAction = actions?.secondary;
  const titleLines = String(title)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <header className="proposal-hero">
      <div className="proposal-hero-media">
        {imageSrc ? (
          <img className="proposal-hero-image" src={imageSrc} alt={imageAlt} />
        ) : (
          <div className="proposal-hero-image proposal-hero-image-fallback" aria-hidden="true">
            <span className="proposal-hero-orb proposal-hero-orb-a" />
            <span className="proposal-hero-orb proposal-hero-orb-b" />
            <span className="proposal-hero-plate" />
          </div>
        )}

        <div className="proposal-hero-overlay" />

        {brands.length ? (
          <div className="proposal-hero-brands" aria-label="Proposal brands">
            {brands.map((brand) => (
              <div className="proposal-hero-brand" key={brand.label}>
                {brand.imageSrc ? (
                  <img className="proposal-hero-brand-image" src={brand.imageSrc} alt={brand.label} />
                ) : null}
                <span className="proposal-hero-brand-label">{brand.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="proposal-hero-content">
          <motion.h1 custom={0.12} variants={rise} initial="hidden" animate="visible" className="proposal-hero-title">
            {titleLines.length ? (
              titleLines.map((line, index) => (
                <span className="proposal-hero-title-line" key={`${line}-${index}`}>
                  {line}
                </span>
              ))
            ) : (
              title
            )}
          </motion.h1>
          <motion.p custom={0.2} variants={rise} initial="hidden" animate="visible" className="proposal-hero-subtitle">
            {subtitle}
          </motion.p>

          {(primaryAction || secondaryAction) ? (
            <motion.div custom={0.28} variants={rise} initial="hidden" animate="visible" className="proposal-hero-actions">
              {primaryAction ? (
                <a className="proposal-hero-action primary" href={primaryAction.href}>
                  {primaryAction.label}
                </a>
              ) : null}
              {secondaryAction ? (
                <a className="proposal-hero-action" href={secondaryAction.href}>
                  {secondaryAction.label}
                </a>
              ) : null}
            </motion.div>
          ) : null}
        </div>
      </div>

      {facts.length ? (
        <div className="proposal-facts-strip">
          {facts.map((fact) => (
            <article className="proposal-fact" key={fact.label}>
              <p className="proposal-fact-value">{fact.value}</p>
              <p className="proposal-fact-label">{fact.label}</p>
            </article>
          ))}
        </div>
      ) : null}
    </header>
  );
}
