import React from 'react';

import AnnouncementCard from './components/AnnouncementCard';
import MemberHeader from './components/MemberHeader';
import PaymentCard from './components/PaymentCard';
import UserCard from './components/UserCard';

export default function MemberLayout({ children }) {
  return (
    <div>
      <MemberHeader />
      <div className=" flex flex-col py-6 px-20 gap-6">
        <div className="flex mt-20 gap-6 items-center self-stretch h-[210px]">
          <UserCard />
          <PaymentCard />
          <AnnouncementCard />
        </div>
        {children}
      </div>
    </div>
  );
}
