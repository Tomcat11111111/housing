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
  { value: 'residential-1', text: '住一' },
  { value: 'residential-2-1', text: '住二之一' },
  { value: 'residential-2-2', text: '住二之二' },
  { value: 'residential-3', text: '住三' },
  { value: 'residential-3-1', text: '住三之一' },
  { value: 'residential-3-2', text: '住三之二' },
  { value: 'residential-4', text: '住四' },
  { value: 'commercial-1', text: '商一' },
  { value: 'commercial-2', text: '商二' },
  { value: 'commercial-3', text: '商三' },
  { value: 'industrial-2', text: '工二' },
  { value: 'industrial-3', text: '工三' },
];

export const DecorLevelOptions = [
  { value: 'undecorated', text: '尚未裝潢' },
  { value: 'simple', text: '簡易裝潢' },
  { value: 'medium', text: '中等裝潢' },
  { value: 'high', text: '高等裝潢' },
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

export const FacilityOptions = [
  { value: 'air_conditioner', text: '冷氣' },
  { value: 'washing_machine', text: '洗衣機' },
  { value: 'natural_gas', text: '天然瓦斯' },
  { value: 'tv', text: '電視' },
  { value: 'gas_stove', text: '瓦斯爐' },
  { value: 'water_heater', text: '熱水器' },
  { value: 'refrigerator', text: '冰箱' },
  { value: 'wifi', text: '網路' },
  { value: 'microwave', text: '微波爐' },
  { value: 'dehydrator', text: '脫水機' },
];

export const FurnitureOptions = [
  { value: 'wardrobe', text: '衣櫃' },
  { value: 'single_bed', text: '單人床' },
  { value: 'double_bed', text: '雙人床' },
  { value: 'sofa', text: '沙發' },
  { value: 'desk', text: '書桌' },
  { value: 'cabinet', text: '置物櫃' },
];

export const WallMaterialOptions = [
  { value: 'plasterboard', text: '輕隔間' },
  { value: 'concrete', text: '混泥土隔間' },
  { value: 'brick', text: '磚牆隔間' },
];

export const ElevatorOptions = [
  { value: '無', text: '無' },
  { value: '有', text: '有' },
];

export const IdentityOptions = [
  { value: 'student', text: '學生' },
  { value: 'office_worker', text: '上班族' },
  { value: 'family', text: '家庭' },
];

export const GenderOptions = [
  { value: 'all', text: '性別不限' },
  { value: 'male', text: '生理男性' },
  { value: 'female', text: '生理女性' },
];

export const ParkingOptions = [
  { value: '無', text: '無' },
  { value: 'planar', text: '平面式' },
  { value: 'mechanical', text: '機械式' },
];

export const RentIncludeOptions = [
  { value: 'water', text: '水費' },
  { value: 'electricity', text: '電費' },
  { value: 'tv', text: '第四臺' },
  { value: 'internet', text: '網路費' },
  { value: 'gas', text: '瓦斯費' },
  { value: 'management', text: '管理費' },
  { value: 'parking', text: '車位費' },
];

export const DepositOptions = [
  { value: '0', text: '面議' },
  { value: '1', text: '一個月' },
  { value: '2', text: '二個月' },
  { value: '3', text: '三個月' },
  { value: '6', text: '六個月' },
];
