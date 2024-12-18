import { create } from 'zustand';

const useAuthTypeStore = create((set) => ({
  authType: '',

  setAuthType: (type) => {
    set(() => ({ authType: type }));
  },
}));

export default useAuthTypeStore;
