import { create } from 'zustand';

const usePublishStore = create((set) => ({
  itemTypeSettings: {
    publishType: 'buy',
    itemType: null,
  },
  property: {
    title: '新莊副都心',
    age: 10,
    squareMeters: 20,
    floor: 7,
    totalFloors: 13,
    room: 3,
    livingRoom: 2,
    bathroom: 2,
    balcony: 0,
    type: 'buy',
    views: 0,
    shapeId: 1,
    decorLevelId: 1,
    contactName: '勝藥',
    contactNumber: '0912345678',
    contactEmail: 'test@gmail.com',
    landline: '0226666666',
    hasElevator: false,
    hasParking: false,
    images: [],
    status: 'available',
  },
  rentalInfo: {
    price: 87000,
    depositMonths: 1,
    includedInRentIds: [3],
    electricityFee: 0,
    managementFee: 0,
    minRentPeriod: 0,
    offerIds: [4],
    materialId: 1,
    ruleIds: [3, 4],
    moveInDate: '2024-12-12',
    category: 'whole_house', // 類型細項 whole_house, studio_apartment, shared_apartment, room_to_share
    introduction: '<p>測試介紹</p>',
    parkingSpace: 'mechanical', // mechanical, planar
  },
  saleInfo: {
    totalPrice: 88888888,
    // unitPrice: 1720100,
    parkingSpace: 'planar',
    direction: 'east_to_west',
    source: 'platform',
    surroundingIds: [],
    category: 'house',
    status: null, // 從原始的 status 欄位
    // publicFacilityRatio: 0,
    legalUsage: null,
    hiddenLegalUsage: false,
    managementFee: null,
    leaseStatus: '',
    mainBuildingArea: null,
    accessoryBuildingArea: null,
    publicFacilityArea: null,
    introduction: '',
  },
  location: {
    cityId: 3,
    districtId: 40,
    address: '',
    street: '',
    alley: null,
    lane: null,
    number: null,
    floor: '7',
    houseRoom: null,
  },
  setItemTypeSettings: (settings) =>
    set((state) => ({
      itemTypeSettings: { ...state.itemTypeSettings, ...settings },
    })),
  setProperty: (updates) =>
    set((state) => ({
      property: { ...state.property, ...updates },
    })),
  setSaleInfo: (updates) =>
    set((state) => ({
      saleInfo: { ...state.saleInfo, ...updates },
    })),
  setLocation: (updates) =>
    set((state) => ({
      location: { ...state.location, ...updates },
    })),
}));

export default usePublishStore;
