import { motion } from 'framer-motion';

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <motion.div
          className="timeline-item"
          key={item.step}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.07, duration: 0.35, ease: 'easeOut' }
          }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="timeline-date">{item.step}</div>
          <div className="timeline-content">
            <div className="timeline-title">{item.title}</div>
            <div className="timeline-body">{item.body}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
