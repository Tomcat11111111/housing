import { Button } from '@mui/material';
import { Maximize } from 'lucide-react';

import ItemCard from '@/components/common/ItemCard/ItemCard';

import DetailPreview from './DetailPreview';

import usePublishStore from '@/store/usePublishStore';

const ItemPreview = () => {
  const {
    itemTypeSettings,
    property,
    saleInfo,
    rentInfo,
  } = usePublishStore();

  return (
    <div className="mt-6 p-4 flex flex-col gap-4 bg-white rounded-2xl border-solid border-1 border-[#E9E9E9]">
      <div className="flex items-center gap-2">
        <h1 className="text-[#333] text-xl font-bold leading-8">刊登預覽</h1>
      </div>
      <div className="flex h-[450px]">
        <div className="w-[30%]">
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
                totalPrice: saleInfo.totalPrice,
              }}
            />
          </div>
        </div>
        <div className=" w-[40%]">
          {/* <DetailPreview/> */}
        </div>
        <div className="flex flex-col justify-end items-end w-[30%]">
          <Button
            variant="contained"
            className="h-[56px] w-[134px] bg-[#0936D8] right-0 bottom-0"
            startIcon={<Maximize />}
          >
            全螢幕預覽
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;
