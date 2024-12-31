import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import clsx from 'clsx';

import usePublishStore from '@/store/usePublishStore';
import { PublishTypeList, ItemTypeList, BuyHouseTypeList, RentHouseTypeList } from '../publishHelper';
import FieldGroup from './FieldGroup';

const typeSettingSchema = yup.object().shape({
  publishType: yup.string().required('刊登類別未選'),
  itemType: yup.string().required('物件類型未選'),
  category: yup.string().required('類型細項未選'),
});

const TypeSetting = forwardRef((props, ref) => {
  const { isEdit = false } = props;
  const { itemTypeSettings, setItemTypeSettings } = usePublishStore();
  
  const {
    formState: { errors },
    trigger
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(typeSettingSchema),
    values: itemTypeSettings // 讓表單值始終跟隨 store
  });


  // 暴露方法給父組件
  useImperativeHandle(ref, () => ({
    trigger,
    errors
  }));

  const handlePublishTypeChange = (value) => {
    setItemTypeSettings({
      ...itemTypeSettings,
      publishType: value,
      itemType: '',  // 清空相關聯欄位
      category: ''
    });
  };

  const handleItemTypeChange = (value) => {
    setItemTypeSettings({
      ...itemTypeSettings,
      itemType: value,
    });
  };

  const handleCategoryChange = (value) => {
    setItemTypeSettings({
      ...itemTypeSettings,
      category: value
    });
  };

  const ItemCategoryList = itemTypeSettings.publishType === 'sales' ? BuyHouseTypeList : RentHouseTypeList;

  return (
    <form className="flex flex-col gap-6 my-6">
      <FieldGroup 
        title="請選擇刊登類別"
        error={errors.publishType?.message}
      >
        <div className="flex gap-6">
          {PublishTypeList.map((item) => (
            <Button
              key={item.value}
              className={clsx('h-20 flex-1 text-xl')}
              color={itemTypeSettings.publishType === item.value ? 'primary' : 'default'}
              variant={itemTypeSettings.publishType === item.value ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() => handlePublishTypeChange(item.value)}
              disabled={item.value.includes('disabled') || isEdit}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>

      <FieldGroup
        title="請選擇物件類型"
        isAvailable={!!itemTypeSettings.publishType}
        error={errors.itemType?.message}
      >
        <div className="flex gap-6 flex-wrap">
          {ItemTypeList.map((item) => (
            <Button
              key={item.value}
              className="h-20 flex-[0_1_calc(33%-24px)] text-xl"
              // sx={{ bgcolor: '#0936D8' }} //TODO:顏色處理
              color={itemTypeSettings.itemType === item.value ? 'primary' : 'default'}
              variant={itemTypeSettings.itemType === item.value ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() => handleItemTypeChange(item.value)}
              disabled={item.value.includes('disabled') || isEdit}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>

      <FieldGroup
        title="請選擇類型細項"
        isAvailable={!!itemTypeSettings.itemType}
        error={errors.category?.message}
      >
        <div className="flex gap-6 flex-wrap">
          {ItemCategoryList.map((item) => (
            <Button
              key={item.value}
              className="h-20 flex-[0_1_calc(33%-24px)] text-xl"
              color={itemTypeSettings.category === item.value ? 'primary' : 'default'}
              variant={itemTypeSettings.category === item.value ? 'contained' : 'outlined'}
              startIcon={item.icon}
              onClick={() => handleCategoryChange(item.value)}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </FieldGroup>
    </form>
  );
});

TypeSetting.displayName = 'TypeSetting';

export default TypeSetting;
