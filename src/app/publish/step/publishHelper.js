import axios from 'axios';
import { Building } from 'lucide-react';

export const PublishTypeList = [
  { value: 'buy', text: '出售', icon: <Building /> },
  { value: 'rent', text: '出租', icon: <Building /> },
  { value: '', text: '新建案', icon: <Building /> },
];

export const ItemTypeList = [
  { value: 'house', text: '住宅', icon: <Building /> },
  { value: '', text: '店面', icon: <Building /> },
  { value: '', text: '辦公', icon: <Building /> },
  { value: '', text: '土地', icon: <Building /> },
  { value: '', text: '廠房', icon: <Building /> },
];

export const RentHouseTypeList = [
  { value: 'house', text: '整層住家', icon: <Building /> },
  { value: 'store', text: '分租套房', icon: <Building /> },
  { value: 'office', text: '獨立套房', icon: <Building /> },
  { value: 'land', text: '雅房', icon: <Building /> },
];

export const BuyHouseTypeList = [
  { value: 'house', text: '住家', icon: <Building /> },
  { value: 'store', text: '套房', icon: <Building /> },
  { value: 'office', text: '法拍屋', icon: <Building /> },
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
  { value: 'self_living', text: '自住中' },
  { value: 'rented', text: '出租中' },
  { value: 'vacant', text: '空屋' },
  { value: 'under_construction', text: '尚未完工' },
  { value: 'needs_repair', text: '需修繕' },
  { value: 'new', text: '新成屋' },
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

export const getFeaturesApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/features');
  return response.data;
};

export const getShapesApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/shapes');
  return response.data;
};

export const getIncludedInRentApi = async () => {
  const response = await axios.get(
    'https://jzj-api.zeabur.app/included-in-rent'
  );
  return response.data;
};

export const getDecorLevelsApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/decor-levels');
  return response.data;
};

export const getEquipmentApi = async () => {
  const response = await axios.get(
    'https://jzj-api.zeabur.app/offers?type=equipment'
  );
  return response.data;
};

export const getFurnitureApi = async () => {
  const response = await axios.get(
    'https://jzj-api.zeabur.app/offers?type=furniture'
  );
  return response.data;
};

export const getMaterialsApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/materials');
  return response.data;
};

export const getRulesApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/rules');
  return response.data;
};

export const getCityDistrictApi = async (data) => {
  const { city } = data.meta;
  const response = await axios.get(
    `https://jzj-api.zeabur.app/locations/city/${city}`
  );

  return response.data.districts;
};

export const getSurroundingsApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/surroundings');
  return response.data;
};
