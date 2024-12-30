import axios from 'axios';

export const getBookmarksApi = async () => {
  const response = await axios.get('https://jzj-api.zeabur.app/bookmarks', {
    headers: {
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0ODEwMzUsImV4cCI6MTczNTU2NzQzNX0.cVGsBoSbNTnW2AWCw9kcwO0K5IQiiX6I01E0WvjtY-Q`,
    },
  });
  return response.data;
};

export const deleteBookmarkApi = async (propertyId) => {
  const response = await axios.delete(
    `https://jzj-api.zeabur.app/bookmarks/${propertyId}`,
    {
      headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzU0ODEwMzUsImV4cCI6MTczNTU2NzQzNX0.cVGsBoSbNTnW2AWCw9kcwO0K5IQiiX6I01E0WvjtY-Q`,
      },
    }
  );
  return response.data;
};
