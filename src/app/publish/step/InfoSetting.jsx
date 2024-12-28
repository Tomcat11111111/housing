import { useState, useEffect } from 'react'

import { getCitiesApi } from '../actions';
import { useQuery } from '@tanstack/react-query';

import Bed from '@/icon/BedIcon/BedIcon'
import GrassIcon from '@/icon/GrassIcon/GrassIcon'
import CouchIcon from '@/icon/CouchIcon/CouchIcon'
import TubIcon from '@/icon/TubIcon/TubIcon'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import FieldGroup from './FieldGroup';
import { HouseFormList } from './publishHelper';

import SaleHouseInfoSetting from './SaleHouseInfoSetting';
import RentHouseInfoSetting from './RentHouseInfoSetting';

import clsx from 'clsx';

import usePublishStore from '@/store/usePublishStore';

const InfoSetting = () => {
  const { property, setProperty, location, setLocation, itemTypeSettings } = usePublishStore();

  
  const { data: citiesOptions } = useQuery({
    queryKey: ['getCitiesApi'],
    queryFn: getCitiesApi,
    initialData: [],
  });
  
  const publishType = itemTypeSettings.publishType;
  const districtsOptions = citiesOptions.find((city) => city.id === location.cityId)?.districts || [];

  useEffect(() => {
    if (location.cityId && location.districtId) {
      setLocation({ districtId: null });
    }
  }, [location.cityId]);

  return (
    <div className="flex flex-col gap-6 my-6">
      <FieldGroup title="請選擇物件型態">
        <div className="flex gap-6">
          {HouseFormList.map((item) => (
            <Button
              key={item.value}
              className={clsx('h-20 flex-1 text-xl')}
              color={item.value === property.shapeId ? 'primary' : ''}
              variant={item.value === property.shapeId ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() =>
                setProperty({
                  shapeId: item.value,
                })
              }
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup title="出售名稱＊">
        <TextField
          id="contacts"
          value={property.title}
          placeholder="請輸入物件出售名稱"
          sx={{ width: '80%' }}
          onChange={(e) => {
            if (property.title && property.title.length === 60) return;

            setProperty({
              title: e.target.value,
            });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">出售名稱＊</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">{`${property.title ? property.title.length : 0}/60`}</InputAdornment>
              ),
            },
          }}
        />
      </FieldGroup>
      <FieldGroup title="物件位置＊">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#333333] font-bold">出售地址＊</p>
          <FormControl sx={{ minWidth: 134 }}>
            <InputLabel sx={{ bgcolor: 'white' }}>
              請選擇縣市
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={location.cityId}
              onChange={(e) => setLocation({ cityId: e.target.value })}
            >
              {citiesOptions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 134 }}>
            <InputLabel sx={{ bgcolor: 'white' }}>
              請選擇鄉鎮市區
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={location.districtId}
              onChange={(e) => setLocation({ districtId: e.target.value })}
              disabled={!location.cityId}
            >
              {
                districtsOptions.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.displayName}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <TextField
            id="contacts"
            value={location.address}
            onChange={(e) => setLocation({ address: e.target.value })}
            placeholder="請輸入道路或街名"
            sx={{ width: '200px' }}
          />
          <TextField
            className="w-[100px]"
            id="contacts"
            value={location.lane}
            onChange={(e) => setLocation({ lane: e.target.value })}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">巷</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            className="w-[100px]"
            id="contacts"
            value={location.alley}
            onChange={(e) => setLocation({ alley: e.target.value })}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">弄</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            className="w-[100px]"
            id="contacts"
            value={location.number}
            onChange={(e) => setLocation({ number: e.target.value })}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">號</InputAdornment>
                ),
              },
            }}
          />
          <p className="text-[#909090]">( 前台只會顯示前半段地址 )</p>
        </div>
        <div className="flex gap-2 items-center">
          <TextField
            className="w-[405px]"
            id="contacts"
            value={property.floor}
            onChange={(e) => setProperty({ floor: e.target.value })}
            placeholder="0 為整棟 -1 為地下室 +1 為頂樓加蓋"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">出租樓層＊</InputAdornment>
                ),
              endAdornment: (
                  <InputAdornment position="start">樓</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            className="w-[100px]"
            value={location.houseRoom}
            onChange={(e) => setLocation({ houseRoom: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">之</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            className="w-[158px]"
            value={property.totalFloors}
            onChange={(e) => setProperty({ totalFloors: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">總樓層</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">樓</InputAdornment>
                ),
              },
            }}
          />
        </div>
        {/* <TextField
          id="neightborhood"
          sx={{ width: '300px' }}
          placeholder="請輸入物件所在的社區名稱"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">社區名稱</InputAdornment>
              ),
            },
          }}
        /> */}
      </FieldGroup>
      <FieldGroup title="物件格局＊">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#333333] font-bold">現況格局＊</p>
          <TextField
            id="room"
            value={property.room}
            onChange={(e) => setProperty({ room: e.target.value })}
            sx={{ width: '150px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><Bed /></InputAdornment>
                ),
              endAdornment: (
                  <InputAdornment position="end">房</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="livingRoom"
            value={property.livingRoom}
            onChange={(e) => setProperty({ livingRoom: e.target.value })}
            sx={{ width: '150px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><CouchIcon /></InputAdornment>
                ),
              endAdornment: (
                  <InputAdornment position="end">廳</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="bathroom"
            value={property.bathroom}
            onChange={(e) => setProperty({ bathroom: e.target.value })}
            sx={{ width: '150px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><TubIcon /></InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">衛</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="balcony"
            value={property.balcony}
            onChange={(e) => setProperty({ balcony: e.target.value })}
            sx={{ width: '150px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><GrassIcon /></InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">陽台</InputAdornment>
                ),
              },
            }}
          />
          <FormControlLabel control={<Checkbox />} label="開放式格局" />
        </div>
      </FieldGroup>
      {publishType === 'buy' && (
        <SaleHouseInfoSetting />
      )}
      {publishType === 'rent' && (
        <RentHouseInfoSetting />
      )}
    </div>
  );
};

export default InfoSetting;
