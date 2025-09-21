import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { Code } from 'lucide-react';
import { useRef } from 'react';
import { Container } from './layout/container';

const skills = {
  frontend: [
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'TypeScript', level: 85 },
    { name: 'JavaScript (ES6+)', level: 85 },
    { name: 'CSS/Tailwind', level: 85 },
    { name: 'UI/UX Design (Figma)', level: 80 },
    { name: 'Testing (unit/e2e)', level: 60 },
  ],
  backend: [
    { name: 'Node.js', level: 70 },
    { name: 'NestJS', level: 75 },
    { name: 'Express.js', level: 70 },
    { name: 'RESTful API', level: 80 },
    { name: 'GraphQL (basic)', level: 60 },
    { name: 'Caching / Performance', level: 70 },
    { name: 'MongoDB/ PostgreSQL / MySQL / MariaDB', level: 70 },
    { name: 'Redis', level: 65 },
  ],
  workflow: [
    { name: 'Git/GitHub/GitLab', level: 80 },
    { name: 'Agile/Scrum Workflow', level: 65 },
    { name: 'CI/CD (basic)', level: 60 },
    { name: 'Docker + Deployment', level: 75 },
  ],
};

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm text-white mb-1">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Frontend</h3>
              {skills.frontend.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Backend & DevOps
              </h3>
              {skills.backend.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Workflow</h3>
              {skills.workflow.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </div>

          <motion.div
            className="space-y-6 mt-8"
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
                    <h4 className="font-medium">Performance Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      I focus on creating fast, efficient applications with
                      optimized assets and code splitting.
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
