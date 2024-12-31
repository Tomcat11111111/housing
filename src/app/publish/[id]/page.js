'use client';

import { useEffect, useRef, useState } from 'react';

import { Box, Button, Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation, useQuery } from '@tanstack/react-query';
import { dayjs } from 'dayjs';
import { ChevronLeft, ChevronRight, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Dialog from '@/components/common/Dialog/Dialog';

import usePublishStore from '@/store/usePublishStore';

import PublishHeader from '../PublishHeader';
import {
  getPropertyDetailApi,
  updateRentalPropertyApi,
  updateSalePropertyApi,
} from '../actions';
import {
  transformLocationData,
  transformPropertyData,
  transformRentalInfoData,
  transformSalesInfoData,
} from '../publishHelper';
import AdvancedInfoSetting from '../step/AdvancedInfoSetting';
import InfoSetting from '../step/InfoSetting';
import ItemPreview from '../step/ItemPreview';
import PreviewDetailPage from '../step/PreviewDetailPage';
import TypeSetting from '../step/TypeSetting';

export default function EditProperty({ params }) {
  const {
    setItemTypeSettings,
    editPropertyState,
    setEditPropertyState,
    setProperty,
    setLocation,
    setRentalInfo,
    setSalesInfo,
  } = usePublishStore();
  const { step } = editPropertyState;
  const { id } = params;

  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const typeSettingRef = useRef(null);
  const infoSettingRef = useRef(null);
  const saleHouseRef = useRef(null);
  const rentHouseRef = useRef(null);
  const advancedInfoRef = useRef(null);

  const {
    data: propertyData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [`detail_${id}`],
    queryFn: getPropertyDetailApi,
    meta: {
      id,
    },
  });

  // const { mutate: updateProperty } = useMutation({
  //   mutationFn:
  //     itemTypeSettings.publishType === 'sales'
  //       ? updateSalePropertyApi
  //       : updateRentalPropertyApi,
  // });

  useEffect(() => {
    if (isSuccess) {
      setEditPropertyState({ isEdit: true, step: 0 });

      const { type, location, property, salesInfo, rentalInfo } = propertyData;
      console.group('Property Data Transform');
      console.log('Type:', propertyData.type);
      console.log('Location:', propertyData.location);
      console.log('Property:', propertyData.property);
      console.log('Sales Info:', propertyData.salesInfo);
      console.log('Rental Info:', propertyData.rentalInfo);
      console.groupEnd();

      setItemTypeSettings({
        publishType: type,
        itemType: 'house', // 先寫死 house，現在只有一種
        category: type === 'sales' ? salesInfo.category : rentalInfo.category,
      });

      if (type === 'rental') {
        setRentalInfo(transformRentalInfoData(rentalInfo));
      } else {
        setSalesInfo(transformSalesInfoData(salesInfo));
      }
      setLocation(transformLocationData(location));
      setProperty(transformPropertyData(property));
    }
  }, [propertyData, isSuccess]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLeave = () => {
    router.push('/member');
  };

  const dialogProps = {
    open: openDialog,
    onClose: handleCloseDialog,
    title: '尚未儲存',
    description: '確定返回會員中心嗎？修改資料將不會保存',
    buttonSettings: [
      {
        text: '繼續編輯',
        onClick: handleCloseDialog,
      },
      {
        text: '返回會員中心',
        onClick: handleConfirmLeave,
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          {step === 0 && <TypeSetting ref={typeSettingRef} isEdit={true} />}
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
            <Button
              variant="contained"
              startIcon={<ChevronLeft />}
              sx={{ bgcolor: '#0936D8', height: '56px', width: '160px' }}
              onClick={() => setOpenDialog(true)}
            >
              返回會員中心
            </Button>
          </div>
          <div>
            <div className="flex gap-2">
              <Button
                sx={{ height: '56px', width: '76px' }}
                variant="outlined"
                color="gray"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                取消
              </Button>
              <Button
                sx={{ height: '56px', width: '76px' }}
                variant="outlined"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                預覽
              </Button>
              <Button
                sx={{ bgcolor: '#0936D8', height: '56px', width: '160px' }}
                variant="contained"
                startIcon={<Save />}
                onClick={() => {}}
              >
                儲存
              </Button>
            </div>
          </div>
        </div>
        <Dialog {...dialogProps} />
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-describedby="modal-preview"
        >
          <Box
            sx={{
              width: '90%',
              maxHeight: '90%',
              backgroundColor: '#FFF',
              borderRadius: '16px',
              overflowY: 'auto',
              position: 'absolute',
              top: '69px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <X
              className="cursor-pointer absolute top-4 right-4 text-[#333] text-xl font-bold leading-8"
              onClick={() => setOpenModal(false)}
            />
            <div className="py-16 px-32">
              <PreviewDetailPage />
            </div>
          </Box>
        </Modal>
      </div>
    </LocalizationProvider>
  );
}
