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
import { HousePlus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ItemCard from '@/components/common/ItemCard/ItemCard';

import { useMemberTabs } from '@/store/useTabsStore';

import { disableApi, enableApi, getPropertiesApi } from '../actions';
import ManageCardMask from '../components/ManageCardMask';
import TabsBar from '../components/TabsBar';

const ManagemnentPage = () => {
  const [area, setArea] = useState('');
  const router = useRouter();
  const { currentTab } = useMemberTabs();

  const handleChange = (e) => {
    setArea(e.target.value);
  };

  const { data, refetch: refetchProperties } = useQuery({
    queryKey: ['getProperties'],
    queryFn: getPropertiesApi,
  });

  const { mutate: enableProperty } = useMutation({
    mutationFn: enableApi,
    onSuccess: () => {
      refetchProperties();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: disableProperty } = useMutation({
    mutationFn: disableApi,
    onSuccess: () => {
      refetchProperties();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { salesProperties, rentalProperties } = (data?.data || []).reduce(
    (acc, item) => {
      const commonData = {
        id: item.id,
        title: item.title,
        views: item.views,
        updatedAt: item.updatedAt,
        squareMeters: item.squareMeters,
        floor: item.floor,
        totalFloors: item.totalFloors,
        age: item.age,
        room: item.room,
        bathroom: item.bathroom,
        livingRoom: item.livingRoom,
        balcony: item.balcony,
        location: item.location,
        images: item.images || [], // 預設為空陣列
        isDisabled: item.isDisabled,
      };

      if (item.type === 'sales' && item.salesInfo) {
        acc.salesProperties.push({
          ...commonData,
          price: item.salesInfo.totalPrice,
          totalPrice: item.salesInfo.totalPrice,
          unitPrice: item.salesInfo.unitPrice,
          type: 'sales',
        });
      } else if (item.type === 'rental' && item.rentalInfo) {
        acc.rentalProperties.push({
          ...commonData,
          price: item.rentalInfo.monthlyRent,
          totalPrice: item.rentalInfo.monthlyRent,
          unitPrice: item.rentalInfo.unitRent,
          type: 'rental',
        });
      }

      return acc;
    },
    { salesProperties: [], rentalProperties: [] }
  );

  return (
    <div className=" flex flex-col gap-6">
      <TabsBar type={'management'} />
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
          <div className=" ">
            <Button
              sx={{
                bgcolor: '#0936D8',
                color: '#FFFFFF',
                padding: '16px 8px',
                gap: '8px',
                borderRadius: '8px',
                width: '144px',
                height: '56px',
              }}
              onClick={() => router.push('/publish')}
            >
              <HousePlus />
              新增
            </Button>
          </div>
        </div>
      </div>
      <div>
        {currentTab === 0 && (
          <div className="grid grid-cols-4 p-6 gap-4">
            {rentalProperties?.length > 0 ? (
              rentalProperties.map((item, index) => (
                <div key={item.id} className="max-w-[350px] max-h-[370px]">
                  <ItemCard itemData={item} index={index} type="rent" />
                  <ManageCardMask
                    type={'rent'}
                    item={item}
                    disableProperty={disableProperty}
                    enableProperty={enableProperty}
                  />
                </div>
              ))
            ) : (
              <div>尚無上架的出售物件</div>
            )}
          </div>
        )}
        {currentTab === 2 && (
          <div className="grid grid-cols-4 p-6 gap-4">
            {salesProperties?.length > 0 ? (
              salesProperties.map((item, index) => (
                <div
                  key={item.id}
                  className="relative max-w-[400px] h-full group border rounded-2xl border-[#E9E9E9] "
                >
                  {/* 卡片內容 */}
                  <ItemCard itemData={item} index={index} type="buy" />
                  <ManageCardMask
                    type={'buy'}
                    item={item}
                    disableProperty={disableProperty}
                    enableProperty={enableProperty}
                  />
                </div>
              ))
            ) : (
              <div>尚無上架的出售物件</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagemnentPage;
