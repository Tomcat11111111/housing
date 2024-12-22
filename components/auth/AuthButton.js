import React, { useState } from 'react';

import { Button } from '@mui/material';

import { useAuthTypeStore } from '@/store/useAuthStore';

import AuthModalContainer from './AuthModalContainer';

const AuthButton = ({ type }) => {
  const [open, setOpen] = useState(false);
  const { setAuthType } = useAuthTypeStore();

  const handleOpen = () => {
    setAuthType(type);
    setOpen(true);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
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
      <AuthModalContainer open={open} setOpen={setOpen} />
    </div>
  );
};

export default AuthButton;
