import React, { useState } from 'react';

import { Button, Divider } from '@mui/material';
import { ChevronLeft, X } from 'lucide-react';

import useAuthTypeStore from '@/store/useAuthTypeStore';

const SignupModal = ({ setOpen }) => {
  const [identity, setIdentity] = useState('normal');
  const { setAuthType } = useAuthTypeStore();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className="flex flex-1 items-center justify-between"
        style={{
          paddingInline: '32px',
          paddingBlock: '16px',
        }}
      >
        <ChevronLeft className=" cursor-pointer" />
        <p
          className="font-bold"
          style={{
            fontSize: '24px',
          }}
        >
          註冊身分
        </p>
        <X onClick={handleClose} className=" cursor-pointer w-6 h-6" />
      </div>
      <Divider />

      <div
        className="flex flex-col gap-4 justify-center items-center"
        style={{
          padding: '32px',
        }}
      >
        <Button
          onClick={() => setIdentity('normal')}
          sx={{
            height: '90px',
            width: '400px',
            fontSize: '16px',
            lineHeight: '24px',
            bgcolor: identity === 'normal' ? '#0936D8' : '',
            color: identity === 'normal' ? '#F6F6F6' : '#cccccc',
            border:
              identity === 'normal' ? '1px solid #F6F6F6' : '1px solid #cccccc',
            borderRadius: '8px',
          }}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-sm">一般會員</p>
            <div
              style={{
                height: '1px',
                border:
                  identity === 'normal'
                    ? '1px solid #F6F6F6'
                    : '1px solid #cccccc',
                width: '330px',
              }}
            />
            <p className="text-xs">買屋/租屋/求租/設計師</p>
          </div>
        </Button>

        <Button
          onClick={() => setIdentity('owner')}
          sx={{
            height: '90px',
            width: '400px',
            fontSize: '16px',
            lineHeight: '24px',
            bgcolor: identity === 'owner' ? '#0936D8' : '',
            color: identity === 'owner' ? '#F6F6F6' : '#cccccc',
            border:
              identity === 'owner' ? '1px solid #F6F6F6' : '1px solid #cccccc',
            borderRadius: '8px',
          }}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <p className=" text-sm">屋主/建商</p>
            <div
              style={{
                height: '1px',
                border:
                  identity === 'owner'
                    ? '1px solid #F6F6F6'
                    : '1px solid #cccccc',
                width: '330px',
              }}
            />
            <p className=" text-xs">屋主本人或親友自行出租出售</p>
          </div>
        </Button>
      </div>

      <div className=" flex flex-1 justify-center items-center gap-2">
        <Button
          onClick={() => setAuthType('enterEmail')}
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
          繼續
        </Button>
      </div>
    </div>
  );
};

export default SignupModal;
