import { create } from 'zustand';

export const useMemberTabs = create((set) => ({
  currentTab: 0,
  setCurrentTab: (status) => {
    set(() => ({ currentTab: status }));
  },
}));
