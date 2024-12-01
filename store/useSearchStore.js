import { create } from 'zustand';

const useSearchStore = create((set) => ({
  selectedTab: 'buy', //TODO: 先寫死為buy
  searchBarParams: {},
  setSelectedTab: (tab) => {
    set(() => ({ selectedTab: tab }));
  },
  setSearchBarParams: (changeParams) => {
    set((state) => ({
      ...state,
      ...changeParams,
    }));
  },
}));

export default useSearchStore;
