import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

function MetricValue({ metric, active }) {
  const canCount = Number.isInteger(metric.value) && metric.display === String(metric.value);
  const base = useMotionValue(0);
  const rounded = useTransform(base, (latest) => Math.round(latest));

  useEffect(() => {
    if (!active || !canCount) {
      return;
    }
    const controls = animate(base, metric.value, { duration: 1.2, ease: 'easeOut' });
    return () => controls.stop();
  }, [active, base, canCount, metric.value]);

  if (!canCount) {
    return <div className="metric-value">{metric.display}</div>;
  }

  return <motion.div className="metric-value">{rounded}</motion.div>;
}

export default function MetricsGrid({ metrics, active }) {
  return (
    <div className="metrics-grid">
      {metrics.map((metric) => (
        <div className="metric-cell" key={metric.label}>
          <div className="metric-label">{metric.label}</div>
          <MetricValue metric={metric} active={active} />
          <div className="metric-desc">{metric.desc}</div>
        </div>
      ))}
    </div>
  );
}
