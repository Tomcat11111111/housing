import React, { useState } from 'react';

import { useToast } from '@/app/contexts/ToastContext';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';

import { useAuthTypeStore, useSigninStore } from '@/store/useAuthStore';

import ModalHeader from './ModalHeader';
import { signinApi } from './actions';
import Cookies from 'js-cookie';

const SignInModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    password,
    setEmail,
    setPassword,
    accessToken,
    setAccessToken,
  } = useSigninStore();
  const { setAuthType, setModalOpen, checkToken } = useAuthTypeStore();
  const { showToast } = useToast();

  const handleShowPassword = () => setShowPassword((show) => !show);

  const { mutate: signin } = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      const token = data.access_token;
      setAccessToken(token);
      localStorage.setItem('jzj_token', token);
      Cookies.set('jzj_token', token, {
        expires: 15,
        path: '/',
        secure: true,
        sameSite: 'Strict',
      });
      checkToken();

      showToast('success', '登入成功');
      setModalOpen(false);
    },
    onError: (error) => {
      showToast('error', '登入失敗');
    },
  });

  const handleSignin = () => {
    signin({ email, password });
  };

  return (
    <div>
      <ModalHeader />
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
