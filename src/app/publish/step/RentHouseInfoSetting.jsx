import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  InputAdornment,
  FormLabel,
  RadioGroup,
  Radio,
  FormGroup,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import usePublishStore from '@/store/usePublishStore';

import {
  DirectionOptions,
  FacilityOptions,
  FurnitureOptions,
  WallMaterialOptions,
  DecorLevelOptions,
  ElevatorOptions,
  IdentityOptions,
  GenderOptions,
  ParkingOptions,
  RentIncludeOptions,
  DepositOptions,
} from './publishHelper';

import { DIRECTION_OPTIONS } from '@/utils/tools';

import FieldGroup from './FieldGroup';


const RentHouseInfoSetting = () => {
  const { infoSettings, setInfoSettings } = usePublishStore();
  const { 
    squareMeters,
    direction,
    facilities,
    furnitures,
    wallMaterial,
    decorLevel,
    elevator,
    rentPrice,
    deposit,
    rentIncludes,
    electricityFee,
    managementFee,
    minRentPeriod,
    parkingSpace,
    identityRequirements,
    genderRequirement,
    landlordLiveIn,
    cooking,
    pets,
    availableDate
  } = infoSettings;

  return (
    <>
      <FieldGroup title="物件細項">
        <TextField
          type="number"
          value={squareMeters}
          onChange={(e) => setInfoSettings({ squareMeters: e.target.value })}
          placeholder="請輸入坪數"
          sx={{ width: '302px' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">物件坪數 ＊</InputAdornment>,
              endAdornment: <InputAdornment position="end">坪</InputAdornment>,
            },
          }}
        />
        <FormControl sx={{ width: 300 }}>
          <InputLabel>物件朝向＊</InputLabel>
          <Select
            value={direction}
            onChange={(e) => setInfoSettings({ direction: e.target.value })}
            label="物件朝向"
          >
            {DIRECTION_OPTIONS.map((item) => (
              <MenuItem key={item.value} value={item.value}>{item.displayName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup className='flex gap-4'>
          <div className="flex flex-wrap gap-4 items-center">
          <FormLabel>提供設備</FormLabel>
          {FacilityOptions.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={facilities?.includes(item.value)}
                  onChange={(e) => {
                    const newFacilities = e.target.checked
                      ? [...(facilities || []), item.value]
                      : facilities?.filter(v => v !== item.value);
                    setInfoSettings({ facilities: newFacilities });
                  }}
                />
              }
              label={item.text}
            />
          ))}
          <FormControlLabel
            control={<Checkbox />}
            label="全選"
            onChange={(e) => {
              setInfoSettings({
                facilities: e.target.checked ? FacilityOptions.map(item => item.value) : []
              });
            }}
          />
          </div>
        </FormGroup>
        <FormGroup>
        <div className="flex flex-wrap gap-4 items-center">

          <FormLabel>提供傢俱</FormLabel>
          {FurnitureOptions.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={facilities?.includes(item.value)}
                  onChange={(e) => {
                    const newFacilities = e.target.checked
                      ? [...(facilities || []), item.value]
                      : facilities?.filter(v => v !== item.value);
                    setInfoSettings({ facilities: newFacilities });
                  }}
                />
              }
              label={item.text}
            />
          ))}
          <FormControlLabel
            control={<Checkbox />}
            label="全選"
            onChange={(e) => {
              setInfoSettings({
                facilities: e.target.checked ? FurnitureOptions.map(item => item.value) : []
              });
            }}
          />
        </div>
        </FormGroup>
      </FieldGroup>
      <FieldGroup title="物件租金/押金">
        <TextField
          type="number"
          value={rentPrice}
          onChange={(e) => setInfoSettings({ rentPrice: e.target.value })}
          placeholder="請輸入租金"
          sx={{ width: '302px' }}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">租金 ＊</InputAdornment>,
            endAdornment: <InputAdornment position="end">元/月</InputAdornment>,
          },
        }}
      />

      <FormControl sx={{ width: 300 }}>
        <InputLabel>押金＊</InputLabel>
        <Select
          value={deposit}
          onChange={(e) => setInfoSettings({ deposit: e.target.value })}
          label="押金"
        >
          {DepositOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </FieldGroup>
    <FieldGroup title="租金細項">
      <FormGroup>
        <div className="flex flex-wrap gap-4 items-center">
        <FormLabel>租金包含</FormLabel>
          {RentIncludeOptions.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={rentIncludes?.includes(item.value)}
                  onChange={(e) => {
                    const newIncludes = e.target.checked
                      ? [...(rentIncludes || []), item.value]
                      : rentIncludes?.filter(v => v !== item.value);
                    setInfoSettings({ rentIncludes: newIncludes });
                  }}
                />
              }
              label={item.text}
            />
          ))}
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setInfoSettings({
                    rentIncludes: e.target.checked 
                      ? RentIncludeOptions.map(item => item.value)
                      : []
                  });
                }}
              />
            }
            label="全選"
          />
        </div>
      </FormGroup>
        <TextField
          type="number"
          value={electricityFee}
          onChange={(e) => setInfoSettings({ electricityFee: e.target.value })}
          placeholder="請輸入電費"
          sx={{ width: '302px' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">電費</InputAdornment>,
              endAdornment: <InputAdornment position="end">元/度</InputAdornment>,
            },
          }}
        />
        <TextField
          type="number"
          value={managementFee}
          onChange={(e) => setInfoSettings({ managementFee: e.target.value })}
          placeholder="請輸入管理費"
          sx={{ width: '302px' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">管理費</InputAdornment>,
              endAdornment: <InputAdornment position="end">元/月</InputAdornment>,
            },
          }}
        />
        <TextField
          type="number"
          value={minRentPeriod}
          onChange={(e) => setInfoSettings({ minRentPeriod: e.target.value })}
          placeholder="請輸入最短租期"
          sx={{ width: '302px' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">最短租期</InputAdornment>,
              endAdornment: <InputAdornment position="end">個月</InputAdornment>,
            },
          }}
        />
        <FormControl sx={{ width: 300 }}>
          <InputLabel>車位</InputLabel>
          <Select
            value={parkingSpace}
            onChange={(e) => setInfoSettings({ parkingSpace: e.target.value })}
            label="車位"
          >
            {ParkingOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </FieldGroup>
    <FieldGroup title="租屋規則">
      <FormGroup>
        <FormLabel>身份要求</FormLabel>
        <div className="flex flex-wrap gap-4">
          {IdentityOptions.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={identityRequirements?.includes(item.value)}
                  onChange={(e) => {
                    const newIdentities = e.target.checked
                      ? [...(identityRequirements || []), item.value]
                      : identityRequirements?.filter(v => v !== item.value);
                    setInfoSettings({ identityRequirements: newIdentities });
                  }}
                />
              }
              label={item.text}
            />
          ))}
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setInfoSettings({
                    identityRequirements: e.target.checked 
                      ? IdentityOptions.map(item => item.value)
                      : []
                  });
                }}
              />
            }
            label="全選"
          />
        </div>
      </FormGroup>

      <div className="flex gap-10">
        <FormControl>
          <FormLabel>性別要求</FormLabel>
          <RadioGroup
            value={genderRequirement}
            onChange={(e) => setInfoSettings({ genderRequirement: e.target.value })}
          >
            {GenderOptions.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.text}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>房東同住</FormLabel>
          <RadioGroup
            value={landlordLiveIn}
            onChange={(e) => setInfoSettings({ landlordLiveIn: e.target.value })}
          >
            <FormControlLabel value="yes" control={<Radio />} label="是" />
            <FormControlLabel value="no" control={<Radio />} label="否" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>開伙</FormLabel>
          <RadioGroup
            value={cooking}
            onChange={(e) => setInfoSettings({ cooking: e.target.value })}
          >
            <FormControlLabel value="yes" control={<Radio />} label="可以" />
            <FormControlLabel value="no" control={<Radio />} label="不可以" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>養寵物</FormLabel>
          <RadioGroup
            value={pets}
            onChange={(e) => setInfoSettings({ pets: e.target.value })}
          >
            <FormControlLabel value="yes" control={<Radio />} label="可以" />
            <FormControlLabel value="no" control={<Radio />} label="不可以" />
          </RadioGroup>
        </FormControl>
      </div>

      <DatePicker
        label="可遷入日期"
        value={availableDate}
        onChange={(newValue) => setInfoSettings({ availableDate: newValue })}
      />
      </FieldGroup>
    </>
  );
};

export default RentHouseInfoSetting;
