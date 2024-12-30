import React, { useEffect, useState } from 'react';

import { useToast } from '@/app/contexts/ToastContext';
import { Button, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useAuthTypeStore, useRegisterStore } from '@/store/useAuthStore';

import AuthStepper from './AuthStepper';
import ModalHeader from './ModalHeader';
import { sendVerificationCodeApi, verifyEmailApi } from './actions';

const VerifyEmailModal = () => {
  const [countdown, setCountdown] = useState(0);
  const { setAuthType } = useAuthTypeStore();
  const {
    email,
    verificationCode,
    setVerificationCode,
    verificationToken,
    setVerificationToken,
  } = useRegisterStore();
  const { showToast } = useToast();

  const { mutate: verifyEmail } = useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (data) => {
      setVerificationToken(data.verificationToken);
      setAuthType('enterPassword');
    },
    onError: (error) => {
      showToast('error', '驗證碼錯誤');
      console.error('Verification failed:', error);
    },
  });

  const handleNext = () => {
    verifyEmail({ email, verificationCode });
  };

  const { mutate: sendVerificationCode } = useMutation({
    mutationFn: sendVerificationCodeApi,
    onSuccess: () => {
      setAuthType('verifyEmail');
    },
    onError: (error) => {
      showToast('error', '驗證碼錯誤');
      console.error('Sent Verification Code failed:', error);
    },
  });

  useEffect(() => {
    if (countdown === 0) return;

    // 每秒減少倒數值
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 清除計時器避免記憶體洩漏
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div>
      <ModalHeader />
      <div
        className=" flex flex-col gap-4 justify-center "
        style={{ padding: '32px' }}
      >
        <TextField
          id="email"
          placeholder="請輸入驗證碼"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          sx={{ width: '400px', borderRadius: '8px' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: 2 }}>
                  驗證碼
                </InputAdornment>
              ),
            },
          }}
        />
        <div className="flex gap-2">
          {countdown > 0 ? (
            <p className="text-xs text-[#909090]">
              {countdown}秒後可以重新傳送
            </p>
          ) : (
            <>
              <p className=" text-xs text-[#909090]">還沒收到驗證碼嗎?</p>
              <p
                className="text-xs text-[#0936D8] cursor-pointer underline"
                onClick={() => {
                  sendVerificationCode({ email });
                  setCountdown(30);
                }}
              >
                重新傳送
              </p>
            </>
          )}
        </div>
      </div>
      <div className=" flex flex-1 flex-col justify-center items-center gap-2">
        <AuthStepper />
        <Button
          onClick={handleNext}
          disabled={!verificationCode}
          sx={{
            height: '56px',
            width: '400px',
            bgcolor: verificationCode ? '#0936D8' : '#cccccc',
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

export default VerifyEmailModal;
