import { create } from 'zustand';

import { deleteCookie, getCookie } from 'cookies-next';

export const useAuthTypeStore = create((set) => ({
  authType: '',
  modalOpen: false,
  hasToken: !!getCookie('jzj_token'),
  setAuthType: (type) => {
    set(() => ({ authType: type }));
  },
  setModalOpen: (isOpen) => set({ modalOpen: isOpen }),
  checkToken: () => set({ hasToken: !!getCookie('jzj_token') }),
  logout: () => {
    deleteCookie('jzj_token');
    set({ hasToken: false });
  },
}));

export const useRegisterStore = create((set) => ({
  identity: 'normal',
  email: '',
  verificationCode: '',
  verificationToken: '',
  password: '',
  name: '',
  accessToken: '',
  setIdentity: (identity) => set({ identity }),
  setEmail: (email) => set({ email }),
  setVerificationCode: (verificationCode) => set({ verificationCode }),
  setVerificationToken: (verificationToken) => set({ verificationToken }),
  setPassword: (password) => set({ password }),
  setName: (name) => set({ name }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export const useSigninStore = create((set) => ({
  email: '',
  password: '',
  accessToken: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));
