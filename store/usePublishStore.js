import { create } from 'zustand';

const usePublishStore = create((set) => ({
  itemTypeSettings: {
    publishType: null,
    itemType: null,
    category: null,
  },
  property: {
    title: '',
    age: 0,
    squareMeters: 1,
    floor: 0,
    totalFloors: 1,
    room: 0,
    livingRoom: 0,
    bathroom: 0,
    balcony: 0,
    type: null,
    shapeId: null,
    decorLevelId: null,
    contactName: null,
    contactNumber: null,
    contactEmail: null,
    landline: null,
    hasElevator: false,
    hasParking: false,
    images: [],
    status: 'available',
  },
  rentalInfo: {
    price: null,
    depositMonths: 0,
    includedInRentIds: [],
    electricityFee: null,
    managementFee: null,
    minRentPeriod: null,
    offerIds: [],
    materialId: 1,
    ruleIds: [],
    moveInDate: null,
    parkingSpace: null, // mechanical, planar
    introduction: '',
  },
  salesInfo: {
    totalPrice: 0,
    parkingSpace: null,
    direction: null,
    source: null,
    surroundingIds: [],
    status: null,
    legalUsage: null,
    hiddenLegalUsage: false,
    managementFee: 0,
    mainBuildingArea: 0,
    accessoryBuildingArea: 0,
    publicFacilityArea: 0,
    leaseStatus: '',
    introduction: '',
  },
  location: {
    cityId: null,
    districtId: null,
    address: '',
    street: '',
    alley: '',
    lane: '',
    number: '',
    floor: '',
    houseRoom: '',
  },
  setItemTypeSettings: (settings) =>
    set((state) => ({
      itemTypeSettings: { ...state.itemTypeSettings, ...settings },
    })),
  setProperty: (updates) =>
    set((state) => ({
      property: { ...state.property, ...updates },
    })),
  setSalesInfo: (updates) =>
    set((state) => ({
      salesInfo: { ...state.salesInfo, ...updates },
    })),
  setRentalInfo: (updates) =>
    set((state) => ({
      rentalInfo: { ...state.rentalInfo, ...updates },
    })),
  setLocation: (updates) =>
    set((state) => ({
      location: { ...state.location, ...updates },
    })),
}));

export default usePublishStore;
