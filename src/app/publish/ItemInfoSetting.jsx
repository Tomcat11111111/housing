import { useState } from 'react';

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
import { HouseFormList } from './ItemTypeSettingHelper';

import clsx from 'clsx';

const ItemTypeSetting = () => {
  const [publishType, setPublishType] = useState('');
  const [testValue, setTestValue] = useState('無');

  return (
    <div className="flex flex-col gap-6 mt-6">
      <FieldGroup title="請選擇物件型態">
        <div className="flex gap-6">
          {HouseFormList.map((item) => (
            <Button
              key={item.value}
              className={clsx('h-20 flex-1 text-xl')}
              color={item.value === publishType ? 'primary' : ''}
              variant={item.value === publishType ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() => setPublishType(item.value)}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup title="出售名稱＊">
        <TextField
          id="contacts"
          placeholder="請輸入物件出售名稱"
          sx={{ width: '80%' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">出售名稱＊</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">0/60</InputAdornment>
              ),
            },
          }}
        />
      </FieldGroup>
      <FieldGroup title="物件位置＊">
        <div className="flex gap-2 items-center">
          <FormControl sx={{ minWidth: 134 }}>
            <InputLabel id="demo-select-small-label">出售地址＊</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={testValue}
              label="Age"
              onChange={(e) => setTestValue(e.target.value)}
            >
              <MenuItem value="">請選擇縣市</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 134 }}>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={''}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>請選擇鄉鎮市區</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="contacts"
            placeholder="請輸入道路或街名"
            sx={{ width: '144px' }}
          />
          <TextField
            className="w-[100px]"
            id="contacts"
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">號</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            className="w-[100px]"
            id="contacts"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">之</InputAdornment>
                ),
              },
            }}
          />
          <p className="text-[#909090]">( 前台只會顯示前半段地址 )</p>
          {/* <FormControlLabel control={<Checkbox />} label="隱藏門號" /> */}
        </div>
        <div className="flex gap-2 items-center">
          <TextField
            className="w-[363px]"
            id="contacts"
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
          className="w-[272px]"
          id="contacts"
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
        <div className="flex gap-10">
          <TextField
            id="contacts"
            sx={{ width: '80%' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">現況格局＊</InputAdornment>
                ),
              },
            }}
          />
          <FormControlLabel control={<Checkbox />} label="開放式格局" />
        </div>
      </FieldGroup>
      <FieldGroup title="物件細項">
        <div className="flex items-center gap-2">
          <TextField
            id="contacts"
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
            id="contacts"
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
            id="contacts"
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
            id="contacts"
            placeholder="請輸入坪數"
            sx={{ width: '302px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">建物登記坪數</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">坪</InputAdornment>
                ),
              },
            }}
          />
        </div>
        <div className="flex gap-10">
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="demo-select-small-label">法定用途＊</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel control={<Checkbox />} label="隱藏詳細用途" />
        </div>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="demo-select-small-label">物件現況＊</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            id="contacts"
            placeholder="請輸入屋齡"
            sx={{ width: '302px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"> 屋齡</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">年</InputAdornment>
                ),
              },
            }}
          />
          <FormControl sx={{ minWidth: 196 }}>
            <InputLabel id="demo-select-small-label">裝潢程度＊</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex gap-10">
          <TextField
            id="contacts"
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
            <InputLabel id="demo-select-small-label">帶租約</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
              value={testValue}
              label="Age"
              onChange={(e) => setTestValue(e.target.value)}
            >
              <MenuItem value="無">無</MenuItem>
              <MenuItem value="有">有</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="w-[168px]">
            <InputLabel id="demo-select-small-label">車位</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={testValue}
              label="Age"
              onChange={(e) => setTestValue(e.target.value)}
            >
              <MenuItem value="無">無</MenuItem>
              <MenuItem value="有">有</MenuItem>
            </Select>
          </FormControl>
        </div>
      </FieldGroup>
      <FieldGroup title="物件總價">
        <TextField
          id="contacts"
          placeholder="請輸入物件總價"
          sx={{ width: '302px' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">物件總價＊</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">元</InputAdornment>,
            },
          }}
        />
      </FieldGroup>
    </div>
  );
};

export default ItemTypeSetting;
