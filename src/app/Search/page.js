'use client';
import { useState } from 'react';
import Image from 'next/image';
import Header from './Header';
import Button from '@components/common/Button/Button';
import Dropdown from '@components/common/Dropdown/Dropdown';
import ItemCard from '@components/common/ItemCard/ItemCard';
import Arrow from '@components/icon/Arrow/Arrow';
import FilterGroup from './FilterGroup';
import Reload from '@components/icon/Reload/Reload';
import SearchIcon from '@components/icon/SearchIcon/SearchIcon';
import FilterCheckbox from '../Search/FilterCheckbox';
import Counter from '@components/common/Counter/Counter';
import TubIcon from '@components/icon/TubIcon/TubIcon';
import CouchIcon from '@components/icon/CouchIcon/CouchIcon';
import BedIcon from '@components/icon/BedIcon/BedIcon';
import GrassIcon from '@components/icon/GrassIcon/GrassIcon';
import CustomSlider from '@components/common/CustomSlider/CustomSlider';
import styles from './Search.module.scss';

const BUY_HOUSE_MOCK_LIST = [
  {
    title: '景美站/羅斯六段高樓含車位 坡平車位',
    views: 1234,
    updatedAt: 1672531199000,
    district: '文山區',
    squareMeters: 120,
    totalSquareMeters: 150,
    floor: 7,
    totalFloor: 12,
    houseAge: 10,
    layout: {
      room: 3,
      living: 1,
      bath: 2,
    },
    price: 5000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '新生站/臨沂街矮樓 巷子內',
    views: 5487,
    updatedAt: 1672617599000,
    district: '中正區',
    squareMeters: 80,
    totalSquareMeters: 95,
    floor: 15,
    totalFloor: 20,
    houseAge: 5,
    layout: {
      room: 2,
      living: 1,
      bath: 1,
    },
    price: 7000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '信義路五段150巷11弄1號1樓',
    views: 2345,
    updatedAt: 1672703999000,
    district: '信義區',
    squareMeters: 90,
    totalSquareMeters: 45,
    floor: 2 + 1,
    totalFloor: 2,
    houseAge: 20,
    layout: {
      room: 4,
      living: 1,
      bath: 2,
    },
    price: 3000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '景美站/羅斯六段高樓含車位 坡平車位',
    views: 1234,
    updatedAt: 1672531199000,
    district: '文山區',
    squareMeters: 120,
    totalSquareMeters: 150,
    floor: 7,
    totalFloor: 12,
    houseAge: 10,
    layout: {
      room: 3,
      living: 1,
      bath: 2,
    },
    price: 5000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '新生站/臨沂街矮樓 巷子內',
    views: 5487,
    updatedAt: 1672617599000,
    district: '中正區',
    squareMeters: 80,
    totalSquareMeters: 95,
    floor: 15,
    totalFloor: 20,
    houseAge: 5,
    layout: {
      room: 2,
      living: 1,
      bath: 1,
    },
    price: 7000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '信義路五段150巷11弄1號1樓',
    views: 2345,
    updatedAt: 1672703999000,
    district: '信義區',
    squareMeters: 90,
    totalSquareMeters: 45,
    floor: 2 + 1,
    totalFloor: 2,
    houseAge: 20,
    layout: {
      room: 4,
      living: 1,
      bath: 2,
    },
    price: 3000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
];

const ITEM_TYPE_LIST = [
  { value: '分租套房', text: '分租套房', isChecked: false },
  { value: '整層住家', text: '整層住家', isChecked: false },
  { value: '獨立套房', text: '獨立套房', isChecked: false },
  { value: '雅房', text: '雅房', isChecked: false },
  { value: '店面', text: '店面', isChecked: false },
  { value: '住辦', text: '住辦', isChecked: false },
  { value: '廠房', text: '廠房', isChecked: false },
  { value: '商用', text: '商用', isChecked: false },
  { value: '車位', text: '車位', isChecked: false },
  { value: '其他', text: '其他', isChecked: false },
];

const FEATURE_LIST = [
  { value: '新上架', text: '新上架', isChecked: false },
  { value: '近捷運', text: '近捷運', isChecked: false },
  { value: '可養寵物', text: '可養寵物', isChecked: false },
  { value: '可開伙', text: '可開伙', isChecked: false },
  { value: '有電梯', text: '有電梯', isChecked: false },
  { value: '有車位', text: '有車位', isChecked: false },
  { value: '可短期租賃', text: '可短期租賃', isChecked: false },
  { value: '有陽台', text: '有陽台', isChecked: false },
];

const BULIDING_TYPE_LIST = [
  { value: '公寓', text: '公寓', isChecked: false },
  { value: '電梯大樓', text: '電梯大樓', isChecked: false },
  { value: '透天厝', text: '透天厝', isChecked: false },
  { value: '別墅', text: '別墅', isChecked: false },
];

const RENT_INCLUDE_LIST = [
  { value: '水費', text: '水費', isChecked: false },
  { value: '瓦斯費', text: '瓦斯費', isChecked: false },
  { value: '電費', text: '電費', isChecked: false },
  { value: '管理費', text: '管理費', isChecked: false },
  { value: '第四臺', text: '第四臺', isChecked: false },
  { value: '車位費', text: '車位費', isChecked: false },
  { value: '網路費', text: '網路費', isChecked: false },
];

const DECORATION_STATUS_LIST = [
  { value: '預設', text: '預設', isChecked: false },
  { value: '中等裝潢', text: '中等裝潢', isChecked: false },
  { value: '尚未裝潢', text: '尚未裝潢', isChecked: false },
  { value: '高等裝潢', text: '高等裝潢', isChecked: false },
  { value: '簡易裝潢', text: '簡易裝潢', isChecked: false },
];

const EQUIPMENT_LIST = [
  { value: '冷氣', text: '冷氣', isChecked: false },
  { value: '熱水器', text: '熱水器', isChecked: false },
  { value: '洗衣機', text: '洗衣機', isChecked: false },
  { value: '冰箱', text: '冰箱', isChecked: false },
  { value: '天然瓦斯', text: '天然瓦斯', isChecked: false },
  { value: '網路', text: '網路', isChecked: false },
  { value: '電視', text: '電視', isChecked: false },
  { value: '微波爐', text: '微波爐', isChecked: false },
  { value: '瓦斯爐', text: '瓦斯爐', isChecked: false },
  { value: '脫水機', text: '脫水機', isChecked: false },
];

const FURNITURE_LIST = [
  { value: '衣櫥', text: '衣櫥', isChecked: false },
  { value: '單人床', text: '單人床', isChecked: false },
  { value: '雙人床', text: '雙人床', isChecked: false },
  { value: '沙發', text: '沙發', isChecked: false },
  { value: '書桌', text: '書桌', isChecked: false },
  { value: '置物櫃', text: '置物櫃', isChecked: false },
];

const PARTITION_MATERIAL_LIST = [
  { value: '輕隔間', text: '輕隔間', isChecked: false },
  { value: '混泥土隔間', text: '混泥土隔間', isChecked: false },
  { value: '磚牆隔間', text: '磚牆隔間', isChecked: false },
];

const RULE_LIST = [
  { value: '不限性別', text: '不限性別', isChecked: false },
  { value: '限生理男性', text: '限生理男性', isChecked: false },
  { value: '限生理女性', text: '限生理女性', isChecked: false },
  { value: '排除頂樓加蓋', text: '排除頂樓加蓋', isChecked: false },
  { value: '房東同住', text: '房東同住', isChecked: false },
];

const FILTER_DROPDOWN_LIST = [
  { value: '預設', text: '預設' },
  { value: '金額 大到小', text: '金額 大到小' },
  { value: '金額 小到大', text: '金額 小到大' },
  { value: '坪數 大到小', text: '坪數 大到小' },
  { value: '坪數 小到大', text: '坪數 小到大' },
  { value: '刊登時間 新到舊', text: '刊登時間 新到舊' },
  { value: '刊登時間 舊到新', text: '刊登時間 舊到新' },
];

export default function Search() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [itemTypeList, setItemTypeList] = useState(ITEM_TYPE_LIST);
  const [featureList, setFeatureList] = useState(FEATURE_LIST);
  const [bulidingTypeList, setBulidingTypeList] = useState(BULIDING_TYPE_LIST);
  const [rentIncludeList, setRentIncludeList] = useState(RENT_INCLUDE_LIST);
  const [decorationStatusList, setDecorationStatusList] = useState(
    DECORATION_STATUS_LIST
  );
  const [equipmentList, setEquipmentList] = useState(EQUIPMENT_LIST);
  const [furnitureList, setFurnitureList] = useState(FURNITURE_LIST);
  const [partitionMaterialList, setPartitionMaterialList] = useState(
    PARTITION_MATERIAL_LIST
  );
  const [ruleList, setRuleList] = useState(RULE_LIST);
  const [filterOption, setFilterOption] = useState('預設');

  const checkBoxValueChange = (value, isChecked, checkboxList, setFunction) => {
    const newCheckboxList = checkboxList.map((item) => {
      if (item.value === value) {
        return { ...item, isChecked: !isChecked };
      }
      return item;
    });

    setFunction(newCheckboxList);
  };

  return (
    <div>
      <div className={styles.header}>
        <Header headerType="white" />
      </div>
      <div className={styles.page}>
        {isSideBarOpen && (
          <aside
            className={styles.sideBar}
            data-isopen={isSideBarOpen ? 'open' : 'close'}
          >
            <div className={styles.sideBarHeader}>
              <div className={styles.searchResult}>
                <span className={styles.searchNumber}>298</span>
                <div className={styles.result}>個結果</div>
              </div>
              <Button
                buttonText="收起 篩選器"
                buttonStyle={{
                  padding: '16px 16px 16px 8px',
                  borderRadius: '8px',
                  border: '1px solid #E9E9E9',
                  gap: '8px',
                }}
                iconPosition="left"
                icon={<Arrow direction="left" />}
                action={() => setIsSideBarOpen(false)}
              />
            </div>
            <div className={styles.sideBarContent}>
              <FilterGroup title="位置">
                <div className={styles.filterDropdownGroup}>
                  <div className={styles.filterDropdown}>
                    <Dropdown placeholder="按鄉鎮" />
                  </div>
                  <div className={styles.filterDropdown}>
                    <Dropdown placeholder="大安區" />
                  </div>
                </div>
              </FilterGroup>
              <FilterGroup title="物件類型">
                <FilterCheckbox
                  optionList={itemTypeList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      itemTypeList,
                      setItemTypeList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="單月租金">
                <div>
                  <CustomSlider />
                </div>
              </FilterGroup>
              <FilterGroup title="物件格局" filterType="layout">
                <div className={styles.counterGroup}>
                  <div className={styles.counter}>
                    <Counter text="房" Icon={BedIcon} />
                  </div>
                  <div className={styles.counter}>
                    <Counter text="廳" Icon={CouchIcon} />
                  </div>
                  <div className={styles.counter}>
                    <Counter text="衛" Icon={TubIcon} />
                  </div>
                  <div className={styles.counter}>
                    <Counter text="陽台" Icon={GrassIcon} />
                  </div>
                </div>
              </FilterGroup>
              <FilterGroup title="物件特色">
                <FilterCheckbox
                  optionList={featureList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      featureList,
                      setFeatureList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="物件樓層">
                <div>
                  <CustomSlider />
                </div>
              </FilterGroup>
              <FilterGroup title="物件型態">
                <FilterCheckbox
                  optionList={bulidingTypeList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      bulidingTypeList,
                      setBulidingTypeList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="租金內含">
                <FilterCheckbox
                  optionList={rentIncludeList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      rentIncludeList,
                      setRentIncludeList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="物件坪數">
                <div>
                  <CustomSlider />
                </div>
              </FilterGroup>
              <FilterGroup title="裝潢程度">
                <FilterCheckbox
                  optionList={decorationStatusList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      decorationStatusList,
                      setDecorationStatusList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="提供設備">
                <FilterCheckbox
                  optionList={equipmentList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      equipmentList,
                      setEquipmentList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="提供家具">
                <FilterCheckbox
                  optionList={furnitureList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      furnitureList,
                      setFurnitureList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="隔間材質">
                <FilterCheckbox
                  optionList={partitionMaterialList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      partitionMaterialList,
                      setPartitionMaterialList
                    );
                  }}
                />
              </FilterGroup>
              <FilterGroup title="租屋規則">
                <FilterCheckbox
                  optionList={ruleList}
                  onChange={(value, isChecked) => {
                    checkBoxValueChange(
                      value,
                      isChecked,
                      ruleList,
                      setRuleList
                    );
                  }}
                />
              </FilterGroup>
            </div>
            <div className={styles.sideBarFooter}>
              <Button
                buttonText="重置"
                buttonStyle={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #E9E9E9',
                  gap: '8px',
                }}
                icon={<Reload />}
                iconPosition="left"
              />
              <Button
                buttonText="搜尋"
                buttonStyle={{
                  width: '200px',
                  borderRadius: '8px',
                  padding: '16px',
                  background: '#FF8E26',
                  boxShadow: '0px 2px 8px 0px rgba(99, 99, 99, 0.20)',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                textStyle={{
                  color: '#FFF',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                }}
                iconPosition="left"
                icon={<SearchIcon color="#FFFFFF" />}
              />
            </div>
          </aside>
        )}
        <div className={styles.listContainer}>
          <div className={styles.buttonArea}>
            {!isSideBarOpen && (
              <Button
                buttonText="展開篩選"
                buttonType="transparent"
                iconPosition="left"
                icon={
                  <Image
                    src="/housing/icon/setting.svg"
                    alt="setting"
                    width={24}
                    height={24}
                  />
                }
                textStyle={{
                  color: '#333',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                buttonStyle={{
                  border: '1px solid #E9E9E9',
                  padding: '16px',
                  gap: '8px',
                  borderRadius: '8px',
                  background: '#FFF',
                }}
                action={() => setIsSideBarOpen(true)}
              />
            )}
            <div className={styles.dropdownButton}>
              <Dropdown
                dropdownType="menu"
                optionList={FILTER_DROPDOWN_LIST}
                value={filterOption}
                onChange={(item) => setFilterOption(item.value)}
              />
            </div>
          </div>
          <div className={styles.cardList}>
            {BUY_HOUSE_MOCK_LIST.map((itemData, index) => (
              <div key={index}>
                <ItemCard itemData={itemData} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
