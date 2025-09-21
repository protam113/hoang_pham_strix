import { Container } from './layout/container';

export function Introduce() {
  return (
    <div
      className="min-h-screen bg-main flex items-center"
      style={{
        backgroundImage: 'url(/imgs/bgHome.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-2">
              <div className="text-sm text-muted-foreground bg-white font-mono tracking-wider">
                PORTFOLIO / 2025
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-400 tracking-tight">
                Pham
                <br />
                <span className="text-white">Hoang</span>
              </h1>
            </div>

            <div className="space-y-6 max-w-md">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Fullstack Developer crafting digital experiences at the
                intersection of
                <span className="text-gray-100"> design</span>,
                <span className="text-gray-100"> technology</span>, and
                <span className="text-gray-100"> user experience</span>.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500  rounded-full animate-pulse"></div>
                  Available for work
                </div>
                <div>Vietnamese</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            <div className="space-y-4">
              <div className="text-sm text-gray-200 font-mono">CURRENTLY</div>
              <div className="space-y-2">
                <div className="text-white">Fullstack Developer</div>
                <div className="text-white">@ _mh.len_</div>
                {/* <div className="text-xs text-muted-foreground">
                  2021 — Present
                </div> */}
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-200 font-mono">FOCUS</div>
              <div className="flex flex-wrap gap-2">
                {[
                  // Core Frontend
                  'React',
                  'Next.js',
                  'TypeScript',
                  'JavaScript (ES6+)',
                  'TailwindCSS',
                  'UI/UX (Figma)',

                  // Backend
                  'Node.js',
                  'NestJS',
                  'Express',

                  // Database
                  'MongoDB',
                  'PostgreSQL',
                  'MySQL',
                  'MariaDB',
                  'Redis',

                  // DevOps / Tools
                  'Docker',
                  'Git / GitHub',
                  'CI/CD',
                  'Cloud Deployment',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border text-white rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
