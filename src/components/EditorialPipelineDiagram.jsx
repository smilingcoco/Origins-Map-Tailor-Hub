import { motion } from 'framer-motion';

const PIPELINE_LAYOUTS = [
  [
    { left: '6%', top: '71%', width: 120, align: 'left' },
    { left: '28%', top: '71%', width: 180, align: 'center' },
    { left: '47%', top: '24%', width: 230, align: 'center' },
    { left: '75%', top: '71%', width: 290, align: 'center' },
    { left: '95%', top: '71%', width: 120, align: 'right' }
  ],
  [
    { left: '6%', top: '71%', width: 120, align: 'left' },
    { left: '26%', top: '71%', width: 190, align: 'center' },
    { left: '51%', top: '71%', width: 280, align: 'center' },
    { left: '76%', top: '71%', width: 270, align: 'center' },
    { left: '96%', top: '84%', width: 150, align: 'right' }
  ]
];

function DesktopPipeline({ pipeline, index }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0.2 },
    visible: { pathLength: 1, opacity: 1 }
  };

  const curvePaths =
    index === 0
      ? [
          'M 120 138 C 180 184, 250 186, 320 138',
          'M 320 86 C 390 42, 458 42, 528 86',
          'M 528 138 C 602 190, 688 188, 820 138',
          'M 820 86 C 890 42, 962 42, 1038 86'
        ]
      : [
          'M 120 138 C 180 86, 250 84, 320 138',
          'M 528 138 C 602 86, 688 84, 820 138',
          'M 820 196 C 892 242, 960 242, 1038 196'
        ];

  return (
    <article className="editorial-pipeline-row">
      <p className="editorial-pipeline-label">{pipeline.title}</p>
      <div className="editorial-pipeline-canvas">
        <svg className="editorial-pipeline-svg" viewBox="0 0 1100 260" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id={`arrow-${index}`} markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#111216" />
            </marker>
          </defs>
          {curvePaths.map((path, pathIndex) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke="#111216"
              strokeWidth="1.2"
              markerEnd={`url(#arrow-${index})`}
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, delay: pathIndex * 0.08, ease: 'easeOut' }}
            />
          ))}
        </svg>

        {pipeline.steps.map((step, stepIndex) => {
          const node = PIPELINE_LAYOUTS[index][stepIndex];
          const alignClass =
            node.align === 'left'
              ? 'editorial-pipeline-node align-left'
              : node.align === 'right'
                ? 'editorial-pipeline-node align-right'
                : 'editorial-pipeline-node';

          return (
            <motion.div
              key={step}
              className={
                stepIndex === pipeline.steps.length - 1 ? `${alignClass} is-alert` : alignClass
              }
              style={{ left: node.left, top: node.top, width: `${node.width}px` }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.45, delay: stepIndex * 0.06 + index * 0.08 }}
            >
              {step}
            </motion.div>
          );
        })}
      </div>
    </article>
  );
}

function MobilePipeline({ pipeline }) {
  return (
    <article className="editorial-pipeline-mobile-row">
      <p className="editorial-pipeline-label">{pipeline.title}</p>
      <div className="editorial-pipeline-mobile-steps">
        {pipeline.steps.map((step, index) => (
          <div key={step} className={index === pipeline.steps.length - 1 ? 'editorial-pipeline-mobile-step is-alert' : 'editorial-pipeline-mobile-step'}>
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
        {items.map((pipeline, index) => (
          <DesktopPipeline key={pipeline.title} pipeline={pipeline} index={index} />
        ))}
      </div>

      <div className="editorial-pipeline-mobile">
        {items.map((pipeline) => (
          <MobilePipeline key={pipeline.title} pipeline={pipeline} />
        ))}
      </div>
    </div>
  );
}
