import React from 'react';

import { Avatar, Divider } from '@mui/material';
import { Mail, Pencil, Phone } from 'lucide-react';

const UserCard = () => {
  return (
    <div className=" flex p-6 items-center gap-4 self-stretch bg-[#fff] h-full">
      <div>
        <Avatar
          sx={{
            height: '150px',
            width: '150px',
          }}
        >
          H
        </Avatar>
      </div>
      <div className=" flex flex-col">
        <div className=" flex justify-center items-center gap-4 mb-2">
          <p className=" text-[32px] font-bold">Hunter</p>
          <Pencil className=" bg-[#E9E9E9] w-10 h-10 rounded-2xl items-center justify-center p-2" />
        </div>
        <Divider />
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-2">
            <Mail />
            <p>xxxx@gmail.com</p>
          </div>
          <div className="flex gap-2">
            <Phone />
            <p>0987654321</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
