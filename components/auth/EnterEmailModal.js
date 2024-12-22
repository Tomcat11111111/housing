import React, { useState } from 'react';

import { Button, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthTypeStore, useRegisterStore } from '@/store/useAuthStore';

import AuthStepper from './AuthStepper';
import ModalHeader from './ModalHeader';

const EnterEmailModal = ({ setOpen }) => {
  const { setAuthType } = useAuthTypeStore();
  const { email, name, setEmail, setName } = useRegisterStore();

  const sendVerificationCodeApi = async ({ email }) => {
    try {
      const response = await axios.post(
        'https://jzj-api.zeabur.app/auth/register/send-code',
        {
          email,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: sendVerificationCode } = useMutation({
    mutationFn: sendVerificationCodeApi,
    onSuccess: () => {
      setAuthType('verifyEmail');
    },
    onError: (error) => {
      console.error('Sent Verification Code failed:', error);
    },
  });

  const handleNext = () => {
    sendVerificationCode({ email });
  };

  return (
    <div>
      <ModalHeader setOpen={setOpen} />
      <div
        className=" flex flex-col gap-4 justify-center "
        style={{ padding: '32px' }}
      >
        <TextField
          id="name"
          placeholder="請輸入姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: '400px', borderRadius: '8px' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: 2 }}>
                  姓名
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id="email"
          placeholder="請輸入電子信箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: '400px', borderRadius: '8px' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: 2 }}>
                  電子信箱
                </InputAdornment>
              ),
            },
          }}
        />
        <p className=" text-xs text-[#909090]">
          我們會傳驗證碼，以確認你的電子信箱
        </p>
      </div>

      <div className=" flex flex-1 flex-col justify-center items-center gap-2">
        <AuthStepper />
        <Button
          onClick={handleNext}
          disabled={!email && !name}
          sx={{
            height: '56px',
            width: '400px',
            bgcolor: email ? '#0936D8' : '#cccccc',
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

export default EnterEmailModal;
