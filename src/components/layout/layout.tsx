// src/components/layout/DefaultLayout/index.tsx

import { DefaultLayoutProps } from '@/types/types.prob';

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <main>{children}</main>

      {/* <Footer /> */}
    </div>
  );
};

export default DefaultLayout;
