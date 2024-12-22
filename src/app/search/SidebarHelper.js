import axios from 'axios';

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
