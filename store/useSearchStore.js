import { create } from 'zustand';

const useSearchStore = create((set) => ({
  selectedTab: 'buy', //TODO: 先寫死為buy
  searchCity: { id: 3, displayName: '新北市' },
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
  setSearchCity: (city) => {
    set(() => ({ city }));
  },
}));

export default useSearchStore;
