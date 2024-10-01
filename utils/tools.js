import Image from 'next/image';

import House from '@/icon/House/House';

export const ORIGIN_OPTION_LIST = [
  { displayName: '租房子', id: 'rent', icon: House },
  { displayName: '買房子', id: 'buy', icon: House },
  { displayName: '新建案', id: 'new', icon: House },
];

const PRICE_STATUS_MAP = new Map([
  [
    'above',
    {
      text: '略高於平均',
      color: '#E85454',
      icon: (
        <Image
          src="/housing/icon/trending_up.svg"
          alt="trending_up"
          width={20}
          height={20}
        />
      ),
    },
  ],
  [
    'below',
    {
      text: '略低於平均',
      color: '#52C32A',
      icon: (
        <Image
          src="/housing/icon/trending_down.svg"
          alt="trending_down"
          width={20}
          height={20}
        />
      ),
    },
  ],
  [
    'equal',
    {
      text: '等於平均',
      color: '#FAAF1D',
      icon: (
        <Image
          src="/housing/icon/trending_flat.svg"
          alt="trending_flat"
          width={20}
          height={20}
        />
      ),
    },
  ],
]);

export const getPriceStatusInfo = (price, average = 0) => {
  if (price > average) return PRICE_STATUS_MAP.get('above');
  if (price < average) return PRICE_STATUS_MAP.get('below');
  if (price === average) return PRICE_STATUS_MAP.get('equal');
};

// 租房 物件類型
export const RENTAL_CATEGORIES = [
  // {id: 'shared_suite', value: 'new', displayName: '分租套房'}
  { id: 'shared_suite', displayName: '分租套房' },
  { id: 'entire_home', displayName: '整層住家' },
  { id: 'private_study', displayName: '獨立書房' },
  { id: 'private_room', displayName: '雅房' },
  { id: 'storefront', displayName: '店面' },
  { id: 'live_work_space', displayName: '住辦' },
  { id: 'factory_space', displayName: '廠房' },
  { id: 'commercial_space', displayName: '商用' },
  { id: 'parking_spot', displayName: '車位' },
  { id: 'other', displayName: '其他' },
];

// 買房 物件類型
export const SALES_CATEGORIES = [
  { id: 'residential', displayName: '住宅' },
  { id: 'suite', displayName: '套房' },
  { id: 'parking_spot', displayName: '車位' },
  { id: 'foreclosed_home', displayName: '法拍屋' },
  { id: 'other', displayName: '其他' },
];

// 物件朝向
export const DIRECTION_OPTIONS = [
  {
    id: 'east_to_west',
    value: 'east_to_west',
    displayName: '坐東朝西',
  },
  {
    id: 'west_to_east',
    value: 'west_to_east',
    displayName: '坐西朝東',
  },
  {
    id: 'north_to_south',
    value: 'north_to_south',
    displayName: '坐北朝南',
  },
  {
    id: 'south_to_north',
    value: 'south_to_north',
    displayName: '坐南朝北',
  },
  {
    id: 'northeast_to_southwest',
    value: 'northeast_to_southwest',
    displayName: '坐東北朝西南',
  },
  {
    id: 'northwest_to_southeast',
    value: 'northwest_to_southeast',
    displayName: '坐西北朝東南',
  },
  {
    id: 'southeast_to_northwest',
    value: 'southeast_to_northwest',
    displayName: '坐東南朝西北',
  },
  {
    id: 'southwest_to_northeast',
    value: 'southwest_to_northeast',
    displayName: '坐西南朝東北',
  },
];

// 車位形式
export const PARKING_SPACE_OPTIONS = [
  {
    id: 'mechanical',
    value: 'mechanical',
    displayName: '機械式',
  },
  {
    id: 'planar',
    value: 'planar',
    displayName: '平面式',
  },
];

// 物件來源
export const SOURCE_OPTIONS = [
  {
    id: 'owner',
    value: 'owner',
    displayName: '屋主刊登',
  },
  {
    id: 'broker',
    value: 'broker',
    displayName: '仲介刊登',
  },
  {
    id: 'agency',
    value: 'agency',
    displayName: '代理人刊登',
  },
  {
    id: 'platform',
    value: 'platform',
    displayName: '平台物件',
  },
];

// 看後續有沒有這種需求
// export function throttle(callback, delay) {
//   let timerID = null;
//   const throttledFunction = function (...args) {
//     if (timerID) return;

//     timerID = setTimeout(() => {
//       callback.apply(this, args);
//       timerID = null;
//     }, delay);
//   };

//   return throttledFunction;
// }
