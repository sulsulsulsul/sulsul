import { FunctionComponent, PropsWithChildren } from 'react';

import { Header } from '@/components/layouts/header';

import DonationButton from '../(without-header)/donation/components/donation-button';

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-[910px] overflow-hidden bg-gray-50">
      <Header />
      <div className="min-h-[calc(100vh-60px)]">{children}</div>
      <DonationButton />
    </div>
  );
};

export default Layout;
