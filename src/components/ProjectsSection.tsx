import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export function ProjectsSection() {
  const t = useTranslations('Page');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const router = useRouter();

  const projects = [
    {
      title: 'Hoi Dong Anh Em Duc Maria',
      category: 'Organization',
      image: '/imgs/hdh.jpg',
      href: 'https://hoidonganhemducmaria.com/',
    },
    {
      title: 'Vietstirx',
      category: 'Start Up ',
      image: '/imgs/vsv.jpg',
    },
    {
      title: 'Hust4l',
      category: 'Commerce site',
      image: '/imgs/husth.jpg',
      href: 'https://hust4l.vercel.app/',
    },

    {
      title: 'UNIEN',
      category: 'Company blog',
      image: '/imgs/unu.jpg',
      href: 'https://unien.vercel.app/',
    },
    {
      title: 'VIA',
      category: 'Commerce site',
      image: '/imgs/ via.png',
    },
  ];

  return (
    <section ref={ref} className="py-24 ">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-xl uppercase tracking-wider text-gray-800">
            ({t('Featured.title')})
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: any;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-[600px] overflow-hidden">
        <Image
          src={project.image || '/imgs/bgHome.jpg'}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-70" />

        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-300">{project.category}</p>
            <h3 className="text-xl text-gray-200 font-bold mt-1">
              {project.title}
            </h3>
          </div>

          {/* Hiện button ngay khi hover card */}
          <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                variant="outline"
                className="w-full flex justify-center items-center gap-2"
              >
                View Project <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
