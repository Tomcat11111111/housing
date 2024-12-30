import React from 'react';

import { Divider } from '@mui/material';
import { ChevronLeft, X } from 'lucide-react';

import { useAuthTypeStore } from '@/store/useAuthStore';

const ModalHeader = () => {
  const { authType, setAuthType, setModalOpen } = useAuthTypeStore();
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleBack = () => {
    if (authType === 'signup') setAuthType('signin');
    if (authType === 'enterEmail') setAuthType('signup');
    if (authType === 'verifyEmail') setAuthType('enterEmail');
    if (authType === 'enterPassword') setAuthType('verifyEmail');
  };

  return (
    <>
      <div
        className="flex flex-1 items-center justify-between"
        style={{
          paddingInline: '32px',
          paddingBlock: '16px',
        }}
      >
        <div className="w-6 h-6">
          <ChevronLeft
            onClick={handleBack}
            className={`cursor-pointer ${(authType === 'signin' || authType === 'unauthorized') && 'hidden'}`}
          />
        </div>
        <p
          className="font-bold"
          style={{
            fontSize: '24px',
            paddingLeft: authType === 'signin' && '24px',
          }}
        >
          {authType === 'signin' && '登入'}
          {authType === 'signup' && '註冊身分'}
          {authType === 'enterEmail' && '電子信箱/姓名'}
          {authType === 'verifyEmail' && '驗證信箱'}
          {authType === 'enterPassword' && '密碼設定'}
          {authType === 'resetPassword' && '重設密碼'}
          {authType === 'unauthorized' && ''}
        </p>
        <X onClick={handleClose} className=" cursor-pointer w-6 h-6" />
      </div>
      {authType !== 'unauthorized' && <Divider />}
    </>
  );
};

export default ModalHeader;
