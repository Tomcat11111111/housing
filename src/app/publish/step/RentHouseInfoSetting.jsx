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
  TextField,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import usePublishStore from '@/store/usePublishStore';

import {
  ElevatorOptions,
  IdentityOptions,
  GenderOptions,
  ParkingOptions,
  DepositOptions,
  getIncludedInRentApi,
  getDecorLevelsApi,
  getEquipmentApi,
  getFurnitureApi,
  getMaterialsApi,
  getRulesApi,
} from './publishHelper';

import FieldGroup from './FieldGroup';


const RentHouseInfoSetting = () => {
  const { rentalInfo, setRentalInfo, property, setProperty } = usePublishStore();

   
    // 提供設備
    const { data: equipmentOptions } = useQuery({
      queryKey: ['getEquipmentApi'],
      queryFn: getEquipmentApi,
    });
    
      // 提供家具
      const { data: furnitureOptions } = useQuery({
        queryKey: ['getFurnitureApi'],
        queryFn: getFurnitureApi,
      });

      // 隔間材質
      const { data: materialsOptions } = useQuery({
        queryKey: ['getMaterialsApi'],
        queryFn: getMaterialsApi,
      });

      
        // 裝潢程度
        const { data: decorLevelsOptions } = useQuery({
          queryKey: ['getDecorLevelsApi'],
          queryFn: getDecorLevelsApi,
        });

    // 租金內含
    const { data: includedInRentOptions } = useQuery({
      queryKey: ['getIncludedInRentApi'],
      queryFn: getIncludedInRentApi,
    });
 
    // 租屋規則
    const { data: rulesOptions } = useQuery({
      queryKey: ['getRulesApi'],
      queryFn: getRulesApi,
    });

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
          {equipmentOptions?.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={rentalInfo.offerIds?.includes(item.id)}
                  onChange={(e) => {
                    const newEquipmentIds = e.target.checked
                      ? [...(rentalInfo.offerIds || []), item.id]
                      : rentalInfo.offerIds?.filter(v => v !== item.id);

                    setRentalInfo({ offerIds: newEquipmentIds });
                  }}
                />
              }
              label={item.displayName}
            />
          ))}
          <Button 
            variant="outlined" 
            onClick={() => {
              setRentalInfo({
                offerIds: [
                  ...(rentalInfo.offerIds || []), 
                  ...equipmentOptions?.map(item => item.id)
                ]
              });
            }}>
            全選
          </Button>
          </div>
        </FormGroup>
        <FormGroup>
          <div className="flex flex-wrap gap-4 items-center">
            <FormLabel>提供傢俱</FormLabel>
            {furnitureOptions?.map((item) => (
              <FormControlLabel
                key={item.value}
                control={
                  <Checkbox
                    checked={rentalInfo.offerIds?.includes(item.id)}
                    onChange={(e) => {
                      const newFurnitureIds = e.target.checked
                        ? [...(rentalInfo.offerIds || []), item.id]
                        : rentalInfo.offerIds?.filter(v => v !== item.id);
                      setRentalInfo({ offerIds: newFurnitureIds });
                    }}
                  />
                }
                label={item.displayName}
              />
            ))}
            <Button variant="outlined" onClick={() => {
              setRentalInfo({
                offerIds: [
                  ...(rentalInfo.offerIds || []), 
                  ...furnitureOptions?.map(item => item.id)
                ]
              });
            }}>
              全選
            </Button>
          </div>
        </FormGroup>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>隔間材質＊</InputLabel>
          <Select
            value={property.materialId}
            onChange={(e) => setProperty({ materialId: e.target.value })}
            label="隔間材質"
          >
            {materialsOptions?.map((item) => (
              <MenuItem key={item.value} value={item.id}>{item.displayName}</MenuItem>
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
            {decorLevelsOptions?.map((item) => (
              <MenuItem key={item.value} value={item.id}>{item.displayName}</MenuItem>
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
          {includedInRentOptions?.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={rentalInfo.includedInRentIds?.includes(item.id)}
                  onChange={(e) => {
                    const newIncludes = e.target.checked
                      ? [...(rentalInfo.includedInRentIds || []), item.id]
                      : rentalInfo.includedInRentIds?.filter(v => v !== item.id);
                    setRentalInfo({ includedInRentIds: newIncludes });
                  }}
                />
              }
              label={item.displayName}
            />
          ))}
          <Button 
            variant="outlined"
            onClick={() => {
              setRentalInfo({
                includedInRentIds: includedInRentOptions.map(item => item.id)
                  ? includedInRentOptions.map(item => item.id)
                  : []
                });
              }}>
                全選
            </Button>
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
        <div className="flex flex-wrap gap-6 items-center">
        <FormLabel className="w-[67px]">身份要求</FormLabel>
          {IdentityOptions.map((item) => (
            <FormControlLabel
              key={item.value}
              className="mx-0 w-[120px]"
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
          <Button variant="outlined" onClick={() => {
            setRentalInfo({
              ruleIds: IdentityOptions.map(item => item.value)
                  ? IdentityOptions.map(item => item.value)
                  : []
              });
            }}>
              全選
            </Button>
        </div>
      </FormGroup>
        <FormControl>
          <div className="flex gap-6 items-center">
            <FormLabel className="w-[67px]">性別要求</FormLabel>
            <RadioGroup
              value={rentalInfo.genderRequirement}
            onChange={(e) => setRentalInfo({ genderRequirement: e.target.value })}
          >
            <div className="flex gap-6 items-center">
            {GenderOptions.map((item) => (
              <FormControlLabel
                key={item.value}
                className="mx-0 w-[120px]"
                value={item.value}
                control={<Radio />}
                label={item.text}
              />
            ))}
            </div>
            </RadioGroup>
          </div>
        </FormControl>
        <FormControl>
        <div className="flex gap-6 items-center">
          <FormLabel className="w-[67px]">房東同住</FormLabel>
          <RadioGroup
            value={rentalInfo.landlordLiveIn}
            onChange={(e) => setRentalInfo({ landlordLiveIn: e.target.value })}
          >
          <div className="flex gap-6 items-center">
            <FormControlLabel className="mx-0 w-[100px]" value="yes" control={<Radio />} label="是" />
            <FormControlLabel className="mx-0 w-[100px]" value="no" control={<Radio />} label="否" />
            </div>
            </RadioGroup>
          </div>
        </FormControl>
        <FormControl>
          <div className="flex gap-6 items-center">
            <FormLabel className="w-[67px]">開伙</FormLabel>
          <RadioGroup
            value={rentalInfo.cooking}
            onChange={(e) => setRentalInfo({ cooking: e.target.value })}
          >
            <div className="flex gap-6 items-center">
              <FormControlLabel className="mx-0 w-[100px]" value="yes" control={<Radio />} label="可以" />
              <FormControlLabel className="mx-0 w-[100px]" value="no" control={<Radio />} label="不可以" />
            </div>
            </RadioGroup>
          </div>
        </FormControl>

        <FormControl>
          <div className="flex gap-6 items-center">
          <FormLabel className="w-[67px]">養寵物</FormLabel>
          <RadioGroup
            value={rentalInfo.pets}
            onChange={(e) => setRentalInfo({ pets: e.target.value })}
          >
          <div className="flex gap-6 items-center">
            <FormControlLabel className="mx-0 w-[100px]" value="yes" control={<Radio />} label="可以" />
            <FormControlLabel className="mx-0 w-[100px]" value="no" control={<Radio />} label="不可以" />
          </div>
          </RadioGroup>
          </div>
        </FormControl>
      <DatePicker
        className="w-[232px]"
        label="可遷入日期"
        value={rentalInfo.moveInDate}
        onChange={(newValue) => setRentalInfo({ moveInDate: newValue })}
        placeholder="請選擇日期"
      />
      </FieldGroup>
    </>
  );
};

export default RentHouseInfoSetting;
