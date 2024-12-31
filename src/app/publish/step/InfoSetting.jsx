import { useEffect, useRef } from 'react';

import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
import { getTextFromList, PublishTypeList, ItemTypeList, RentHouseTypeList, BuyHouseTypeList, handleNumberInput } from '../publishHelper';
import { getCitiesApi, getShapesApi } from '../actions';

import usePublishStore from '@/store/usePublishStore';

import SaleHouseInfoSetting from './SaleHouseInfoSetting';
import RentHouseInfoSetting from './RentHouseInfoSetting';

import clsx from 'clsx';

const infoSettingSchema = yup.object().shape({
  shapeId: yup.string().required('請選擇格局'),
  title: yup.string().required('請輸入物件出售名稱'),
  cityId: yup.string().required('請選擇縣市'),
  districtId: yup.string().required('請選擇行政區'),
  address: yup.string().required('請輸入詳細地址'),
  floor: yup
    .number()
    .typeError('請選擇樓層')
    .required('請選擇樓層'),
  totalFloors: yup
    .number()
    .typeError('請選擇總樓層')
    .required('請選擇總樓層')
    .min(1, '總樓層必須大於0')
    .test('is-greater-than-floor', '總樓層必須大於或等於所在樓層', function(value) {
      return value >= this.parent.floor;
    }),
  room: yup
    .number()
    .typeError('請選擇房數')
    .required('請選擇房數')
    .min(0, '房數不可為負數'),
  livingRoom: yup
    .number()
    .typeError('請選擇廳數')
    .required('請選擇廳數')
    .min(0, '廳數不可為負數'),
  bathroom: yup
    .number()
    .typeError('請選擇衛浴數')
    .required('請選擇衛浴數')
    .min(0, '衛浴數不可為負數'),
  balcony: yup
    .number()
    .typeError('請選擇陽台數')
    .required('請選擇陽台數')
    .min(0, '陽台數不可為負數'),
});

const InfoSetting = forwardRef((props, ref) => {
  const {  property, itemTypeSettings, location, setLocation, setProperty } = usePublishStore();
  const publishType = itemTypeSettings.publishType;
  const saleHouseRef = useRef(null);
  const rentHouseRef = useRef(null);

  // InfoSetting 自己的表單驗證
  const {
    formState: { errors },
    trigger: infoTrigger
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(infoSettingSchema),
    values: {
      title: property.title,
      shapeId: property.shapeId,
      cityId: location.cityId,
      districtId: location.districtId,
      address: location.address,
      floor: property.floor,
      totalFloors: property.totalFloors,
      room: property.room,
      livingRoom: property.livingRoom,
      bathroom: property.bathroom,
      balcony: property.balcony,  
    }
  });

  useImperativeHandle(ref, () => ({
    trigger: async () => {
      // 先驗證 InfoSetting 本身的欄位
      const isInfoValid = await infoTrigger();
      const isDetailValid = publishType === 'buy' ? await saleHouseRef.current?.trigger() : await rentHouseRef.current?.trigger();
      return isInfoValid && isDetailValid;
    },
    errors: {
      ...errors,
      // ...(publishType === 'buy' 
      //   ? saleHouseRef.current?.errors 
      //   : rentHouseRef.current?.errors)
    }
  }));

  const { data: citiesOptions } = useQuery({
    queryKey: ['getCitiesApi'],
    queryFn: getCitiesApi,
    initialData: [],
  });

  // 物件型態
  const { data: shapesOptions } = useQuery({
    queryKey: ['getShapesApi'],
    queryFn: getShapesApi,
  });
  
  const districtsOptions = citiesOptions.find((city) => city.id === location.cityId)?.districts || [];
  const itemFormList = publishType === 'buy' ? BuyHouseTypeList : RentHouseTypeList;

  useEffect(() => {
    if (location.cityId && location.districtId) {
      setLocation({ districtId: null });
    }
  }, [location.cityId]);


  return (
    <div className="flex flex-col gap-6 my-6">
      <div className="text-[#333] text-xl font-bold leading-8">
        {getTextFromList(itemTypeSettings.publishType, PublishTypeList)} &gt;
        {getTextFromList(itemTypeSettings.itemType, ItemTypeList)} &gt;
        {getTextFromList(itemTypeSettings.category, itemFormList)}
      </div>
      <FieldGroup title="請選擇物件型態" error={errors.shapeId?.message}>
        <div className="flex gap-6">
          {shapesOptions?.map((item) => (
            <Button
              key={item.value}
              className={clsx('h-20 flex-1 text-xl')}
              color={item.id === property.shapeId ? 'primary' : ''}
              variant={item.id === property.shapeId ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() =>
                setProperty({
                  shapeId: item.id,
                })
              }
            >
              {item.displayName}
            </Button>
          ))}
        </div>
      </FieldGroup>
        <FieldGroup title={publishType === 'buy' ? "出售名稱＊" : "出租名稱＊"}>
        <TextField
          id="contacts"
          value={property.title}
          placeholder={publishType === 'buy' ? "請輸入物件出售名稱" : "請輸入物件出租名稱"}
          sx={{ width: '80%' }}
          error={!!errors.title}
          helperText={errors.title?.message}
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
          <FormControl sx={{ minWidth: 134 }} error={errors.cityId?.message}>
            <InputLabel sx={{ bgcolor: 'white' }} >
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
          <FormControl sx={{ minWidth: 160 }} error={errors.districtId?.message}>
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
            error={!!errors.address}
            helperText={errors.address?.message}
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
            onChange={(e) => {
              setProperty({ floor: handleNumberInput(e.target.value) })
            }}
            error={!!errors.floor}
            helperText={errors.floor?.message}
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
            onChange={(e) => {
              setProperty({ totalFloors: handleNumberInput(e.target.value) })
            }}
            error={!!errors.totalFloors}
            helperText={errors.totalFloors?.message}
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
            onChange={(e) => {
              setProperty({ room: handleNumberInput(e.target.value) })
            }}
            error={!!errors.room}
            helperText={errors.room?.message}
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
            onChange={(e) => {
              setProperty({ livingRoom: handleNumberInput(e.target.value) })
            }}
            error={!!errors.livingRoom}
            helperText={errors.livingRoom?.message}
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
            onChange={(e) => {
              setProperty({ bathroom: handleNumberInput(e.target.value) })
            }}
            error={!!errors.bathroom}
            helperText={errors.bathroom?.message}
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
            onChange={(e) => {
              setProperty({ balcony: handleNumberInput(e.target.value) })
            }}
            error={!!errors.balcony}
            helperText={errors.balcony?.message}
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
        <SaleHouseInfoSetting ref={saleHouseRef} />
      )}
      {publishType === 'rent' && (
        <RentHouseInfoSetting ref={rentHouseRef} />
      )}
    </div>
  );
});

InfoSetting.displayName = 'InfoSetting';

export default InfoSetting;
