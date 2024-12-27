import { create } from 'zustand';

export const useToastStore = create((set) => ({
  success: false,
  error: false,
  successText: '',
  errorText: '',
  setSuccess: (status) => {
    set(() => ({ success: status }));
  },
  setError: (status) => {
    set(() => ({ error: status }));
  },
  setSuccessText: (text) => {
    set(() => ({ successText: text }));
  },
  setErrorText: (text) => {
    set(() => ({ errorText: text }));
  },
}));
