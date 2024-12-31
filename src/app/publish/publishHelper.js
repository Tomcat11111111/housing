import { Building } from 'lucide-react';

export const PublishTypeList = [
  { value: 'sales', text: '出售', icon: <Building /> },
  { value: 'rental', text: '出租', icon: <Building /> },
  { value: 'disabled_1', text: '新建案', icon: <Building /> },
];

export const ItemTypeList = [
  { value: 'house', text: '住宅', icon: <Building /> },
  { value: 'disabled_2', text: '店面', icon: <Building /> },
  { value: 'disabled_3', text: '辦公', icon: <Building /> },
  { value: 'disabled_4', text: '土地', icon: <Building /> },
  { value: 'disabled_5', text: '廠房', icon: <Building /> },
];

export const RentHouseTypeList = [
  { value: 'whole_house', text: '整層住家', icon: <Building /> },
  { value: 'studio_apartment', text: '分租套房', icon: <Building /> },
  { value: 'shared_apartment', text: '獨立套房', icon: <Building /> },
  { value: 'room_to_share', text: '雅房', icon: <Building /> },
];

export const BuyHouseTypeList = [
  { value: 'house', text: '住家', icon: <Building /> },
  { value: 'studio', text: '套房', icon: <Building /> },
  { value: 'foreclosed_home', text: '法拍屋', icon: <Building /> },
];

export const HouseFormList = [
  { value: 'apartment', text: '公寓', icon: <Building /> },
  { value: 'CondoWithElevator', text: '電梯大樓', icon: <Building /> },
  { value: 'townhouse', text: '透天厝', icon: <Building /> },
  { value: 'villa', text: '別墅', icon: <Building /> },
];

export const LegalUsageOptions = [
  { value: '住一', text: '住一' },
  { value: '住二之一', text: '住二之一' },
  { value: '住二之二', text: '住二之二' },
  { value: '住三', text: '住三' },
  { value: '住三之一', text: '住三之一' },
  { value: '住三之二', text: '住三之二' },
  { value: '住四', text: '住四' },
  { value: '商一', text: '商一' },
  { value: '商二', text: '商二' },
  { value: '商三', text: '商三' },
  { value: '工二', text: '工二' },
  { value: '工三', text: '工三' },
];

export const CurrentStatusOptions = [
  { value: 'self_live', text: '自住中' },
  { value: 'renting', text: '出租中' },
  { value: 'empty', text: '空屋' },
  { value: 'not_completed', text: '尚未完工' },
  { value: 'needs_repair', text: '需修繕' },
  { value: 'newly_built', text: '新成屋' },
];

export const LeaseStatusOptions = [
  { value: 'no', text: '無' },
  { value: 'yes', text: '有' },
];

export const ElevatorOptions = [
  { value: false, text: '無' },
  { value: true, text: '有' },
];

export const IdentityOptions = [
  { value: 'student', text: '學生' },
  { value: 'office_worker', text: '上班族' },
  { value: 'family', text: '家庭' },
];

export const GenderOptions = [
  { id: 1, value: 'no_gender_restriction', text: '性別不限' },
  { id: 2, value: 'female_only', text: '生理女性' },
  { id: 3, value: 'male_only', text: '生理男性' },
];

export const ParkingOptions = [
  { value: '無', text: '無' },
  { value: 'planar', text: '平面式' },
  { value: 'mechanical', text: '機械式' },
];

export const DepositOptions = [
  { value: 0, text: '面議' },
  { value: 1, text: '一個月' },
  { value: 2, text: '二個月' },
  { value: 3, text: '三個月' },
  { value: 6, text: '六個月' },
];

export const getTextFromList = (value, list = []) => {
  const item = list.find((i) => i.id === value || i.value === value);
  return item ? item.displayName || item.text : value; // 若沒有找到對應的項目，則回傳原始值
};

export const handleNumberInput = (value) => {
  const number = value.replace(/[^\d]/g, '');

  return number ? parseInt(number) : 0;
};

export const transformRentalInfoData = (rentalInfoData) => {
  return {
    // 租金相關
    price: rentalInfoData.price || 0,
    depositMonths: rentalInfoData.depositMonths || 0,
    deposit: rentalInfoData.deposit || 0,
    electricityFee: rentalInfoData.electricityFee || '',
    maintenance: rentalInfoData.maintenance || '',

    // 租期相關
    term: rentalInfoData.term || '',
    availableDate: rentalInfoData.availableDate || null,

    // 物件特性
    category: rentalInfoData.category || '',
    materialId: rentalInfoData.materialId || '',
    parkingSpace: rentalInfoData.parkingSpace || '',

    // 其他資訊
    introduction: rentalInfoData.introduction || '',
  };
};

export const transformSalesInfoData = (salesInfoData) => {
  return {
    // 建物面積相關
    mainBuildingArea: salesInfoData.mainBuildingArea || 0,
    accessoryBuildingArea: salesInfoData.accessoryBuildingArea || 0,
    publicFacilityArea: salesInfoData.publicFacilityArea || 0,
    buildingRegistrationArea: salesInfoData.buildingRegistrationArea || 0,
    publicFacilityRatio: salesInfoData.publicFacilityRatio || null,

    // 價格相關
    totalPrice: salesInfoData.totalPrice || 0,
    unitPrice: salesInfoData.unitPrice || 0,
    managementFee: salesInfoData.managementFee || '',

    // 物件狀態
    status: salesInfoData.status || '',
    leaseStatus: salesInfoData.leaseStatus || '',
    legalUsage: salesInfoData.legalUsage || '',
    hiddenLegalUsage: salesInfoData.hiddenLegalUsage || false,

    // 物件特性
    parkingSpace: salesInfoData.parkingSpace || '',
    direction: salesInfoData.direction || '',
    source: salesInfoData.source || '',
    category: salesInfoData.category || '',

    // 其他資訊
    introduction: salesInfoData.introduction || '',
  };
};

export const transformPropertyData = (propertyData) => {
  return {
    // 基本資訊
    title: propertyData.title || '',
    shapeId: propertyData.shapeId,
    age: propertyData.age || 0,
    squareMeters: propertyData.squareMeters || 0,
    floor: propertyData.floor || '',
    totalFloors: propertyData.totalFloors || '',
    room: propertyData.room || 0,
    livingRoom: propertyData.livingRoom || 0,
    bathroom: propertyData.bathroom || 0,
    balcony: propertyData.balcony || 0,

    // 設備與狀態
    hasElevator: propertyData.hasElevator || false,
    hasParking: propertyData.hasParking || false,
    decorLevelId: propertyData.decorLevelId,
    status: propertyData.status || 'available',

    // 聯絡資訊
    contactName: propertyData.contactName || '',
    contactNumber: propertyData.contactNumber || '',
    contactEmail: propertyData.contactEmail || '',
    landline: propertyData.landline || '',
    // 圖片
    images: propertyData.images?.map((image) => image.url) || [],

    // 其他資訊
    isDisabled: propertyData.isDisabled || false,
    views: propertyData.views || 0,
  };
};

export const transformLocationData = (locationData) => {
  return {
    cityId: locationData.cityId,
    districtId: locationData.districtId,
    address: locationData.address,
    street: locationData.street || '',
    alley: locationData.alley || '',
    lane: locationData.lane || '',
    number: locationData.number || '',
    floor: locationData.floor || '',
    room: locationData.room || '',
    coordinates: locationData.geolocation?.coordinates || [],
  };
};
