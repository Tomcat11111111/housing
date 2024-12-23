import axios from 'axios';

export const createSalePropertyApi = async (data) => {
  const response = await axios.post(
    'https://jzj-api.zeabur.app/cms/properties/for-sale',
    data,
    {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ3NjkzMzAsImV4cCI6MTczNDg1NTczMH0.z6KkJaxpKAjazjsHanMutL_jnl65y1p2x8OfneQKQXg`,
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
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ3NjkzMzAsImV4cCI6MTczNDg1NTczMH0.z6KkJaxpKAjazjsHanMutL_jnl65y1p2x8OfneQKQXg`,
      },
    }
  );
  return response.data;
};
