import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Container } from './layout/container';
import { StatsSection } from './StatsSection';

export function AboutSection() {
  const t = useTranslations('Page');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div className="mt-16">
      <motion.div
        className="flex flex-col items-center text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-black tracking-tighter sm:text-4xl md:text-5xl">
          Who I Am
        </h2>
        <div className="w-12 h-1 bg-white my-4" />
      </motion.div>
      <div ref={ref} className="py-24 ">
        <Container className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col md:flex-row gap-12 items-start"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl uppercase tracking-wider text-gray-800">
                (ABOUT ME)
              </h2>
            </motion.div>

            <motion.div
              className="md:w-2/3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-gray-900 leading-relaxed">
                &quot;{t('Introduce.content1')}
              </p>

              <p className="text-lg text-gray-900 leading-relaxed">
                {t('Introduce.content2')} &quot;
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </div>
      <StatsSection />
    </div>
  );
}
