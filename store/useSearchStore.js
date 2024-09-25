import { create } from 'zustand';

const useSearchStore = create((set) => ({
  selectedTab: 'rent',
  searchBarParams: {},
  setSelectedTab: (tab) => {
    set(() => ({ selectedTab: tab }));
  },
  setSearchBarParams: (changeParams) => {
    console.log('🚀 ~ useSearchStore ~ changeParams:', changeParams);
    set((state) => ({
      ...state,
      ...changeParams,
    }));
  },
}));

export default useSearchStore;
