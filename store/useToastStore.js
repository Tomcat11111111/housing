import { create } from 'zustand';

export const useToastStore = create((set) => ({
  toastOpen: false,
  status: '',
  successText: '',
  errorText: '',
  setToastOpen: (status) => {
    set(() => ({ toastOpen: status }));
  },
  setStatus: (status) => {
    set(() => ({ status }));
  },
  setSuccessText: (text) => {
    set(() => ({ successText: text }));
  },
  setErrorText: (text) => {
    set(() => ({ errorText: text }));
  },
}));
