import Header from '@/components/layout/header';
import { ReactNode } from 'react';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
