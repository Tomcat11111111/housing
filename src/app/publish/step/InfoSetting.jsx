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
import { HouseFormList } from './InfoSettingHelper';

import SaleHouseInfoSetting from './SaleHouseInfoSetting';
import RentHouseInfoSetting from './RentHouseInfoSetting';

import clsx from 'clsx';

import usePublishStore from '@/store/usePublishStore';

const InfoSetting = () => {
  const [lane, setLane] = useState(null);
  const [alley, setAlley] = useState(null);
  const [number, setNumber] = useState(null);
  const [subNumber, setSubNumber] = useState(null);

  const { infoSettings, setInfoSettings, itemTypeSettings } = usePublishStore();

  const publishType = itemTypeSettings.publishType;
  const {
    shapeId,
    title,
    cityId,
    districtId,
    address,
    floor,
    totalFloors,
    room,
    livingRoom,
    bathroom,
    balcony,
  } = infoSettings;


  const { data: citiesOptions } = useQuery({
    queryKey: ['getCitiesApi'],
    queryFn: getCitiesApi,
    initialData: [],
  });
  const districtsOptions = citiesOptions.find((city) => city.id === cityId)?.districts || [];

  useEffect(() => {
    if (cityId && districtId) {
      setInfoSettings({ districtId: null });
    }
  }, [cityId]);

  useEffect(() => {
    if (lane && alley && number && subNumber) {
      setInfoSettings({ address: `${lane}巷${alley}弄${number}號` });
    }
  }, [lane, alley, number, subNumber]);

  return (
    <div className="flex flex-col gap-6 my-6">
      <FieldGroup title="請選擇物件型態">
        <div className="flex gap-6">
          {HouseFormList.map((item) => (
            <Button
              key={item.value}
              className={clsx('h-20 flex-1 text-xl')}
              color={item.value === shapeId ? 'primary' : ''}
              variant={item.value === shapeId ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() =>
                setInfoSettings({
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
          value={title}
          placeholder="請輸入物件出售名稱"
          sx={{ width: '80%' }}
          onChange={(e) => {
            if (title && title.length === 60) return;

            setInfoSettings({
              title: e.target.value,
            });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">出售名稱＊</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">{`${title ? title.length : 0}/60`}</InputAdornment>
              ),
            },
          }}
        />
      </FieldGroup>
      <FieldGroup title="物件位置＊">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#333333] font-bold">出售地址＊</p>
          <FormControl sx={{ minWidth: 134 }}>
            <InputLabel sx={{ bgcolor: 'white' }} id="demo-select-small-label">
              請選擇縣市
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={cityId}
              label="Age"
              onChange={(e) => setInfoSettings({ cityId: e.target.value })}
            >
              {citiesOptions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 134 }}>
            <InputLabel sx={{ bgcolor: 'white' }} id="demo-select-small-label">
              請選擇鄉鎮市區
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={districtId}
              label="Age"
              onChange={(e) => setInfoSettings({ districtId: e.target.value })}
              disabled={!cityId}
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
            value={address}
            onChange={(e) => setInfoSettings({ address: e.target.value })}
            placeholder="請輸入道路或街名"
            sx={{ width: '200px' }}
          />
          <TextField
            
            className="w-[100px]"
            id="contacts"
            value={lane}
            onChange={(e) => setLane(e.target.value)}
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
            value={alley}
            onChange={(e) => setAlley(e.target.value)}
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
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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
            value={floor}
            onChange={(e) => setInfoSettings({ floor: e.target.value })}
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
            
            id="contacts"
            className="w-[100px]"
            value={subNumber}
            onChange={(e) => setSubNumber(e.target.value)}
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
            id="contacts"
            value={totalFloors}
            onChange={(e) => setInfoSettings({ totalFloors: e.target.value })}
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
        <TextField
          id="contacts"
          sx={{ width: '300px' }}
          placeholder="請輸入物件所在的社區名稱"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">社區名稱</InputAdornment>
              ),
            },
          }}
        />
      </FieldGroup>
      <FieldGroup title="物件格局＊">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#333333] font-bold">現況格局＊</p>
          <TextField
            
            id="contacts"
            value={room}
            onChange={(e) => setInfoSettings({ room: e.target.value })}
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
            
            id="contacts"
            value={livingRoom}
            onChange={(e) => setInfoSettings({ livingRoom: e.target.value })}
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
            
            id="contacts"
            value={bathroom}
            onChange={(e) => setInfoSettings({ bathroom: e.target.value })}
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
            
            id="contacts"
            value={balcony}
            onChange={(e) => setInfoSettings({ balcony: e.target.value })}
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
