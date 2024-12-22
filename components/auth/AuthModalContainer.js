import React, { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import { useAuthTypeStore } from '@/store/useAuthStore';

import EnterEmailModal from './EnterEmailModal';
import EnterPasswordModal from './EnterPasswordModal';
import SignInModal from './SignInModal';
import SignupModal from './SignupModal';
import VerifyEmailModal from './VerifyEmailModal';

const AuthModalContainer = ({ open, setOpen }) => {
  const { authType, setAuthType } = useAuthTypeStore();

  const handleClose = () => {
    setOpen(false);
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {authType === 'signin' && <SignInModal setOpen={setOpen} />}
          {authType === 'signup' && <SignupModal setOpen={setOpen} />}
          {authType === 'enterEmail' && <EnterEmailModal setOpen={setOpen} />}
          {authType === 'verifyEmail' && <VerifyEmailModal setOpen={setOpen} />}
          {authType === 'enterPassword' && (
            <EnterPasswordModal setOpen={setOpen} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModalContainer;
