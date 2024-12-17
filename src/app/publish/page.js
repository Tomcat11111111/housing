'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

import ItemAdvancedInfoSetting from './ItemAdvancedInfoSetting';
import ItemInfoSetting from './ItemInfoSetting';
import ItemPreview from './ItemPreview';
import ItemTypeSetting from './ItemTypeSetting';
import PublishHeader from './PublishHeader';
import StepBar from './StepBar';

const Publish = () => {
  const [step, setStep] = useState(1);

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
        {step === 0 && <ItemTypeSetting />}
        {step === 1 && <ItemInfoSetting />}
        {step === 2 && <ItemAdvancedInfoSetting />}
        {step === 3 && <ItemPreview />}
      </div>
      <div className="fixed bottom-0 left-0 h-[100px] w-full px-[80px] py-[24px] bg-white/90 flex justify-between">
        <div>
          {step > 0 && (
            <Button
              className="bg-[#0936D8]"
              variant="contained"
              startIcon={<ChevronLeft />}
              onClick={() => setStep(step - 1)}
            >
              上一步
            </Button>
          )}
        </div>
        <div>
          {step < 3 && (
            <Button
              className="bg-[#0936D8]"
              variant="contained"
              endIcon={<ChevronRight />}
              onClick={() => setStep(step + 1)}
            >
              下一步
            </Button>
          )}
          {step === 3 && (
            <div className="flex gap-2">
              <Button
                className="border-[#0936D8] text-[#0936D8]"
                variant="outlined"
                startIcon={<Save />}
              >
                保存不刊登
              </Button>
              <Button
                className="bg-[#0936D8]"
                variant="contained"
                endIcon={<ChevronRight />}
                onClick={() => {
                  alert('刊登成功');
                  return;
                }}
              >
                完成並刊登
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publish;
