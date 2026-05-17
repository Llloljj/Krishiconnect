import { motion } from 'framer-motion';

export default function AnimatedBarChart({
  data = [40, 65, 45, 80, 55, 90, 70],
  animate = true,
  className = '',
  barClassName = 'bg-gradient-to-t from-primary to-primary-light',
}) {
  return (
    <motion.div
      className={`flex h-full items-end justify-between gap-1.5 sm:gap-2 ${className}`}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : false}
      viewport={{ once: true }}
    >
      {data.map((h, i) => (
        <motion.div
          key={i}
          className={`w-full rounded-t-md ${barClassName}`}
          variants={{
            hidden: { height: 0 },
            visible: {
              height: `${h}%`,
              transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        />
      ))}
    </motion.div>
  );
}
