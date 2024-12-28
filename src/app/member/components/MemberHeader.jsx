'use client';

import BurgerMenu from '@/components/common/BurgerMenu/BurgerMenu';
import Logo from '@/components/common/Logo/Logo';

const MemberHeader = () => {
  return (
    <header className="flex w-full fixed top-0 z-10 h-20 bg-[#ffffff]">
      <div className="p-4">
        <Logo size="big" />
      </div>
      <div className="flex flex-1 justify-between items-center">
        <div className="text-xl font-bold">會員中心</div>
        <div className=" flex gap-2 items-center mr-20">
          <div className=" p-2">刊登廣告</div>
          <div className=" p-2">我有物件</div>
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
