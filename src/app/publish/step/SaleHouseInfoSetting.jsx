import { useMemo, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import FieldGroup from './FieldGroup';
import usePublishStore from '@/store/usePublishStore';

import {
  ElevatorOptions,
  ParkingOptions,
  LegalUsageOptions,
  CurrentStatusOptions,
  LeaseStatusOptions,
  handleNumberInput
} from '../publishHelper';

import { getDecorLevelsApi } from '../actions';

const saleHouseSchema = yup.object().shape({
  mainBuildingArea: yup
    .number()
    .typeError('請輸入主建物坪數')
    .required('請輸入主建物坪數')
    .min(0, '主建物坪數不可為負數'),
  accessoryBuildingArea: yup
    .number()
    .typeError('請輸入附屬建物坪數')
    .required('請輸入附屬建物坪數')
    .min(0, '附屬建物坪數不可為負數'),
  publicFacilityArea: yup
    .number()
    .typeError('請輸入公共設施坪數')
    .required('請輸入公共設施坪數')
    .min(0, '公共設施坪數不可為負數'),
  legalUsage: yup.string().required('請選擇法定用途'),
  status: yup.string().required('請選擇物件現況'),
  decorLevelId: yup.string().required('請選擇裝潢程度'),
  totalPrice: yup
    .number()
    .typeError('請輸入物件總價')
    .required('請輸入物件總價')
    .min(1, '物件總價必須大於0'),
});

const SaleHouseInfoSetting = forwardRef((props, ref) => {
  const { property, setProperty, salesInfo, setSalesInfo } = usePublishStore();

  const {
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(saleHouseSchema),
    values: {
      mainBuildingArea: salesInfo.mainBuildingArea,
      accessoryBuildingArea: salesInfo.accessoryBuildingArea,
      publicFacilityArea: salesInfo.publicFacilityArea,
      legalUsage: salesInfo.legalUsage,
      status: salesInfo.status,
      decorLevelId: property.decorLevelId,
      totalPrice: salesInfo.totalPrice,
    },
  });

  useImperativeHandle(ref, () => ({
    trigger,
    errors
  }));

  const handleSalesInfoChange = async (field, value) => {
    setSalesInfo({
      ...salesInfo,
      [field]: value,
    });
    setValue(field, value);
    // await trigger(field);
  };

  const handlePropertyChange = async (field, value) => {
    setProperty({
      ...property,
      [field]: value,
    });
    setValue(field, value);
    // await trigger(field);
  };

  const buildingRegistrationArea = useMemo(() => {
    const mainBuilding = parseInt(salesInfo.mainBuildingArea);
    const accessoryBuilding = parseInt(salesInfo.accessoryBuildingArea);
    const publicFacility = parseInt(salesInfo.publicFacilityArea);

    return (mainBuilding + accessoryBuilding + publicFacility);
  }, [salesInfo.mainBuildingArea, salesInfo.accessoryBuildingArea, salesInfo.publicFacilityArea]);
  
      
  // 裝潢程度
  const { data: decorLevelsOptions } = useQuery({
    queryKey: ['getDecorLevelsApi'],
    queryFn: getDecorLevelsApi,
  });

  return <>
  <FieldGroup title="物件細項">
    <div className="flex items-center gap-2">
      <TextField
        id="mainBuildingArea"
        value={salesInfo.mainBuildingArea}
        onChange={(e) => {
          handleSalesInfoChange('mainBuildingArea', handleNumberInput(e.target.value))}}
        error={!!errors.mainBuildingArea}
        helperText={errors.mainBuildingArea?.message || ' '}
        placeholder="請輸入坪數"
        sx={{ 
          width: '302px',
          '& .MuiFormHelperText-root': {
            minHeight: '20px',
          }
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                主建物坪數 ＊
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">坪</InputAdornment>
            ),
          },
        }}
      />
      ＋
      <TextField
        type="number"
        id="accessoryBuildingArea"
        value={salesInfo.accessoryBuildingArea}
        onChange={(e) => {
          handleSalesInfoChange('accessoryBuildingArea', handleNumberInput(e.target.value))}}
        error={!!errors.accessoryBuildingArea}
        helperText={errors.accessoryBuildingArea?.message || ' '}
        placeholder="請輸入坪數"
        sx={{ 
          width: '302px',
          '& .MuiFormHelperText-root': {
            minHeight: '20px',
          }
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                附屬建物坪數 ＊
              </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">坪</InputAdornment>
              ),
            },
          }}
      />
      ＋
      <TextField
        type="number"
        id="publicFacilityArea"
        value={salesInfo.publicFacilityArea}
        onChange={(e) => {
          handleSalesInfoChange('publicFacilityArea', handleNumberInput(e.target.value))}}
        error={!!errors.publicFacilityArea}
        helperText={errors.publicFacilityArea?.message || ' '}
        placeholder="請輸入坪數"
        sx={{ 
          width: '302px',
          '& .MuiFormHelperText-root': {
            minHeight: '20px',
          }
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                公共設施坪數 ＊
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">坪</InputAdornment>
              ),
            },
          }}
      />
      ＝
      <TextField
        type="number"
        id="ownership"
        disabled
        value={buildingRegistrationArea}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                建物登記坪數
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">坪</InputAdornment>
              ),
            },
          }}
      />
    </div>
    <div className="flex gap-10">
      <FormControl sx={{ width: 300 }} error={!!errors.legalUsage}>
        <InputLabel  sx={{ bgcolor: 'white' }}>法定用途＊</InputLabel>
        <Select
          id="legalUsage"
          value={salesInfo.legalUsage}
          onChange={(e) => handleSalesInfoChange('legalUsage', e.target.value)}
        >
          {LegalUsageOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.legalUsage?.message || ' '}</FormHelperText>
      </FormControl>
      <FormControlLabel control={<Checkbox
        checked={salesInfo.hiddenLegalUsage}
        onChange={(e) => setSalesInfo({ hiddenLegalUsage: !salesInfo.hiddenLegalUsage })}
      />} label="隱藏詳細用途" />
    </div>
    <FormControl sx={{ width: 300 }} error={!!errors.status}>
      <InputLabel  sx={{ bgcolor: 'white' }}>物件現況＊</InputLabel>
      <Select
        id="status"
        value={salesInfo.status}
        onChange={(e) => handleSalesInfoChange('status', e.target.value)}
      >
        {CurrentStatusOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors.status?.message || ' '}</FormHelperText>
    </FormControl>
    <div className="flex gap-2">
      <TextField
        type="number"
        id="age"
        value={property.age}
        onChange={(e) => {
          handlePropertyChange('age', handleNumberInput(e.target.value))
        }}
        placeholder="請輸入屋齡"
        sx={{ width: '302px' }}
        slotProps={{  
          input: {
            startAdornment: (
              <InputAdornment position="start">屋齡</InputAdornment>
            ),
          endAdornment: (
            <InputAdornment position="end">年</InputAdornment>
              ),
            },
          }}
      />
      <FormControl sx={{ minWidth: 196 }} error={!!errors.decorLevelId}>
        <InputLabel  sx={{ bgcolor: 'white' }}>裝潢程度＊</InputLabel>
        <Select
          value={property.decorLevelId}
          onChange={(e) => handlePropertyChange('decorLevelId', e.target.value)}
          id="decorLevelId"
        >
          {decorLevelsOptions?.map((item) => (
            <MenuItem key={item.value} value={item.id}>
              {item.displayName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.decorLevelId?.message || ' '}</FormHelperText>
      </FormControl>
    </div>
    <div className="flex gap-10">
      <TextField
        type="number"
        id="managementFee"
        value={salesInfo.managementFee}
        onChange={(e) => {
          setSalesInfo({ managementFee: handleNumberInput(e.target.value) })}
        }
        placeholder="請輸入管理費"
        sx={{ width: '302px' }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">管理費</InputAdornment>
            ),
          endAdornment: (
            <InputAdornment position="end">元/月</InputAdornment>
              ),
            },
          }}
      />
      <FormControlLabel control={<Checkbox />} label="無" />
    </div>
    <div className="flex gap-2">
      <FormControl className="w-[168px]">
        <InputLabel  sx={{ bgcolor: 'white' }}>帶租約</InputLabel>
        <Select
          id="leaseStatus"
          value={salesInfo.leaseStatus}
          onChange={(e) => setSalesInfo({ leaseStatus: e.target.value })}
        >
          {LeaseStatusOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-[168px]">
        <InputLabel  sx={{ bgcolor: 'white' }}>電梯</InputLabel>
        <Select
          id="elevator"
          value={property.hasElevator}
          onChange={(e) =>
            setProperty({
              hasElevator: !property.hasElevator,
            })
          }
        >
          {ElevatorOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-[168px]">
        <InputLabel  sx={{ bgcolor: 'white' }}>車位</InputLabel>
        <Select
          id="parkingSpace"
          value={property.parkingSpace}
          onChange={(e) =>
            setProperty({
              parkingSpace: !property.parkingSpace,
            })
          }
        >
          {ParkingOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  </FieldGroup>
  <FieldGroup title="物件總價">
    <TextField
      type="number"
      id="totalPrice"
      value={salesInfo.totalPrice}
      onChange={(e) => {
        handleSalesInfoChange('totalPrice', handleNumberInput(e.target.value))
      }}
      error={!!errors.totalPrice}
      helperText={errors.totalPrice?.message || ' '}
      placeholder="請輸入物件總價"
      sx={{ width: '302px' }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">物件總價＊</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">元</InputAdornment>
          ),
        },
      }}
    />
  </FieldGroup>
  </>;
});

SaleHouseInfoSetting.displayName = 'SaleHouseInfoSetting';

export default SaleHouseInfoSetting;
