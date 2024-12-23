import { useState } from 'react';

import { Button } from '@mui/material';

import FieldGroup from './FieldGroup';
import {
  BuyHouseTypeList,
  ItemTypeList,
  PublishTypeList,
  RentHouseTypeList,
} from './TypeSettingHelper';

import clsx from 'clsx';

const TypeSetting = (props) => {
  const { itemTypeSettings, setItemTypeSettings } = props;

  const ItemTypeSubList =
    itemTypeSettings.publishType === 'buy'
      ? BuyHouseTypeList
      : RentHouseTypeList;

  return (
    <div className="flex flex-col gap-6 my-6">
      <FieldGroup title="請選擇刊登類別">
        <div className="flex gap-6">
          {PublishTypeList.map((item) => (
            <Button
              key={item.value}
              className={clsx('h-20 flex-1 text-xl')}
              color={
                item.value === itemTypeSettings.publishType ? 'primary' : ''
              }
              variant={
                item.value === itemTypeSettings.publishType
                  ? 'contained'
                  : 'outlined'
              }
              startIcon={item.icon}
              onClick={() =>
                setItemTypeSettings((prev) => ({
                  ...prev,
                  publishType: item.value,
                }))
              }
              disabled={item.value === ''}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup
        title="請選擇物件類型"
        isAvailable={!!itemTypeSettings.publishType}
      >
        <div className="flex gap-6 flex-wrap">
          {ItemTypeList.map((item) => (
            <Button
              key={item.value}
              className="h-20 flex-[0_1_calc(33%-24px)] text-xl"
              color={item.value === itemTypeSettings.itemType ? 'primary' : ''}
              variant={
                item.value === itemTypeSettings.itemType
                  ? 'contained'
                  : 'outlined'
              }
              startIcon={item.icon}
              onClick={() =>
                setItemTypeSettings((prev) => ({
                  ...prev,
                  itemType: item.value,
                }))
              }
              disabled={item.value === ''}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup
        title="請選擇類型細項"
        isAvailable={!!itemTypeSettings.itemType}
      >
        <div className="flex gap-6 flex-wrap">
          {ItemTypeSubList.map((item) => (
            <Button
              key={item.value}
              className="h-20 flex-[0_1_calc(33%-24px)] text-xl"
              color={item.value === itemTypeSettings.category ? 'primary' : ''}
              variant={
                item.value === itemTypeSettings.category
                  ? 'contained'
                  : 'outlined'
              }
              startIcon={item.icon}
              onClick={() =>
                setItemTypeSettings((prev) => ({
                  ...prev,
                  category: item.value,
                }))
              }
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
};

export default TypeSetting;
