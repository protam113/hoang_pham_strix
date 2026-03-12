'use client';

import AppSections from '@/components/appsSection';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/hero';
import Footer from '@/components/layout/footer';
import NavBar from '@/components/layout/nav';
import MissionSection from '@/components/missionSection';
import MasonryGallerySection from '@/components/project';
import SectionTransition from '@/components/SectionTransition';
import Slogan from '@/components/slogan';
import TechSection from '@/components/techSection';
import TextMarquee from '@/components/TitleMarquee';
import { WorkEx } from '@/components/workEx';
import { useLoading } from '@/contexts/LoadingContext';

export const MyPage = () => {
  const { heroReady } = useLoading();

  const sections = [
    { id: 'main', label: 'Introduce', color: '#013162' },
    { id: 'about', label: 'Who am i?', color: '#013162' },
    { id: 'experience', label: 'Work Experience', color: '#013162' },
    { id: 'projects', label: 'Projects', color: '#013162' },
    { id: 'skills', label: 'Skills', color: '#013162' },
    { id: 'apps', label: 'Apps', color: '#013162' },
  ];

  if (!heroReady) return null;

  return (
    <div>
      <CustomCursor />
      <NavBar sections={sections} />
      <main className="bg-main">
        <section id="main">
          <HeroSection />
        </section>

        <SectionTransition id="about" className="-mt-[100vh]">
          <MissionSection />
        </SectionTransition>

        <SectionTransition id="experience">
          <WorkEx />
        </SectionTransition>

        <SectionTransition
          id="projects"
          className="relative z-10 pb-20 md:pb-32"
        >
          <MasonryGallerySection />
        </SectionTransition>

        <SectionTransition id="skills" className="relative z-20 mt-32 md:mt-24">
          <TechSection />
          <Slogan />
        </SectionTransition>

        <SectionTransition id="apps">
          <AppSections />
          <TextMarquee />
        </SectionTransition>
      </main>
      <Footer />
    </div>
  );
};
