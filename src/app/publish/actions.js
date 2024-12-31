import axios from 'axios';

export const createSalePropertyApi = async (data) => {
  const response = await axios.post(
    'https://jzj-api.zeabur.app/cms/properties/for-sale',
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ3NjkzMzAsImV4cCI6MTczNDg1NTczMH0.z6KkJaxpKAjazjsHanMutL_jnl65y1p2x8OfneQKQXg`,
      },
    }
  );
  return response.data;
};

export const createRentPropertyApi = async (data) => {
  const response = await axios.post(
    'https://jzj-api.zeabur.app/cms/properties/for-rent',
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ3NjkzMzAsImV4cCI6MTczNDg1NTczMH0.z6KkJaxpKAjazjsHanMutL_jnl65y1p2x8OfneQKQXg`,
      },
    }
  );
  return response.data;
};

export const uploadImageApi = async (images) => {
  try {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    const response = await axios.post(
      'https://jzj-api.zeabur.app/images/upload/multiple',
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ5MzUzMzMsImV4cCI6MTczNTAyMTczM30.txF-ncNch68PP7nKx-KxbAWulS8T-T735OdULxlIRNA`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

export const getCitiesApi = async () => {
  const response = await axios.get(
    'https://jzj-api.zeabur.app/locations/cities'
  );

  return response.data;
};

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
