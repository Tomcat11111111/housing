import { useMemo } from 'react';

import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
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
} from '../publishHelper';

import { getDecorLevelsApi } from '../actions';

const SaleHouseInfoSetting = () => {
  const {  property, setProperty, salesInfo, setSalesInfo } = usePublishStore();

  const buildingRegistrationArea = useMemo(() => {
    return (salesInfo.mainBuildingArea + salesInfo.accessoryBuildingArea + salesInfo.publicFacilityArea);
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
        type="number"
        id="contacts"
        value={salesInfo.mainBuildingArea}
        onChange={(e) => setSalesInfo({ mainBuildingArea: e.target.value })}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
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
        id="contacts"
        value={salesInfo.accessoryBuildingArea}
        onChange={(e) => setInfoSettings({ accessoryBuildingArea: e.target.value })}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
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
        onChange={(e) => setSalesInfo({ publicFacilityArea: e.target.value })}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
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
      <FormControl sx={{ width: 300 }}>
        <InputLabel>法定用途＊</InputLabel>
        <Select
          id="legalUsage"
          value={salesInfo.legalUsage}
          onChange={(e) => setSalesInfo({ legalUsage: e.target.value })}
        >
          {LegalUsageOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel control={<Checkbox
        checked={salesInfo.hiddenLegalUsage}
        onChange={(e) => setSalesInfo({ hiddenLegalUsage: !salesInfo.hiddenLegalUsage })}
      />} label="隱藏詳細用途" />
    </div>
    <FormControl sx={{ width: 300 }}>
      <InputLabel>物件現況＊</InputLabel>
      <Select
        id="status"
        value={salesInfo.status}
        onChange={(e) => setSalesInfo({ status: e.target.value })}
      >
        {CurrentStatusOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <div className="flex gap-2">
      <TextField
        type="number"
        id="age"
        value={property.age}
        onChange={(e) => setProperty({ age: e.target.value })}
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
      <FormControl sx={{ minWidth: 196 }}>
        <InputLabel>裝潢程度＊</InputLabel>
        <Select
          value={property.decorLevelId}
          onChange={(e) => setProperty({ decorLevelId: e.target.value })}
          id="decorLevelId"
        >
          {decorLevelsOptions?.map((item) => (
            <MenuItem key={item.value} value={item.id}>
              {item.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <div className="flex gap-10">
      <TextField
        type="number"
        id="managementFee"
        value={salesInfo.managementFee}
        onChange={(e) => setSalesInfo({ managementFee: e.target.value })}
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
        <InputLabel>帶租約</InputLabel>
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
        <InputLabel>電梯</InputLabel>
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
        <InputLabel>車位</InputLabel>
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
      onChange={(e) => setSalesInfo({ totalPrice: e.target.value })}
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
};

export default SaleHouseInfoSetting;
