import { useState } from 'react';

import { Button, InputAdornment, TextField } from '@mui/material';

import FieldGroup from './FieldGroup';
import { HouseFormList } from './ItemTypeSettingHelper';

import clsx from 'clsx';

const ItemTypeSetting = () => {
  const [publishType, setPublishType] = useState('');

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
      <FieldGroup title="出售名稱＊"></FieldGroup>
      <FieldGroup title="物件位置＊"></FieldGroup>
      <FieldGroup title="物件格局＊"></FieldGroup>
      <FieldGroup title="物件細項"></FieldGroup>
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
