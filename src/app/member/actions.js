import axios from 'axios';

export const getBookmarksApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/bookmarks', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jzj_token')}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0ODEwMzUsImV4cCI6MTczNTU2NzQzNX0.cVGsBoSbNTnW2AWCw9kcwO0K5IQiiX6I01E0WvjtY-Q`,
    },
  });
  return response.data;
};

export const deleteBookmarkApi = async (propertyId) => {
  const response = await axios.delete(
    `https://jzj-api.zeabur.app/bookmarks/${propertyId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jzj_token')}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0ODEwMzUsImV4cCI6MTczNTU2NzQzNX0.cVGsBoSbNTnW2AWCw9kcwO0K5IQiiX6I01E0WvjtY-Q`,
      },
    }
  );
  return response.data;
};

export const getPropertiesApi = async () => {
  const response = await axios.get(
    'https://jzj-api.zeabur.app/cms/properties?limit=10&offset=0&type=sales',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jzj_token')}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0ODEwMzUsImV4cCI6MTczNTU2NzQzNX0.cVGsBoSbNTnW2AWCw9kcwO0K5IQiiX6I01E0WvjtY-Q`,
      },
    }
  );
  return response.data;
};

export const disableApi = async ({ propertyId }) => {
  try {
    const response = await axios.post(
      `https://jzj-api.zeabur.app/cms/properties/${propertyId}/disable`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jzj_token')}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0ODEwMzUsImV4cCI6MTczNTU2NzQzNX0.cVGsBoSbNTnW2AWCw9kcwO0K5IQiiX6I01E0WvjtY-Q`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const enableApi = async ({ propertyId }) => {
  try {
    const response = await axios.post(
      `https://jzj-api.zeabur.app/cms/properties/${propertyId}/enable`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jzj_token')}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0ODEwMzUsImV4cCI6MTczNTU2NzQzNX0.cVGsBoSbNTnW2AWCw9kcwO0K5IQiiX6I01E0WvjtY-Q`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
