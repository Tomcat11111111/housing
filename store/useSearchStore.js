import { create } from 'zustand';

const useSearchStore = create((set) => ({
  selectedTab: 'buy', //TODO: 先寫死為buy
  searchCity: { id: 3, displayName: '新北市' },
  searchInput: '',
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
    set((state) => ({ ...state, searchCity: city }));
  },
  setSearchInput: (input) => {
    set((state) => ({ ...state, searchInput: input }));
  },
}));

export default useSearchStore;
