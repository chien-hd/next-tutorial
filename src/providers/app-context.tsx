'use client';

import { clientSessionToken } from '@/config/http.config';
import { ReactNode, useState } from 'react';

export default function AppContextProvider({
  children,
  inititalSessionToken = '',
}: {
  children: ReactNode;
  inititalSessionToken?: string;
}) {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = inititalSessionToken;
    }
  });
  return <>{children}</>;
}
