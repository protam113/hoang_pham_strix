import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from '@/types/data/project.data';
import { motion, useInView } from 'framer-motion';
import { Code, Database, GitBranch, Layout } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Container } from './layout/container';

function SkillTag({ name }: { name: string }) {
  return (
    <motion.div
      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {name}
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const t = useTranslations('Page');

  return (
    <section className="py-24 md:py-32 bg-main" ref={ref}>
      <Container>
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4">My Skills</Badge>
            <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-4xl md:text-5xl">
              {t('Technical.title')}
            </h2>
            <div className="w-12 h-1 bg-primary my-4" />
            <p className="max-w-[700px] text-gray-200 -foreground">
              {t('Technical.content')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Layout className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">Front-end</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Tags['Front-end'].map((skill) => (
                  <SkillTag key={skill} name={skill} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">Back-end</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Tags['Back-end'].map((skill) => (
                  <SkillTag key={skill} name={skill} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">Database</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Tags.Database.map((skill) => (
                  <SkillTag key={skill} name={skill} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">
                  CI/CD & Architecture
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Tags['CI-CD'], ...Tags.Architecture].map((skill) => (
                  <SkillTag key={skill} name={skill} />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="space-y-6 mt-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle> {t('Technical.development')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10 text-primary">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('Technical.t1.a')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('Technical.t1.q')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10 text-primary">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('Technical.t2.a')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('Technical.t2.q')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10 text-primary">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('Technical.t3.a')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('Technical.t3.q')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
