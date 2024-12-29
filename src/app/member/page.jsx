'use client';

import React, { useState } from 'react';

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { Bookmark, ChevronRight, Search } from 'lucide-react';

const MemberPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [area, setArea] = useState('');

  // 切換 Tab 時更新狀態
  const handleTabChange = (e, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChange = (e) => {
    setArea(e.target.value);
  };

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex w-full items-center gap-6">
        <div className="flex gap-2">
          <Bookmark className=" h-8 w-8" />
          <h1 className=" text-2xl font-bold">收藏管理</h1>
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
            <Button className="text-[#333333] p-2 gap-2">
              <p>物件管理</p>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <div className=" flex w-full gap-2">
        <div className="w-[120px]">
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                bgcolor: '#f6f6f6',
                fontSize: '14px',
              }}
            >
              選擇城市
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={area}
              label="Area"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex w-full justify-between">
          <TextField
            sx={{
              width: '80%',
              marginRight: '70px',
            }}
            placeholder="請輸入地址和名稱"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className="w-[120px] ">
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  bgcolor: '#f6f6f6',
                  fontSize: '14px',
                }}
              >
                預設排序
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={area}
                label="Area"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
