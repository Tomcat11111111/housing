import React, { useState } from 'react';

import { useToast } from '@/app/contexts/ToastContext';
import { Button, Tab, Tabs } from '@mui/material';
import { Bookmark, Building2, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useMemberTabs } from '@/store/useTabsStore';

const TabsBar = ({ type }) => {
  const { currentTab, setCurrentTab } = useMemberTabs();

  const router = useRouter();

  const handleTabChange = (e, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <div className="flex w-full items-center gap-6">
        <div className="flex gap-2">
          {type === 'bookmark' ? (
            <Bookmark className=" h-8 w-8" />
          ) : (
            <Building2 className=" h-8 w-8" />
          )}
          <h1 className=" text-2xl font-bold">
            {type === 'bookmark' ? '收藏管理' : '物件管理'}
          </h1>
        </div>
        <div className=" flex flex-1 items-center font-bold justify-between">
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTab-root': {
                color: '#ccc', // 預設文字顏色
              },
              '& .MuiTab-root.Mui-selected': {
                color: '#0936D8', // 選中時文字顏色
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#0936D8', // 指示器顏色
              },
            }}
          >
            <Tab label="出租物件" />
            <p className=" self-center text-[#ccc]">|</p>
            <Tab label="出售物件" />
          </Tabs>
          <div className=" border border-[#e9e9e9] rounded-lg">
            <Button
              className="text-[#333333] p-2 gap-2"
              onClick={() => {
                if (type === 'bookmark') {
                  router.push('/member/management');
                } else {
                  router.push('/member');
                }
              }}
            >
              <p>{type === 'bookmark' ? '物件管理' : '收藏管理'}</p>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsBar;
