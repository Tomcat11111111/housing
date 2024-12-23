import { Button } from '@mui/material';
import { Maximize, Save } from 'lucide-react';

import ItemCard from '@/components/common/ItemCard/ItemCard';

const ItemPreview = () => {
  return (
    <div className="mt-6 p-4 flex flex-col gap-4 bg-white rounded-2xl border-solid border-1 border-[#E9E9E9]">
      <div className="flex items-center gap-2">
        <h1 className="text-[#333] text-xl font-bold leading-8">刊登預覽</h1>
        <Button
          variant="contained"
          className="bg-[#F6F6F6] text-[#0926D8] top-0 left-6"
          startIcon={<Save />}
        >
          物件已保存
        </Button>
      </div>
      <div className="flex">
        <div className="h-[338px] w-[370px]">
          <ItemCard itemData={{}} />
        </div>
        <Button
          variant="contained"
          className="h-[56px] bg-[#0936D8] right-0 bottom-0"
          startIcon={<Maximize />}
        >
          全螢幕預覽
        </Button>
      </div>
    </div>
  );
};

export default ItemPreview;
