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

const Sidebar = () => {
  const Logout = useLogout();
  const { data: userData } = useFetchUser();
  const handleLogout = () => {
    Logout.mutate();
  };

  console.log('clientSessionToken', clientSessionToken);

  return (
    <div className='fixed right-0 top-0'>
      <Menubar>
        {clientSessionToken && (
          <MenubarMenu>
            <MenubarTrigger>{userData && userData.data.email}</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Profile</MenubarItem>
              <MenubarItem>Setting</MenubarItem>
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

export default Sidebar;
