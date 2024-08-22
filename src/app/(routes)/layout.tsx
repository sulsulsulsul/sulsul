import { FunctionComponent, PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="container px-0 pt-[32px] sm:px-3 md:px-5">{children}</div>
  );
};

export default Layout;
