'use client';

import React, { createContext, useContext, useState } from 'react';

import { Snackbar, SnackbarContent } from '@mui/material';
import { CheckCircleIcon, ShieldAlert } from 'lucide-react';

import useToastStore from '@/store/useToastStore';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const {
    setToastOpen,
    setSuccessText,
    setErrorText,
    setStatus,
    toastOpen,
    status,
    successText,
    errorText,
  } = useToastStore();

  const showToast = (type, message) => {
    setStatus(type);
    if (type === 'success') {
      setSuccessText(message);
    } else if (type === 'error') {
      setErrorText(message);
    }
    setToastOpen(true);
  };

  const hideToast = () => {
    setToastOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={hideToast}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: status === 'success' ? '#0ABD13' : '#F44336',
            color: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <SnackbarContent
          message={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {status === 'success' && (
                <CheckCircleIcon style={{ color: '#FFFFFF' }} />
              )}
              {status === 'error' && (
                <ShieldAlert style={{ color: '#FFFFFF' }} />
              )}
              <span>{status === 'success' && successText}</span>
              <span>{status === 'error' && errorText}</span>
            </div>
          }
        />
      </Snackbar>
    </ToastContext.Provider>
  );
};
