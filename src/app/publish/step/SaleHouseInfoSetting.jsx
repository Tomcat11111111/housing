import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Checkbox,
} from '@mui/material';

import FieldGroup from './FieldGroup';
import usePublishStore from '@/store/publishStore';

import {
  ElevatorOptions,
  ParkingOptions,
} from './InfoSettingHelper';

const SaleHouseInfoSetting = () => {
  const { infoSettings, setInfoSettings } = usePublishStore();
  const { squareMeters, subSquareMeters, enrollSquareMeters, decorLevelId, age, totalPrice, parkingSpace, elevator } = infoSettings;

  return <>
  <FieldGroup title="物件細項">
    <div className="flex items-center gap-2">
      <TextField
        type="number"
        id="contacts"
        value={squareMeters}
        onChange={(e) => setInfoSettings({ squareMeters: e.target.value })}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              主建物坪數 ＊
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">坪</InputAdornment>
          ),
        }}
      />
      ＋
      <TextField
        type="number"
        id="contacts"
        value={subSquareMeters}
        onChange={(e) => setInfoSettings({ subSquareMeters: e.target.value })}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              附屬建物坪數 ＊
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">坪</InputAdornment>
          ),
        }}
      />
      ＋
      <TextField
        type="number"
        id="contacts"
        value={subSquareMeters}
        onChange={(e) => setInfoSettings({ subSquareMeters: e.target.value })}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              公共設施坪數 ＊
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">坪</InputAdornment>
          ),
        }}
      />
      ＝
      <TextField
        type="number"
        id="contacts"
        value={enrollSquareMeters}
        placeholder="請輸入坪數"
        sx={{ width: '302px' }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              建物登記坪數
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">坪</InputAdornment>
          ),
        }}
      />
    </div>
    <div className="flex gap-10">
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-select-small-label">法定用途＊</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          // value={age}
          // onChange={handleChange}
          label="Age"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel control={<Checkbox />} label="隱藏詳細用途" />
    </div>
    <FormControl sx={{ width: 300 }}>
      <InputLabel id="demo-select-small-label">物件現況＊</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // value={age}
        // onChange={handleChange}
        label="Age"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
    <div className="flex gap-2">
      <TextField
        type="number"
        id="contacts"
        value={age}
        onChange={(e) => setInfoSettings({ age: e.target.value })}
        placeholder="請輸入屋齡"
        sx={{ width: '302px' }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">屋齡</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">年</InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ minWidth: 196 }}>
        <InputLabel id="demo-select-small-label">裝潢程度＊</InputLabel>
        <Select
          value={decorLevelId}
          onChange={(e) => setInfoSettings({ decorLevelId: e.target.value })}
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Age"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div className="flex gap-10">
      <TextField
        type="number"
        id="contacts"
        placeholder="請輸入管理費"
        sx={{ width: '302px' }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">管理費</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">元/月</InputAdornment>
          ),
        }}
      />
      <FormControlLabel control={<Checkbox />} label="無" />
    </div>
    <div className="flex gap-2">
      <FormControl className="w-[168px]">
        <InputLabel id="demo-select-small-label">帶租約</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Age"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="w-[168px]">
        <InputLabel id="demo-select-small-label">電梯</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={elevator}
          label="Age"
          onChange={(e) =>
            setInfoSettings({
              elevator: e.target.value,
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
        <InputLabel id="demo-select-small-label">車位</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={parkingSpace}
          label="Age"
          onChange={(e) =>
            setInfoSettings({
              parkingSpace: e.target.value,
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
      id="contacts"
      value={totalPrice}
      onChange={(e) => setInfoSettings({ totalPrice: e.target.value })}
      placeholder="請輸入物件總價"
      sx={{ width: '302px' }}
      slotProps={{
        startAdornment: (
          <InputAdornment position="start">物件總價＊</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">元</InputAdornment>
        ),
      }}
    />
  </FieldGroup>
</>;
};

export default SaleHouseInfoSetting;
