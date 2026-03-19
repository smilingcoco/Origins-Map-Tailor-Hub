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
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  facts = [],
  footerLeft,
  footerRight,
  actions
}) {
  const primaryAction = actions?.primary;
  const secondaryAction = actions?.secondary;

  return (
    <header className="proposal-hero">
      <div className="proposal-hero-shell">
        <div className="proposal-hero-topbar">
          <span className="proposal-hero-slash">/</span>
          <span className="proposal-hero-eyebrow">{eyebrow}</span>
        </div>

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

          <div className="proposal-hero-content">
            <motion.p custom={0.05} variants={rise} initial="hidden" animate="visible" className="proposal-hero-kicker">
              {eyebrow}
            </motion.p>
            <motion.h1 custom={0.12} variants={rise} initial="hidden" animate="visible" className="proposal-hero-title">
              {title}
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

        <div className="proposal-hero-footer">
          <span>{footerLeft}</span>
          <span>{footerRight}</span>
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
