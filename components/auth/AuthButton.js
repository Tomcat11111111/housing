import React, { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import useAuthTypeStore from '@/store/useAuthTypeStore';

import SignInModal from './SignInModal';
import SignupModal from './SignupModal';

const AuthButton = ({ type }) => {
  const [open, setOpen] = useState(false);
  const { authType, setAuthType } = useAuthTypeStore();

  const handleClickOpen = () => {
    setAuthType(type);
    setOpen(true);
  };

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
      <Button
        onClick={handleClickOpen}
        sx={{
          fontWeight: '400',
          borderRadius: '8px',
          color: '#333333',
          '&:hover': {
            backgroundColor: '#e9e9e9',
          },
        }}
      >
        {type === 'signin' && '登入'}
        {type === 'signup' && '註冊'}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {authType === 'signin' && <SignInModal setOpen={setOpen} />}
          {authType === 'signup' && <SignupModal setOpen={setOpen} />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthButton;
