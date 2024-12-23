import React, { useState } from 'react';

import {
  Button,
  IconButton,
  InputAdornment,
  Radio,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

import { useAuthTypeStore, useRegisterStore } from '@/store/useAuthStore';

import AuthStepper from './AuthStepper';
import ModalHeader from './ModalHeader';
import { completeRegistrationApi } from './actions';

const EnterPasswordModal = ({ setOpen }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthType } = useAuthTypeStore();
  const {
    email,
    verificationToken,
    password,
    setPassword,
    setAccessToken,
    accessToken,
  } = useRegisterStore();

  const handleShowPassword = () => setShowPassword((show) => !show);

  const validations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };

  const getRadioStyle = (condition) => ({
    width: '20px',
    height: '20px',
    color: !password
      ? '#cccccc'
      : validations[condition]
        ? '#0936D8'
        : '#F44336',
    '&.Mui-checked': {
      color: '#0936D8',
    },
  });

  const areAllValidationsMet = () => {
    return Object.values(validations).every((isValid) => isValid);
  };

  const isContinueButtonEnabled = () => {
    return areAllValidationsMet() && password === confirmPassword;
  };

  const { mutate: completeRegistration } = useMutation({
    mutationFn: completeRegistrationApi,
    onSuccess: (data) => {
      const token = data.access_token;
      console.log(token);
      setAccessToken(token);
      localStorage.setItem('token', token);
      Cookies.set('token', token, {
        expires: 1,
        path: '/',
        secure: true,
        sameSite: 'Strict',
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error('Complete Registration failed:', error);
    },
  });

  const handleNext = () => {
    completeRegistration({ email, password, verificationToken });
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
        <div className="flex flex-col flex-1 gap-2">
          <TextField
            id="password"
            placeholder="請輸入密碼"
            error={password && !areAllValidationsMet()}
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
                      {showPassword ? (
                        <EyeOff
                          style={{
                            color:
                              password && !areAllValidationsMet() && '#F44336',
                          }}
                        />
                      ) : (
                        <Eye
                          style={{
                            color:
                              password && !areAllValidationsMet() && '#F44336',
                          }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className="flex gap-2">
            <div
              className="flex items-center"
              style={{
                gap: '4px',
              }}
            >
              <Radio
                checked={validations.minLength}
                sx={getRadioStyle('minLength')}
                disableRipple
              />
              <p className=" text-xs">8個字元</p>
            </div>
            <div
              className="flex items-center"
              style={{
                gap: '4px',
              }}
            >
              <Radio
                checked={validations.hasUppercase}
                sx={getRadioStyle('hasUppercase')}
                disableRipple
              />
              <p className=" text-xs">1個大寫字母</p>
            </div>
            <div
              className="flex items-center"
              style={{
                gap: '4px',
              }}
            >
              <Radio
                checked={validations.hasNumber}
                sx={getRadioStyle('hasNumber')}
                disableRipple
              />
              <p className=" text-xs">1個數字</p>
            </div>
            <div
              className="flex items-center"
              style={{
                gap: '4px',
              }}
            >
              <Radio
                checked={validations.hasLowercase}
                sx={getRadioStyle('hasLowercase')}
                disableRipple
              />
              <p className=" text-xs">1個小寫字母</p>
            </div>
          </div>
        </div>
        <TextField
          id="confirmPassword"
          placeholder="請再輸入密碼一次"
          value={confirmPassword}
          type={showPassword ? 'text' : 'password'}
          error={confirmPassword && password !== confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: '400px' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: 2 }}>
                  確認密碼
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" className=" cursor-pointer">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? (
                      <EyeOff
                        style={{
                          color:
                            confirmPassword &&
                            password !== confirmPassword &&
                            '#F44336',
                        }}
                      />
                    ) : (
                      <Eye
                        style={{
                          color:
                            confirmPassword &&
                            password !== confirmPassword &&
                            '#F44336',
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
      <div className=" flex flex-1 flex-col justify-center items-center gap-2">
        <AuthStepper />
        <Button
          disabled={!isContinueButtonEnabled()}
          onClick={handleNext}
          sx={{
            height: '56px',
            width: '400px',
            bgcolor: isContinueButtonEnabled() ? '#0936D8' : '#cccccc',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#F6F6F6',
            borderRadius: '8px',
          }}
        >
          完成登入
        </Button>
      </div>
    </div>
  );
};

export default EnterPasswordModal;
