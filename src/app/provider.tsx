import AppContextProvider from '@/providers/app-context';
import AppQueryProvider from '@/providers/query-provider';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  return (
    <AppQueryProvider>
      <AppContextProvider inititalSessionToken={sessionToken}>
        {children}
      </AppContextProvider>
    </AppQueryProvider>
  );
};

export default AppProvider;
