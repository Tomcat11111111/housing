import Button from '@/components/common/Button/Button';

import FieldGroup from './FieldGroup';
import ItemTypeButton from './ItemTypeButton';

const ItemType = () => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <FieldGroup title="請選擇刊登類別">
        <div className="flex gap-6">
          <ItemTypeButton buttonText="出租" />
          <ItemTypeButton buttonText="出售" />
          <ItemTypeButton buttonText="新建案" />
        </div>
      </FieldGroup>
      <FieldGroup title="請選擇物件現況">
        <h1 className="text-[#333] text-xl font-bold leading-8">住宅類</h1>
        <div className="flex gap-6">
          <ItemTypeButton buttonText="整層住家" />
          <ItemTypeButton buttonText="獨立套房" />
          <ItemTypeButton buttonText="分租套房" />
          <ItemTypeButton buttonText="雅房" />
          <ItemTypeButton buttonText="車位" />
          <ItemTypeButton buttonText="其他" />
        </div>
        <h1 className="text-[#333] text-xl font-bold leading-8">商用類</h1>
        <div className="flex gap-6">
          <ItemTypeButton buttonText="店面" />
          <ItemTypeButton buttonText="辦公" />
          <ItemTypeButton buttonText="住辦" />
          <ItemTypeButton buttonText="廠房" />
          <ItemTypeButton buttonText="土地" />
        </div>
      </FieldGroup>
      <FieldGroup title="請選擇物件型態">
        <div className="flex gap-6">
          <ItemTypeButton buttonText="公寓" />
          <ItemTypeButton buttonText="別墅" />
          <ItemTypeButton buttonText="透天厝" />
        </div>
      </FieldGroup>
    </div>
  );
};

export default ItemType;
