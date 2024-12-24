import { create } from 'zustand';

const usePublishStore = create((set) => ({
  itemTypeSettings: {
    publishType: 'rent',
    itemType: null,
    category: null,
  },
  infoSettings: {
    shapeId: null,
    title: '',
    cityId: null,
    districtId: null,
    address: '',
    age: null,
    squareMeters: null,
    floor: null,
    totalFloors: null,
    room: null,
    livingRoom: null,
    bathroom: null,
    balcony: null,
    decorLevelId: null,
    parkingSpace: '無',
    elevator: '無',
    totalPrice: null,
  },
  advancedInfoSettings: {
    images: [],
    introduction: '',
    contact: '',
    mobilePhone: null,
    phone: null,
    email: '',
  },
  setItemTypeSettings: (settings) =>
    set((state) => ({
      itemTypeSettings: { ...state.itemTypeSettings, ...settings },
    })),
  setInfoSettings: (settings) =>
    set((state) => ({ infoSettings: { ...state.infoSettings, ...settings } })),
  setAdvancedInfoSettings: (settings) =>
    set((state) => ({
      advancedInfoSettings: { ...state.advancedInfoSettings, ...settings },
    })),
}));

export default usePublishStore;
