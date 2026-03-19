import { motion } from 'framer-motion';

function PipelineDesktop({ pipeline }) {
  return (
    <article className="editorial-pipeline-row">
      <p className="editorial-pipeline-label">{pipeline.title}</p>
      <div className="editorial-pipeline-track" role="presentation">
        {pipeline.steps.map((step, index) => (
          <div className="editorial-pipeline-segment" key={step}>
            <motion.div
              className={index === pipeline.steps.length - 1 ? 'editorial-pipeline-step is-alert' : 'editorial-pipeline-step'}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.38, delay: index * 0.06 }}
            >
              <span className="editorial-pipeline-step-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="editorial-pipeline-step-text">{step}</span>
            </motion.div>

            {index < pipeline.steps.length - 1 ? (
              <motion.div
                className="editorial-pipeline-arrow"
                initial={{ opacity: 0, scaleX: 0.6 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.42, delay: index * 0.06 + 0.08 }}
              >
                <span className="editorial-pipeline-arrow-line" />
                <span className="editorial-pipeline-arrow-head">↗</span>
              </motion.div>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function PipelineMobile({ pipeline }) {
  return (
    <article className="editorial-pipeline-mobile-row">
      <p className="editorial-pipeline-label">{pipeline.title}</p>
      <div className="editorial-pipeline-mobile-steps">
        {pipeline.steps.map((step, index) => (
          <div
            key={step}
            className={index === pipeline.steps.length - 1 ? 'editorial-pipeline-mobile-step is-alert' : 'editorial-pipeline-mobile-step'}
          >
            <span className="editorial-pipeline-mobile-index">{String(index + 1).padStart(2, '0')}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function EditorialPipelineDiagram({ items }) {
  return (
    <div className="editorial-pipeline-panel">
      <div className="editorial-pipeline-desktop">
        {items.map((pipeline) => (
          <PipelineDesktop key={pipeline.title} pipeline={pipeline} />
        ))}
      </div>

      <div className="editorial-pipeline-mobile">
        {items.map((pipeline) => (
          <PipelineMobile key={pipeline.title} pipeline={pipeline} />
        ))}
      </div>
    </div>
  );
}
