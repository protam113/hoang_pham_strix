'use client';

import { AboutSection } from '@/components/AboutSection';
import { ContactForm } from '@/components/ContactForm';
import { Introduce } from '@/components/introduce';
import Footer from '@/components/layout/footer';
import NavBar from '@/components/layout/nav';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import TextMarquee from '@/components/TitleMarquee';
export const MyPage = () => {
  const sections = [
    { id: 'main', label: 'Introduce', color: '#013162' },
    { id: 'about', label: 'Who am i?', color: '#013162' },
    { id: 'projects', label: 'Projects', color: '#013162' },
    { id: 'skills', label: 'Skills', color: '#013162' },
    { id: 'contact', label: "Let's Connect ", color: '#013162' },
  ];
  return (
    <div>
      <NavBar sections={sections} />
      <main>
        <section id="main">
          <Introduce />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="contact">
          <TextMarquee />
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};
