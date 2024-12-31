import React from 'react';

import { Button } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const AnnouncementCard = () => {
  return (
    <div className=" flex flex-col w-full h-full p-6 bg-[#ffffff]">
      <div className="flex justify-between items-center pb-4">
        <h1 className=" text-2xl font-bold">網站公告</h1>
        <div className=" border border-[#e9e9e9] rounded-lg">
          <Button
            sx={{
              color: '#333333',
              padding: '8px',
              gap: '8px',
            }}
          >
            <p>瀏覽更多</p>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className=" flex flex-1 justify-between pb-2 text-xl">
        <p>網站公告內容網站公告內容網站公告內容</p>
        <p>2024/02/11</p>
      </div>
      <div className=" flex flex-1 justify-between pb-2 text-xl">
        <p>網站公告內容網站公告內容網站公告內容</p>
        <p>2024/02/11</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
