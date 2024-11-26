'use client';

import { useState } from 'react';

import ItemType from './ItemType';
import MemberFooter from './MemberFooter';
import MemberHeader from './MemberHeader';
import StepBar from './StepBar';

const Member = () => {
  const [step, setStep] = useState(0);

  return (
    <div style={{ height: '100%' }}>
      <MemberHeader />
      <div
        style={{
          height: '100vh-180px',
          overflow: 'auto',
          margin: '24px 80px 0',
        }}
      >
        <StepBar step={step} />
        {step === 0 && <ItemType />}
      </div>
      <MemberFooter />
    </div>
  );
};

export default Member;
