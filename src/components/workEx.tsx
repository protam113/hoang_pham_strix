'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import { Container } from './layout/container';

export const WorkEx = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.work-item');
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const workExperiences = [
    {
      title: 'Hội Dòng Anh Em Đức Maria',
      roles: ['Leader', 'UX/UI', 'Frontend', 'Backend'],
      period: 'Aug 2024 – Oct 2024',
      description:
        'Developed an informational and content management website for the organization. Handled everything from UI/UX design to backend implementation, ensuring performance optimization and easy content management.',
      tech: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
    },
    {
      title: 'Hust4l Blog (Agency Project)',
      roles: ['Fullstack Developer', 'UI/UX Designer'],
      period: '2024',
      description:
        'Built a modern blog system for an agency project. Focused on delivering a sleek UI, responsive layout, and SEO optimization for better online presence.',
      tech: ['Next.js', 'TailwindCSS', 'TypeScript'],
    },
    {
      title: 'Unien Company Website',
      roles: ['Leader', 'UX/UI', 'Frontend'],
      period: '2024',
      description:
        'Developed the official website for Unien company. Ensured a professional corporate image, responsive design, and optimized performance across devices.',
      tech: ['React', 'TailwindCSS', 'UI/UX Design'],
    },
    {
      title: 'Vietstrix (Freelance Project)',
      roles: ['Founder', 'Leader', 'Fullstack Developer', 'UI/UX Designer'],
      period: '2024 – Present',
      description:
        'Personal freelance project oriented towards building a startup. Responsible for product development, exploring new technologies, and managing the entire development lifecycle.',
      tech: ['React', 'Next.js', 'NestJS', 'MongoDB', 'Cloud Deployment'],
    },
  ];

  return (
    <section className="bg-main min-h-screen text-white py-16 px-6">
      {/* Section header */}
      <h2 className="text-base font-bold text-white uppercase mt-4 mb-4 flex items-center gap-2">
        <ArrowUpRight size={20} strokeWidth={1.5} /> Work Experience
      </h2>
      <div className="border-b border-gray-400 mt-4" />

      <Container className="max-w-6xl mx-auto grid grid-cols-12 gap-8 min-h-screen">
        {/* Left side */}
        <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
          <h2 className="text-4xl font-bold text-white uppercase mt-4 mb-4 flex items-center gap-2 leading-tight">
            <ArrowUpRight size={40} strokeWidth={1.5} /> Work <br /> Experience
          </h2>
        </div>

        {/* Right side */}
        <div className="space-y-10 col-span-12 lg:col-span-8">
          {workExperiences.map((item, index) => (
            <div
              key={index}
              className="work-item opacity-0 translate-y-10 transition-all duration-700"
            >
              <h3 className="text-2xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{item.period}</p>
              <p className="text-gray-300 mb-3">{item.description}</p>

              {/* Roles */}
              {item.roles && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.roles.map((role, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-white text-primary rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}

              {/* Tech */}
              <div className="flex flex-wrap gap-2">
                {item.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-white/10 text-white rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Separator */}
              {index < workExperiences.length - 1 && (
                <div className="border-b border-gray-700 mt-6" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
// https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing
