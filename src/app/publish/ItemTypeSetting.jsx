import { useState } from 'react';

import { Button } from '@mui/material';

import FieldGroup from './FieldGroup';
import {
  BuyHouseTypeList,
  ItemTypeList,
  PublishTypeList,
  RentHouseTypeList,
} from './ItemTypeSettingHelper';

import clsx from 'clsx';

const ItemTypeSetting = () => {
  const [publishType, setPublishType] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemTypeSub, setItemTypeSub] = useState('');

  const ItemTypeSubList =
    publishType === 'buy' ? BuyHouseTypeList : RentHouseTypeList;

  return (
    <div className="flex flex-col gap-6 mt-6">
      <FieldGroup title="請選擇刊登類別">
        <div className="flex gap-6">
          {PublishTypeList.map((item) => (
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
      <FieldGroup title="請選擇物件類型" isAvailable={!!publishType}>
        <div className="flex gap-6">
          {ItemTypeList.map((item) => (
            <Button
              key={item.value}
              className="h-20 flex-1 text-xl"
              color={item.value === itemType ? 'primary' : ''}
              variant={item.value === itemType ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() => setItemType(item.value)}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup title="請選擇類型細項" isAvailable={!!itemType}>
        <div className="flex gap-6">
          {ItemTypeSubList.map((item) => (
            <Button
              key={item.value}
              className="h-20 flex-1 text-xl"
              color={item.value === itemTypeSub ? 'primary' : ''}
              variant={item.value === itemTypeSub ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() => setItemTypeSub(item.value)}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
};

export default ItemTypeSetting;
