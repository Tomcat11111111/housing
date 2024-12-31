'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import BurgerMenu from '@/components/common/BurgerMenu/BurgerMenu';
import Logo from '@/components/common/Logo/Logo';

import { useAuthTypeStore } from '@/store/useAuthStore';

const MemberHeader = () => {
  const { hasToken } = useAuthTypeStore();
  const router = useRouter();
  return (
    <header className="flex w-full fixed top-0 z-10 h-20 bg-[#ffffff]">
      <div className="p-4">
        <Logo size="big" />
      </div>
      <div className="flex flex-1 justify-between items-center">
        <div className="text-xl font-bold">會員中心</div>
        <div className=" flex gap-2 items-center mr-20">
          <div className=" p-2">
            <Button
              onClick={() => {
                if (!hasToken) {
                  setAuthType('unauthorized');
                  setModalOpen(true);
                } else {
                  router.push('/publish');
                }
              }}
              sx={{
                color: '#333333',
                fontWeight: '700',
              }}
              className=" rounded-lg hover:bg-[#e9e9e9]  font-bold"
            >
              在TOPRE上刊登物件
            </Button>
          </div>
          <div className=" p-2">|</div>
          <div>
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;
