'use client';

import React, { useState } from 'react';

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Search, Share2, SquareX } from 'lucide-react';

import ItemCard from '@/components/common/ItemCard/ItemCard';

import { useMemberTabs } from '@/store/useTabsStore';

import { useToast } from '../contexts/ToastContext';
import { deleteBookmarkApi, getBookmarksApi } from './actions';
import TabsBar from './components/TabsBar';

const MemberPage = () => {
  const { currentTab } = useMemberTabs();
  const [area, setArea] = useState('');
  const { showToast } = useToast();

  const handleChange = (e) => {
    setArea(e.target.value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarksApi,
  });

  const { salesProperties, rentalProperties } = (data?.data || []).reduce(
    (acc, item) => {
      const { property, type } = item;
      const commonData = {
        id: property.id,
        title: property.title,
        views: property.views,
        updatedAt: property.updatedAt,
        squareMeters: property.squareMeters,
        floor: property.floor,
        totalFloors: property.totalFloors,
        age: property.age,
        room: property.room,
        bathroom: property.bathroom,
        livingRoom: property.livingRoom,
        balcony: property.balcony,
        location: property.location,
        images: [], // 預設為空陣列
        isDisabled: property.isDisabled,
      };

      if (type === 'sales') {
        acc.salesProperties.push({
          ...commonData,
          price: property.salesInfo.totalPrice,
          totalPrice: property.salesInfo.totalPrice,
          unitPrice: property.salesInfo.unitPrice,
          type: 'sales',
        });
      } else if (type === 'rental') {
        acc.rentalProperties.push({
          ...commonData,
          price: property.rentalInfo.monthlyRent,
          totalPrice: property.rentalInfo.monthlyRent,
          unitPrice: property.rentalInfo.unitRent,
          type: 'rental',
        });
      }

      return acc;
    },
    { salesProperties: [], rentalProperties: [] }
  );

  const { mutate: deleteBookmark } = useMutation({
    mutationFn: deleteBookmarkApi,
    onSuccess: () => {
      showToast('success', '成功移除標籤');
    },
    onError: (error) => {
      showToast('error', '移除標籤失敗');
      console.log('Error deleting bookmark', error);
    },
  });

  const handleRemoveBookmark = (propertyId) => {
    deleteBookmark(propertyId);
  };

  const handleShare = (propertyId) => {
    const url = `https://jzj.hkg1.zeabur.app/detail/buy?id=${propertyId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast('success', '複製成功');
      })
      .catch((error) => {
        showToast('error', '複製失敗');
        console.log('複製失敗', error);
      });
  };

  return (
    <div className=" flex flex-col gap-6">
      <TabsBar type={'bookmark'} />
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
      <div>
        {currentTab === 0 && (
          <div className="grid grid-cols-4 p-6 gap-4">
            {rentalProperties?.length > 0 ? (
              rentalProperties.map((item, index) => (
                <div key={item.id} className="w-[326px] h-[370px]">
                  <ItemCard itemData={item} index={index} type="buy" />
                </div>
              ))
            ) : (
              <div>尚無儲存的物件</div>
            )}
          </div>
        )}
        {currentTab === 2 && (
          <div className="grid grid-cols-4 p-6 gap-4">
            {salesProperties?.length > 0 ? (
              salesProperties.map((item, index) => (
                <div
                  key={item.id}
                  className="relative max-w-[400px] h-full group "
                >
                  {/* 卡片內容 */}
                  <ItemCard itemData={item} index={index} type="buy" />

                  {/* 灰色遮罩和按鈕 */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-[#333333] bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 ">
                    {/* 按鈕組 */}
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        className="w-[144px] h-[56px] px-4 py-2 bg-[#F44336] text-[#E9E9E9] rounded-lg gap-2 text-base font-bold"
                        onClick={() => handleRemoveBookmark(item.id)}
                      >
                        <SquareX />
                        取消收藏
                      </Button>
                      <Button
                        className="w-[144px] h-[56px] px-4 py-2 bg-[#0936D8] text-[#FFFFFF] rounded-lg gap-2 text-base font-bold"
                        onClick={() => handleShare(item.id)}
                      >
                        <Share2 />
                        分享物件
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>尚無儲存的物件</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPage;
