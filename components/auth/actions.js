import axios from 'axios';

export const signinApi = async ({ email, password }) => {
  try {
    const response = await axios.post('https://jzj-api.zeabur.app/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationCodeApi = async ({ email }) => {
  try {
    const response = await axios.post(
      'https://jzj-api.zeabur.app/auth/register/send-code',
      {
        email,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmailApi = async ({ email, verificationCode }) => {
  try {
    const response = await axios.post(
      'https://jzj-api.zeabur.app/auth/register/verify-email',
      {
        email,
        code: verificationCode,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const completeRegistrationApi = async ({
  email,
  password,
  verificationToken,
}) => {
  try {
    const response = await axios.post(
      'https://jzj-api.zeabur.app/auth/register/complete',
      {
        email,
        password,
        verificationToken,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
