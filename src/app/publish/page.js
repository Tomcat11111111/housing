'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

import usePublishStore from '@/store/usePublishStore';

import PublishHeader from './PublishHeader';
import StepBar from './StepBar';
import { createRentPropertyApi, createSalePropertyApi } from './actions';
import ItemAdvancedInfoSetting from './step/AdvancedInfoSetting';
import ItemInfoSetting from './step/InfoSetting';
import ItemPreview from './step/ItemPreview';
import ItemTypeSetting from './step/TypeSetting';

const Publish = () => {
  const [step, setStep] = useState(3);
  const {
    itemTypeSettings,
    property,
    salesInfo,
    rentalInfo,
    location,
    setPorperty,
  } = usePublishStore();

  const itemStatusRef = useRef('');

  const {
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      ...itemTypeSettings,
      ...property,
      ...salesInfo,
    },
  });

  const handleNextStep = async () => {
    const isStepValid = await trigger();

    if (!isStepValid) {
      const firstError = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstError}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setStep(step + 1);
  };

  const { mutate: publishProperty } = useMutation({
    mutationFn:
      itemTypeSettings.publishType === 'buy'
        ? createSalePropertyApi
        : createRentPropertyApi,
    onSuccess: () => {
      alert('刊登成功'); // 刊登成功後續行為，提示、導頁
    },
  });

  const onPublishProperty = () => {
    const publishType =
      itemTypeSettings.publishType === 'buy' ? 'salesInfo' : 'rentalInfo';

    publishProperty({
      property,
      location,
      [publishType]:
        itemTypeSettings.publishType === 'buy' ? salesInfo : rentalInfo,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const onPageBeforeunload = (e) => {
    e.returnValue = 'onbeforeunload';
    return 'onbeforeunload';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onPageBeforeunload);
    return () => {
      window.removeEventListener('beforeunload', onPageBeforeunload);
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        <div className="z-10 fixed bottom-0 left-0 h-[100px] w-full px-[80px] py-[24px] bg-white flex justify-between">
          <div>
            {step > 0 && (
              <Button
                variant="contained"
                startIcon={<ChevronLeft />}
                sx={{ bgcolor: '#0936D8' }}
                onClick={() => setStep(step - 1)}
              >
                上一步
              </Button>
            )}
          </div>
          <div>
            {step < 3 && (
              <Button
                sx={{ bgcolor: '#0936D8' }}
                variant="contained"
                endIcon={<ChevronRight />}
                onClick={handleNextStep}
              >
                下一步
              </Button>
            )}
            {step === 3 && (
              <div className="flex gap-2">
                <Button
                  sx={{ bgcolor: '#0936D8' }}
                  variant="outlined"
                  startIcon={<Save />}
                  onClick={() => {
                    setPorperty({ status: 'draft' });
                    onPublishProperty();
                  }}
                >
                  保存不刊登
                </Button>
                <Button
                  sx={{ bgcolor: '#0936D8' }}
                  variant="contained"
                  endIcon={<ChevronRight />}
                  onClick={() => {
                    onPublishProperty();
                  }}
                >
                  完成並刊登
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Publish;
