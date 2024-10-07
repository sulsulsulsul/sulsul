import { FunctionComponent, PropsWithChildren } from 'react';

import { Header } from '@/components/layouts/header';

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-[910px] overflow-hidden bg-gray-50">
      <Header />
      <div className="min-h-[calc(100vh-60px)]">
        <div className="container px-0 pt-[32px] sm:px-3 md:px-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
