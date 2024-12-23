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
import {
  ElevatorOptions,
  HouseFormList,
  ParkingOptions,
} from './InfoSettingHelper';

import clsx from 'clsx';

const InfoSetting = (props) => {
  const { publishType, infoSettings, setInfoSettings } = props;

  return (
    <div className="flex flex-col gap-6 mt-6">
      <FieldGroup title="請選擇物件型態">
        <div className="flex gap-6">
          {HouseFormList.map((item) => (
            <Button
              key={item.value}
              className={clsx('h-20 flex-1 text-xl')}
              color={item.value === infoSettings.shapeId ? 'primary' : ''}
              variant={
                item.value === infoSettings.shapeId ? 'contained' : 'outlined'
              }
              startIcon={item.icon}
              onClick={() =>
                setInfoSettings((prev) => ({
                  ...prev,
                  shapeId: item.value,
                }))
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
          value={infoSettings.title}
          placeholder="請輸入物件出售名稱"
          sx={{ width: '80%' }}
          onChange={(e) => {
            if (infoSettings.title && infoSettings.title.length === 60) return;

            setInfoSettings((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">出售名稱＊</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">{`${infoSettings.title ? infoSettings.title.length : 0}/60`}</InputAdornment>
              ),
            },
          }}
        />
      </FieldGroup>
      <FieldGroup title="物件位置＊">
        <div className="flex gap-2 items-center">
          <FormControl sx={{ minWidth: 134 }}>
            <InputLabel sx={{ bgcolor: 'white' }} id="demo-select-small-label">
              出售地址＊
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              placeholder="請選擇縣市"
              // value={testValue}
              label="Age"
              // onChange={(e) => setTestValue(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 134 }}>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              placeholder="請選擇鄉鎮市區"
              value={''}
              label="Age"
              // onChange={handleChange}
            >
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
          <p className="text-[#909090]">( 前台只會顯示前半段地址 )</p>
        </div>
        <div className="flex gap-2 items-center">
          <TextField
            className="w-[405px]"
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
        <div className="flex gap-10">
          <TextField
            id="contacts"
            sx={{ width: '200px' }}
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
      {publishType === 'buy' && (
        <>
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
            <FormControl sx={{ width: 300 }}>
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
            <div className="flex gap-2">
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
                  value={infoSettings.elevator}
                  label="Age"
                  onChange={(e) =>
                    setInfoSettings((prev) => ({
                      ...prev,
                      elevator: e.target.value,
                    }))
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
                  value={infoSettings.parkingSpace}
                  label="Age"
                  onChange={(e) =>
                    setInfoSettings((prev) => ({
                      ...prev,
                      parkingSpace: e.target.value,
                    }))
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
              id="contacts"
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
        </>
      )}
      {publishType === 'rent' && (
        //todo:替換租物件
        <>
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
            <FormControl sx={{ width: 300 }}>
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
            <div className="flex gap-2">
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
                  // value={testValue}
                  label="Age"
                  // onChange={(e) => setTestValue(e.target.value)}
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
                  value={infoSettings.parkingSpace}
                  label="Age"
                  onChange={(e) =>
                    setInfoSettings((prev) => ({
                      ...prev,
                      parkingSpace: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="">無</MenuItem>
                  <MenuItem value="planar">平面式</MenuItem>
                  <MenuItem value="機械">機械式</MenuItem>
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
                  endAdornment: (
                    <InputAdornment position="end">元</InputAdornment>
                  ),
                },
              }}
            />
          </FieldGroup>
        </>
      )}
    </div>
  );
};

export default InfoSetting;
