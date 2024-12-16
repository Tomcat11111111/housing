import { useState } from 'react';

import { Button } from '@mui/material';

import FieldGroup from './FieldGroup';
import { ItemTypeList, PublishTypeList } from './ItemTypeSettingHelper';

import clsx from 'clsx';

const ItemTypeSetting = () => {
  const [publishType, setPublishType] = useState('');
  const [itemType, setItemType] = useState('house');

  return (
    <div className="flex flex-col gap-6 mt-6">
      <FieldGroup title="請選擇物件型態">
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
    </div>
  );
};

export default ItemTypeSetting;
