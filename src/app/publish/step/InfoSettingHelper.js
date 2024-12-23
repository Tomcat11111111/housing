import { Building } from 'lucide-react';

export const HouseFormList = [
  { value: 'apartment', text: '公寓', icon: <Building /> },
  { value: 'CondoWithElevator', text: '電梯大樓', icon: <Building /> },
  { value: 'townhouse', text: '透天厝', icon: <Building /> },
  { value: 'villa', text: '別墅', icon: <Building /> },
];

export const ElevatorOptions = [
  { value: '無', text: '無' },
  { value: '有', text: '有' },
];

export const ParkingOptions = [
  { value: '無', text: '無' },
  { value: 'planar', text: '平面式' },
  { value: '機械', text: '機械式' },
];
