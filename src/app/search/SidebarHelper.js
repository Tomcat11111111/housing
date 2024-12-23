import axios from 'axios';

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
