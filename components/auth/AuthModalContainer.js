'use client';

import React, { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import { useAuthTypeStore } from '@/store/useAuthStore';

import EnterEmailModal from './EnterEmailModal';
import EnterPasswordModal from './EnterPasswordModal';
import SignInModal from './SignInModal';
import SignupModal from './SignupModal';
import UnauthorizedModal from './UnauthorizedModal';
import VerifyEmailModal from './VerifyEmailModal';

const AuthModalContainer = () => {
  const { authType, modalOpen, setModalOpen } = useAuthTypeStore();

  const handleClose = () => {
    setModalOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    borderRadius: '16px',
    width: '463px',
    paddingBottom: '32px',
  };

  return (
    <div>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box sx={style}>
          {authType === 'unauthorized' && <UnauthorizedModal />}
          {authType === 'signin' && <SignInModal />}
          {authType === 'signup' && <SignupModal />}
          {authType === 'enterEmail' && <EnterEmailModal />}
          {authType === 'verifyEmail' && <VerifyEmailModal />}
          {authType === 'enterPassword' && <EnterPasswordModal />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModalContainer;
