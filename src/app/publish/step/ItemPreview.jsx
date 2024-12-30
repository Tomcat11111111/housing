import { useState } from 'react';

import { Button, Modal, Box } from '@mui/material';
import { Maximize, X } from 'lucide-react';

import ItemCard from '@/components/common/ItemCard/ItemCard';

import PreviewDetailPage from './PreviewDetailPage';

import usePublishStore from '@/store/usePublishStore';

const ItemPreview = () => {
  const {
    itemTypeSettings,
    property,
    salesInfo,
    rentalInfo,
    location,
  } = usePublishStore();
  const [openModal, setOpenModal] = useState(false);
  
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="mt-6 p-4 flex flex-col gap-4 bg-white rounded-2xl border-solid border-1 border-[#E9E9E9]">
      <div className="flex items-center gap-2">
        <h1 className="text-[#333] text-xl font-bold leading-8">刊登預覽</h1>
      </div>
      <div className="flex h-[400px]">
        <div className="w-[30%] relative">
        <div className="h-[338px] w-[370px] absolute top-0 left-0 z-10"></div>
          <div className="h-[338px] w-[370px]">
            <ItemCard
              type={itemTypeSettings.publishType}
              itemData={{
                title: property.title,
                room: property.room,
                bathroom: property.bathroom,
                livingRoom: property.livingRoom,
                balcony: property.balcony,
                age: property.age,
                squareMeters: property.squareMeters,
                floor: property.floor,
                totalFloors: property.totalFloors,
                images: property.images,
                totalPrice: salesInfo?.totalPrice,
                price: rentalInfo?.price,
                images: property.images,
              }}
            />
          </div>
        </div>
        <div className=" w-[40%] bg-[#CCC] rounded-2xl p-2 overflow-hidden">
          <div className="w-[200%] h-[200%] scale-50 origin-top-left">
            <PreviewDetailPage />
          </div>
        </div>
        <div className="flex flex-col justify-end items-end w-[30%]">
          <Button
            variant="contained"
            className="h-[56px] w-[134px] bg-[#0936D8] right-0 bottom-0"
            startIcon={<Maximize />}
            onClick={handleOpenModal}
          >
            全螢幕預覽
          </Button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-describedby="modal-preview"
          >
            <Box sx={{ width: '90%', maxHeight: '90%', backgroundColor: '#FFF', borderRadius: '16px', overflowY: 'auto', position: 'absolute', top: '69px', left: '50%', transform: 'translateX(-50%)' }}>
              <X className='cursor-pointer absolute top-4 right-4 text-[#333] text-xl font-bold leading-8' onClick={handleCloseModal} />
              <div className='py-16 px-32'>
                <PreviewDetailPage />
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;
