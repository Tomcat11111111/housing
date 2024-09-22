import axios from 'axios';

export const SALES_CATEGORIES = [
  { id: 'residential', displayName: '住宅' },
  { id: 'suite', displayName: '套房' },
  { id: 'parking_spot', displayName: '車位' },
  { id: 'foreclosed_home', displayName: '法拍屋' },
  { id: 'other', displayName: '其他' },
];

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

export const getFeaturesApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/features');
  return response.data;
};

export const getShapesApi = async () => {
  const reponse = await axios.get('https://jzj-api.zeabur.app/shapes');
  return reponse.data;
};

export const getIncludedInRentApi = async () => {
  const reponse = await axios.get(
    'https://jzj-api.zeabur.app/included-in-rent'
  );
  return reponse.data;
};

export const getDecorLevelsApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/decor-levels');
  return response.data;
};

export const getEquipmentApi = async () => {
  const reponse = await axios.get(
    'https://jzj-api.zeabur.app/offers?type=equipment'
  );
  return reponse.data;
};

export const getFurnitureApi = async () => {
  const reponse = await axios.get(
    'https://jzj-api.zeabur.app/offers?type=furniture'
  );
  return reponse.data;
};

export const getMaterialsApi = async () => {
  const reponse = await axios.get('https://jzj-api.zeabur.app/materials');
  return reponse.data;
};

export const getRulesApi = async () => {
  const reponse = await axios.get('https://jzj-api.zeabur.app/rules');
  return reponse.data;
};

export const getCityDistrictApi = async (data) => {
  const { city } = data.meta;
  const response = await axios.get(
    `https://jzj-api.zeabur.app/locations/city/${city}`
  );

  return response.data.districts;
};

export const getSurroundingsApi = async () => {
  const reponse = await axios.get('https://jzj-api.zeabur.app/surroundings');
  return reponse.data;
};

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
