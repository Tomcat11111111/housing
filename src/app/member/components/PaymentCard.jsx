import React from 'react';

import { Button } from '@mui/material';
import { HandCoins, Info } from 'lucide-react';

const PaymentCard = () => {
  return (
    <div className=" flex flex-col p-6 h-full bg-[#fff] justify-between items-center">
      <div className="flex gap-2">
        <p className=" w-[112px] text-sm text-[#333333]">會員下次繳費日期</p>
        <Info className=" w-6 h-6" />
      </div>
      <p className=" text-2xl font-bold">2024/24/24</p>
      <Button className="px-4 py-2 bg-[#0936D8] gap-2  w-full rounded-lg">
        <HandCoins className="text-[#FFFFFF]" />
        <p className=" text-[#FFFFFF]">我要繳費</p>
      </Button>
    </div>
  );
};

export default PaymentCard;
