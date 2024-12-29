import React, { useState } from 'react';

import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

import { useAuthTypeStore, useSigninStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';

import ModalHeader from './ModalHeader';
import { signinApi } from './actions';
import Cookies from 'js-cookie';

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
  const { setToastOpen, setStatus, setSuccessText, setErrorText } =
    useToastStore();

  const handleShowPassword = () => setShowPassword((show) => !show);

  const { mutate: signin } = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      const token = data.access_token;
      setAccessToken(token);
      localStorage.setItem('token', token);
      Cookies.set('token', token, {
        expires: 1,
        path: '/',
        secure: true,
        sameSite: 'Strict',
      });

      setStatus('success');
      setSuccessText('登入成功');
      setToastOpen(true);
      setOpen(false);
    },
    onError: (error) => {
      setStatus('error');
      setErrorText('信箱/密碼錯誤');
      setToastOpen(true);
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
