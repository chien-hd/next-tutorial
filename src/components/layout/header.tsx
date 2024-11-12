'use client';

import { useFetchUser, useLogout } from '@/apis/auth.api';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { clientSessionToken } from '@/config/http.config';
import { useRouter } from 'next/navigation';

const Header = () => {
  const Logout = useLogout();

  const { data: userData } = useFetchUser();

  const router = useRouter();

  const handleLogout = () => {
    Logout.mutate();
  };

  return (
    <div className='fixed right-0 top-0'>
      <Menubar>
        {clientSessionToken && (
          <MenubarMenu>
            <MenubarTrigger>{userData && userData.data.email}</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => router.push('/profile')}>
                Profile
              </MenubarItem>
              <MenubarItem onClick={() => router.push('/setting')}>
                Setting
              </MenubarItem>
              <MenubarItem onClick={handleLogout} disabled={Logout.isPending}>
                Đăng xuất
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        )}
      </Menubar>
    </div>
  );
};

export default Header;
