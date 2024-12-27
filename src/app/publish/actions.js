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
    'https://jzj-api.zeabur.app/locations/cities',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzUwMDg1ODQsImV4cCI6MTczNTA5NDk4NH0.-sLhQKOG3MGLK7HXeyrpr9S7nInKrrsOth16F3CUsJo`,
      },
    }
  );

  return response.data;
};
