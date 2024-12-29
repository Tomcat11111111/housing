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
  const { infoSettings, setInfoSettings, rentalInfo, setRentalInfo, property, setProperty } = usePublishStore();

  // const { 
  //   squareMeters,
  //   direction,
  //   facilities,
  //   furnitures,
  //   wallMaterial,
  //   decorLevel,
  //   elevator,
  //   rentPrice,
  //   deposit,
  //   rentIncludes,
  //   electricityFee,
  //   managementFee,
  //   minRentPeriod,
  //   parkingSpace,
  //   identityRequirements,
  //   genderRequirement,
  //   landlordLiveIn,
  //   cooking,
  //   pets,
  //   availableDate
  // } = infoSettings;

  return (
    <>
      <FieldGroup title="物件細項">
        <TextField
          type="number"
          value={property.squareMeters}
          onChange={(e) => setProperty({ squareMeters: e.target.value })}
          placeholder="請輸入坪數"
          sx={{ width: '302px' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">物件坪數 ＊</InputAdornment>,
              endAdornment: <InputAdornment position="end">坪</InputAdornment>,
            },
          }}
        />
        <FormGroup className='flex gap-4'>
          <div className="flex flex-wrap gap-4 items-center">
          <FormLabel>提供設備</FormLabel>
          {FacilityOptions.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={rentalInfo.offerIds?.includes(item.value)}
                  onChange={(e) => {
                    const newEquipmentIds = e.target.checked
                      ? [...(rentalInfo.offerIds || []), item.value]
                      : rentalInfo.offerIds?.filter(v => v !== item.value);
                    setRentalInfo({ offerIds: newEquipmentIds });
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
              setRentalInfo({
                offerIds: e.target.checked ? FacilityOptions.map(item => item.value) : []
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
                    checked={rentalInfo.offerIds?.includes(item.value)}
                    onChange={(e) => {
                      const newFurnitureIds = e.target.checked
                        ? [...(rentalInfo.offerIds || []), item.value]
                        : rentalInfo.offerIds?.filter(v => v !== item.value);
                      setRentalInfo({ offerIds: newFurnitureIds });
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
                setRentalInfo({
                  offerIds: e.target.checked ? FurnitureOptions.map(item => item.value) : []
                });
              }}
            />
          </div>
        </FormGroup>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>隔間材質＊</InputLabel>
          <Select
            value={property.decorLevelId}
            onChange={(e) => setProperty({ decorLevelId: e.target.value })}
            label="隔間材質"
          >
            {DecorLevelOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>裝潢程度＊</InputLabel>
          <Select
            value={property.decorLevelId}
            onChange={(e) => setProperty({ decorLevelId: e.target.value })}
            label="裝潢程度"
          >
            {DecorLevelOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>電梯</InputLabel>
          <Select
            value={property.hasElevator}
            onChange={(e) => setProperty({ hasElevator: e.target.value })}
            label="電梯"
          >
            {ElevatorOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FieldGroup>
      <FieldGroup title="物件租金/押金">
        <TextField
          type="number"
          value={rentalInfo.price}
          onChange={(e) => setRentalInfo({ price: e.target.value })}
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
          value={rentalInfo.depositMonths}
          onChange={(e) => setRentalInfo({ depositMonths: e.target.value })}
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
                  checked={rentalInfo.includedInRentIds?.includes(item.value)}
                  onChange={(e) => {
                    //TODO: 若車位勾起，則下方
                    const newIncludes = e.target.checked
                      ? [...(rentalInfo.includedInRentIds || []), item.value]
                      : rentalInfo.includedInRentIds?.filter(v => v !== item.value);
                    setRentalInfo({ includedInRentIds: newIncludes });
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
                  setRentalInfo({
                    includedInRentIds: e.target.checked 
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
          value={rentalInfo.electricityFee}
          onChange={(e) => setRentalInfo({ electricityFee: e.target.value })}
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
          value={rentalInfo.managementFee}
          onChange={(e) => setRentalInfo({ managementFee: e.target.value })}
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
          value={rentalInfo.minRentPeriod}
          onChange={(e) => setRentalInfo({ minRentPeriod: e.target.value })}
          placeholder="請輸入最短租期"
          sx={{ width: '302px' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">最短租期</InputAdornment>,
              endAdornment: <InputAdornment position="end">個月</InputAdornment>,
            },
          }}
        />
        <div className="flex flex-wrap gap-4 items-center">
          <FormControl sx={{ width: 300 }}>
            <InputLabel>車位</InputLabel>
            <Select
              value={rentalInfo.parkingSpace}
              onChange={(e) => {
                if(e.target.value === '無') {
                  setRentalInfo({ parkingSpace: null });
                  setProperty({ hasParking: false });
                } else {
                  setRentalInfo({ parkingSpace: e.target.value });
                  setProperty({ hasParking: true });
                }
              }}
              label="車位"
            >
              {ParkingOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            value={rentalInfo.managementFee}
            onChange={(e) => setRentalInfo({ managementFee: e.target.value })}
            placeholder="車位費"
            sx={{ width: '302px' }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">車位費</InputAdornment>,
                endAdornment: <InputAdornment position="end">元/月</InputAdornment>,
              },
            }}
          />
        </div>
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
                  checked={rentalInfo.ruleIds?.includes(item.value)}
                  onChange={(e) => {
                    const newIdentities = e.target.checked
                      ? [...(rentalInfo.ruleIds || []), item.value]
                      : rentalInfo.ruleIds?.filter(v => v !== item.value);
                    setRentalInfo({ ruleIds: newIdentities });
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
                  setRentalInfo({
                    ruleIds: e.target.checked 
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
      {/* <div className="flex gap-10">
        <FormControl>
          <FormLabel>性別要求</FormLabel>
          <RadioGroup
            value={rentalInfo.genderRequirement}
            onChange={(e) => setRentalInfo({ genderRequirement: e.target.value })}
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
            value={rentalInfo.landlordLiveIn}
            onChange={(e) => setRentalInfo({ landlordLiveIn: e.target.value })}
          >
            <FormControlLabel value="yes" control={<Radio />} label="是" />
            <FormControlLabel value="no" control={<Radio />} label="否" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>開伙</FormLabel>
          <RadioGroup
            value={rentalInfo.cooking}
            onChange={(e) => setRentalInfo({ cooking: e.target.value })}
          >
            <FormControlLabel value="yes" control={<Radio />} label="可以" />
            <FormControlLabel value="no" control={<Radio />} label="不可以" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>養寵物</FormLabel>
          <RadioGroup
            value={rentalInfo.pets}
            onChange={(e) => setRentalInfo({ pets: e.target.value })}
          >
            <FormControlLabel value="yes" control={<Radio />} label="可以" />
            <FormControlLabel value="no" control={<Radio />} label="不可以" />
          </RadioGroup>
        </FormControl>
      </div> */}
      <DatePicker
        label="可遷入日期"
        value={rentalInfo.moveInDate}
        onChange={(newValue) => setRentalInfo({ moveInDate: newValue })}
      />
      </FieldGroup>
    </>
  );
};

export default RentHouseInfoSetting;
