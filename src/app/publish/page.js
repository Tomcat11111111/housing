'use client';

import { useEffect, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

import usePublishStore from '@/store/publishStore';

import PublishHeader from './PublishHeader';
import StepBar from './StepBar';
import { createRentPropertyApi, createSalePropertyApi } from './actions';
import ItemAdvancedInfoSetting from './step/AdvancedInfoSetting';
import ItemInfoSetting from './step/InfoSetting';
import ItemPreview from './step/ItemPreview';
import ItemTypeSetting from './step/TypeSetting';

const Publish = () => {
  const [step, setStep] = useState(1);
  const {
    itemTypeSettings,
    infoSettings,
    advancedInfoSettings,
    setItemTypeSettings,
    setInfoSettings,
    setAdvancedInfoSettings,
  } = usePublishStore();

  const itemStatusRef = useRef('');

  const MockSaleData = {
    property: {
      title: '中正區臨沂街巷內溫馨小宅（含坡平車位)',
      age: 8,
      squareMeters: 52,
      floor: 1,
      totalFloors: 17,
      room: 0,
      livingRoom: 0,
      bathroom: 0,
      balcony: 0,
      views: 0,
      shapeId: 2,
      decorLevelId: 4,
      images: [
        'https://jzj-storage.zeabur.app/uploads/67bab49a-f821-4a14-a5ac-29319675354f',
      ],
      status: 'draft',
    },
    saleInfo: {
      category: 'residential',
      totalPrice: 88888888,
      unitPrice: 1720100,
      direction: 'southwest_to_northeast',
      source: 'platform',
      parkingSpace: 'planar',
      ownership: 42,
      surroundingIds: [],
    },
    location: {
      cityId: 1,
      districtId: 1,
      address: '台北市中正區臨沂街',
    },
  };
  const MockRentData = {
    property: {
      title: '忠孝國小學區旁近華山',
      age: 25,
      squareMeters: 5,
      floor: 5,
      totalFloors: 8,
      room: 1,
      livingRoom: 1,
      bathroom: 1,
      balcony: 1,
      type: 'rental',
      views: 120,
      shapeId: 2,
      decorLevelId: 1,
    },
    rentalInfo: {
      category: 'private_study',
      price: 87000,
      type: 'room_to_share',
      featureIds: [1],
      includedInRentIds: [3],
      offerIds: [4],
      ruleIds: [3, 4],
      materialId: 1,
      introduction: '<p>測試介紹</p>',
    },
    location: {
      cityId: 1,
      districtId: 1,
      address: '台北市中正區臨沂街',
    },
  };

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

  // useEffect(() => {
  //   // 切換步驟時，將滾動條移到最上方
  //   window.scrollTo(0, 0);
  // }, []);

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
        {step === 0 && (
          <ItemTypeSetting
            itemTypeSettings={itemTypeSettings}
            setItemTypeSettings={setItemTypeSettings}
          />
        )}
        {step === 1 && (
          <ItemInfoSetting
            publishType={itemTypeSettings.publishType}
            infoSettings={infoSettings}
            setInfoSettings={setInfoSettings}
          />
        )}
        {step === 2 && (
          <ItemAdvancedInfoSetting
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
                  publishProperty(MockRentData);
                }}
              >
                保存不刊登
              </Button>
              <Button
                sx={{ bgcolor: '#0936D8' }}
                variant="contained"
                endIcon={<ChevronRight />}
                onClick={() => publishProperty(MockRentData)}
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
