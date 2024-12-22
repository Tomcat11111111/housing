import React from 'react';

import { Button } from '@mui/material';

import { useAuthTypeStore } from '@/store/useAuthStore';

import ModalHeader from './ModalHeader';

const UnauthorizedModal = ({ setOpen }) => {
  const { setAuthType } = useAuthTypeStore();
  return (
    <div>
      <ModalHeader setOpen={setOpen} />
      <div className="flex flex-1 flex-col items-center gap-2">
        <h1
          className=" font-bold"
          style={{
            fontSize: '24px',
            lineHeight: '36px',
          }}
        >
          尚未登入
        </h1>
        <p className="text-xs text-[#909090]">
          請先登入/註冊會員，才能進行收藏喔～
        </p>
      </div>
      <div
        className=" flex flex-1 flex-col items-center gap-2"
        style={{
          paddingTop: '32px',
        }}
      >
        <Button
          //   onClick={handleNext}
          sx={{
            height: '56px',
            width: '400px',
            bgcolor: '#0936D8',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#F6F6F6',
            borderRadius: '8px',
          }}
        >
          前往登入
        </Button>
        <Button
          //   onClick={handleNext}
          sx={{
            height: '56px',
            width: '400px',
            border: '1px solid #0936D8',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#0936D8',
            borderRadius: '8px',
          }}
        >
          繼續訪客模式
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedModal;
