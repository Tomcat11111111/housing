import { House } from 'lucide-react';

export const PublishTypeList = [
  { value: 'buy', text: '出售', icon: <House /> },
  { value: 'rent', text: '出租', icon: <House /> },
  // { value: '1', text: '新建案', icon: <House /> },
];

export const ItemTypeList = [
  { value: 'house', text: '住宅', icon: <House /> },
  { value: 'store', text: '店面', icon: <House /> },
  { value: 'office', text: '辦公', icon: <House /> },
  { value: 'land', text: '土地', icon: <House /> },
  { value: 'factory', text: '廠房', icon: <House /> },
];

export const RentHouseTypeList = [
  { value: 'house', text: '整層住家', icon: <House /> },
  { value: 'store', text: '分租套房', icon: <House /> },
  { value: 'office', text: '獨立套房', icon: <House /> },
  { value: 'land', text: '雅房', icon: <House /> },
];

export const BuyHouseTypeList = [
  { value: 'house', text: '住家', icon: <House /> },
  { value: 'store', text: '套房', icon: <House /> },
  { value: 'office', text: '法拍屋', icon: <House /> },
];
