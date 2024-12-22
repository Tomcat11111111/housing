import React, { useState } from 'react';

import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

import { useAuthTypeStore, useSigninStore } from '@/store/useAuthStore';

import ModalHeader from './ModalHeader';

const SignInModal = ({ setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    password,
    setEmail,
    setPassword,
    accessToken,
    setAccessToken,
  } = useSigninStore();
  const { setAuthType } = useAuthTypeStore();

  const handleShowPassword = () => setShowPassword((show) => !show);

  const signinApi = async ({ email, password }) => {
    try {
      const response = await axios.post(
        'https://jzj-api.zeabur.app/auth/login',
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: signin } = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      console.log(accessToken);
      setOpen(false);
    },
  });

  const handleSignin = () => {
    signin({ email, password });
  };

  return (
    <div>
      <ModalHeader setOpen={setOpen} />
      <div
        className="flex flex-col gap-4 justify-center items-center"
        style={{
          paddingInline: '32px',
          paddingTop: '32px',
          paddingBottom: '16px',
        }}
      >
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
        <TextField
          id="contacts"
          placeholder="請輸入密碼"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: '400px' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: 2 }}>
                  密碼
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" className=" cursor-pointer">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <div className="flex w-full  text-xs gap-2">
          <p className="text-[#909090]">還沒有成為會員嗎</p>
          <div className="flex flex-1 justify-between">
            <p
              onClick={() => setAuthType('signup')}
              className=" cursor-pointer underline text-[#0936D8]"
            >
              立即註冊
            </p>
            <p
              onClick={() => setAuthType('forgetPassword')}
              className=" cursor-pointer underline text-[#0936D8]"
            >
              忘記密碼
            </p>
          </div>
        </div>

        <Button
          disabled={!email || !password}
          onClick={handleSignin}
          sx={{
            height: '56px',
            width: '400px',
            bgcolor: email && password ? '#0936D8' : '#CCCCCC',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#F6F6F6',
            borderRadius: '8px',
          }}
        >
          登入
        </Button>
      </div>
    </div>
  );
};

export default SignInModal;
