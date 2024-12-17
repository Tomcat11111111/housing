import { Building, House } from 'lucide-react';

export const PublishTypeList = [
  { value: 'buy', text: '出售', icon: <Building /> },
  { value: 'rent', text: '出租', icon: <Building /> },
  // { value: '1', text: '新建案', icon: <Building /> },
];

export const ItemTypeList = [
  { value: 'house', text: '住宅', icon: <Building /> },
  { value: 'store', text: '店面', icon: <Building /> },
  { value: 'office', text: '辦公', icon: <Building /> },
  { value: 'land', text: '土地', icon: <Building /> },
  { value: 'factory', text: '廠房', icon: <Building /> },
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
  { value: 'house', text: '公寓', icon: <Building /> },
  { value: 'store', text: '電梯大樓', icon: <Building /> },
  { value: 'office', text: '透天厝', icon: <Building /> },
  { value: 'land', text: '別墅', icon: <Building /> },
];
