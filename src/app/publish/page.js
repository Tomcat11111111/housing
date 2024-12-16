'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';

import ItemAdvancedInformation from './ItemAdvancedInformation';
import ItemInfoSetting from './ItemInfoSetting';
import ItemTypeSetting from './ItemTypeSetting';
import PublishHeader from './PublishHeader';
import StepBar from './StepBar';

const Publish = () => {
  const [step, setStep] = useState(2);

  return (
    <div className="h-screen">
      <PublishHeader />
      <div
        style={{
          height: '100vh-180px',
          overflow: 'auto',
          margin: '24px 80px 0',
          paddingBottom: '100px',
        }}
      >
        <StepBar step={step} />
        {step === 0 && <ItemTypeSetting setStep={setStep} />}
        {step === 1 && <ItemInfoSetting />}
        {/* {step === 2 && <ItemTypeSetting />}
         {step === 3 && <ItemTypeSetting />} */}
        {step === 2 && <ItemAdvancedInformation />}
      </div>
      <div className="fixed bottom-0 left-0 h-[100px] w-full px-[80px] py-[24px] bg-white/90 flex justify-between">
        <Button variant="contained">上一步</Button>
        <Button variant="contained">下一步</Button>
      </div>
    </div>
  );
};

export default Publish;
