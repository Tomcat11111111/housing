import React, { useState } from 'react';

import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { ChevronLeft, Eye, EyeOff, X } from 'lucide-react';

import useAuthTypeStore from '@/store/useAuthTypeStore';

const SignInModal = ({ setOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthType } = useAuthTypeStore();

  const handleShowPassword = () => setShowPassword((show) => !show);

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
        <ChevronLeft style={{ color: 'white' }} />
        <p
          className="font-bold"
          style={{
            fontSize: '24px',
          }}
        >
          登入
        </p>
        <X onClick={handleClose} className=" cursor-pointer w-6 h-6" />
      </div>
      <Divider />
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
        {/* TODO: disable邏輯待更改 */}
        <Button
          disabled={!showPassword}
          sx={{
            height: '56px',
            width: '400px',
            bgcolor: showPassword ? '#0936D8' : '#CCCCCC',
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
