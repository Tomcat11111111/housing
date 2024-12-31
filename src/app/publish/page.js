'use client';

import { useEffect, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation } from '@tanstack/react-query';
import { dayjs } from 'dayjs';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

import usePublishStore from '@/store/usePublishStore';

import PublishHeader from './PublishHeader';
import StepBar from './StepBar';
import { createRentPropertyApi, createSalePropertyApi } from './actions';
import AdvancedInfoSetting from './step/AdvancedInfoSetting';
import InfoSetting from './step/InfoSetting';
import ItemPreview from './step/ItemPreview';
import TypeSetting from './step/TypeSetting';

const Publish = () => {
  const [step, setStep] = useState(0);

  const typeSettingRef = useRef(null);
  const infoSettingRef = useRef(null);
  const saleHouseRef = useRef(null);
  const rentHouseRef = useRef(null);
  const advancedInfoRef = useRef(null);

  const {
    itemTypeSettings,
    property,
    salesInfo,
    rentalInfo,
    location,
    setPorperty,
    setSalesInfo,
    setRentInfo,
  } = usePublishStore();

  const handleNextStep = async () => {
    if (step === 0) {
      const isValid = await typeSettingRef.current?.trigger();
      if (!isValid) {
        // 可以加入錯誤提示
        return;
      }
    }

    if (step === 1) {
      const isValid = await infoSettingRef.current?.trigger();
      if (!isValid) {
        // 可以加入錯誤提示
        return;
      }
    }

    if (step === 2) {
      const isValid = await advancedInfoRef.current?.trigger();
      if (!isValid) {
        // 可以加入錯誤提示
        return;
      }
    }

    setStep(step + 1);
  };

  const scrollToError = (errorField) => {
    const errorElement = document.querySelector(`[name="${errorField}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const { mutate: publishProperty } = useMutation({
    mutationFn:
      itemTypeSettings.publishType === 'sales'
        ? createSalePropertyApi
        : createRentPropertyApi,
    onSuccess: () => {
      alert('刊登成功'); // 刊登成功後續行為，提示、導頁
    },
  });

  const formatrentInfo = (rentalInfo) => {
    const moveInDate = rentalInfo.moveInDate
      ? dayjs(rentalInfo.moveInDate).format('YYYY-MM-DD')
      : null;

    return {
      ...rentalInfo,
      moveInDate,
    };
  };

  const formatSalesInfo = (salesInfo) => {
    return {
      ...salesInfo,
    };
  };

  const onPublishProperty = () => {
    const publishType = itemTypeSettings.publishType;
    const infoName = publishType === 'sales' ? 'salesInfo' : 'rentalInfo';
    const info =
      publishType === 'sales'
        ? formatSalesInfo(salesInfo)
        : formatrentInfo(rentalInfo);

    publishProperty({
      property,
      location,
      [infoName]: { ...info, category: itemTypeSettings.category },
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
          {step === 0 && <TypeSetting ref={typeSettingRef} />}
          {step === 1 && (
            <InfoSetting
              ref={infoSettingRef}
              saleHouseRef={saleHouseRef}
              rentHouseRef={rentHouseRef}
            />
          )}
          {step === 2 && <AdvancedInfoSetting ref={advancedInfoRef} />}
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
