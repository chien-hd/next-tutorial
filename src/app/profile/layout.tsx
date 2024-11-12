import DefaultLayout from '@/components/layout/default-layout';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return <DefaultLayout>{children}</DefaultLayout>;
};

export default layout;
