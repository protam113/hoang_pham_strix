import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { Code } from 'lucide-react';
import { useRef } from 'react';
import { Container } from './layout/container';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const skills = [
    { name: 'React', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 70 },
    { name: 'CSS/Tailwind', level: 80 },
    { name: 'UI/UX Design', level: 80 },
  ];

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
              Technical Expertise
            </h2>
            <div className="w-12 h-1 bg-primary my-4" />
            <p className="max-w-[700px] text-gray-200 -foreground">
              I&apos;ve developed a diverse set of skills throughout my career,
              focusing on modern web technologies and best practices.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">{skill.name}</h3>
                    <span className="text-white">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-main-600"
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Development Approach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Clean, Maintainable Code</h4>
                      <p className="text-sm text-muted-foreground">
                        I write well-structured, documented code following best
                        practices and design patterns.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Responsive Design</h4>
                      <p className="text-sm text-muted-foreground">
                        All my projects are fully responsive, ensuring a great
                        user experience on any device.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Performance Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        I focus on creating fast, efficient applications with
                        optimized assets and code splitting.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
