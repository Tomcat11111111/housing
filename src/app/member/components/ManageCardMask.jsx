import React from 'react';

import { Button } from '@mui/material';
import { CircleCheck, Copy, Eye, FilePen, SquareX } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ManageCardMask = ({ type, item, enableProperty, disableProperty }) => {
  const router = useRouter();

  return (
    <div>
      {/* Close遮罩 */}
      {item.isDisabled && (
        <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-[#ffffff] bg-opacity-50 flex items-center justify-center">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#F44336] text-[40px] -rotate-30 font-bold tracking-wider">
            Close
          </p>
        </div>
      )}
      {/* 灰色遮罩和按鈕 */}
      <div className="absolute top-0 left-0 w-full h-full rounded-2xl  bg-opacity-50 flex items-center justify-center opacity-0 bg-[#333333] group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
        {/* 按鈕組 */}
        {!item.isDisabled ? (
          <div className="flex flex-col items-center gap-2">
            <Button
              className="w-[150px] h-[56px] px-4 py-2 bg-[#F44336] text-[#E9E9E9] rounded-lg gap-2 text-base font-bold"
              onClick={() => disableProperty({ propertyId: item.id })}
            >
              <SquareX />
              關閉此物件
            </Button>
            <Button
              className="w-[150px] h-[56px] px-4 py-2 bg-[#0936D8] text-[#FFFFFF] rounded-lg gap-2 text-base font-bold"
              onClick={() => router.push(`/publish/${item.id}`)}
            >
              <FilePen />
              編輯此物件
            </Button>
            <Button
              className="w-[150px] h-[56px] px-4 py-2 bg-[#0936D8] text-[#FFFFFF] rounded-lg gap-2 text-base font-bold"
              onClick={() => router.push(`/detail/${type}?id=${item.id}`)}
            >
              <Eye />
              查看此物件
            </Button>
            <Button className="w-[150px] h-[56px] px-4 py-2 bg-[#0936D8] text-[#FFFFFF] rounded-lg gap-2 text-base font-bold">
              <Copy />
              複製此物件
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 ">
            <Button
              className="w-[150px] h-[56px] px-4 py-2 bg-[#0936D8] text-[#FFFFFF] rounded-lg gap-2 text-base font-bold"
              onClick={() => enableProperty({ propertyId: item.id })}
            >
              <CircleCheck />
              開啟此物件
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCardMask;
