'use client';

import { useEffect, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

import usePublishStore from '@/store/usePublishStore';

import PublishHeader from './PublishHeader';
import StepBar from './StepBar';
import { createRentPropertyApi, createSalePropertyApi } from './actions';
import { formatPropertyData } from './publishHelper';
import ItemAdvancedInfoSetting from './step/AdvancedInfoSetting';
import ItemInfoSetting from './step/InfoSetting';
import ItemPreview from './step/ItemPreview';
import ItemTypeSetting from './step/TypeSetting';

const Publish = () => {
  const [step, setStep] = useState(0);
  const {
    itemTypeSettings,
    infoSettings,
    advancedInfoSettings,
    setAdvancedInfoSettings,
  } = usePublishStore();

  const itemStatusRef = useRef('');

  const { mutate: publishProperty } = useMutation({
    mutationFn:
      itemTypeSettings.publishType === 'buy'
        ? createSalePropertyApi
        : createRentPropertyApi,
    onSuccess: () => {
      // 刊登成功後續行為，提示、導頁
      alert('刊登成功');
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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
          {step === 2 && (
            <ItemAdvancedInfoSetting
              itemTypeSettings={itemTypeSettings}
              infoSettings={infoSettings}
              advancedInfoSettings={advancedInfoSettings}
              setAdvancedInfoSettings={setAdvancedInfoSettings}
            />
          )}
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
                onClick={() => {
                  //todo: 檢查當前步驟資料是否齊全，驗證怎麼做

                  setStep(step + 1);
                }}
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
                    itemStatusRef.current = 'draft';
                    publishProperty(
                      formatPropertyData({
                        itemTypeSettings: itemTypeSettings,
                        infoSettings: infoSettings,
                        advancedInfoSettings: advancedInfoSettings,
                      })
                    );
                  }}
                >
                  保存不刊登
                </Button>
                <Button
                  sx={{ bgcolor: '#0936D8' }}
                  variant="contained"
                  endIcon={<ChevronRight />}
                  onClick={() => {
                    publishProperty(
                      formatPropertyData({
                        itemTypeSettings: itemTypeSettings,
                        infoSettings: infoSettings,
                        advancedInfoSettings: advancedInfoSettings,
                      })
                    );
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
