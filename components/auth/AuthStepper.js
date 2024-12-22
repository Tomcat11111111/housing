import React from 'react';

import { useAuthTypeStore } from '@/store/useAuthStore';

const AuthStepper = () => {
  const { authType, setAuthType } = useAuthTypeStore();
  const steps = ['signup', 'enterEmail', 'verifyEmail', 'enterPassword'];

  return (
    <div
      style={{
        width: '56px',
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      {steps.map((step, index) => (
        <div
          key={step}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            // cursor: 'pointer',
            backgroundColor:
              steps.indexOf(authType) >= index ? '#0936D8' : '#CCCCFF',
          }}
          // onClick={() => setAuthType(step)}
        ></div>
      ))}
    </div>
  );
};

export default AuthStepper;
