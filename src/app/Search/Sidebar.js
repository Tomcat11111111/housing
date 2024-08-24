import { useEffect, useRef, useState } from 'react';

import Button from '@components/common/Button/Button';
import Counter from '@components/common/Counter/Counter';
import Dropdown from '@components/common/Dropdown/Dropdown';
import RangeSlider from '@components/common/RangeSlider/RangeSlider';
import Arrow from '@components/icon/Arrow/Arrow';
import BedIcon from '@components/icon/BedIcon/BedIcon';
import CouchIcon from '@components/icon/CouchIcon/CouchIcon';
import GrassIcon from '@components/icon/GrassIcon/GrassIcon';
import Reload from '@components/icon/Reload/Reload';
import SearchIcon from '@components/icon/SearchIcon/SearchIcon';
import TubIcon from '@components/icon/TubIcon/TubIcon';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import FilterCheckbox from './FilterCheckbox';
import FilterGroup from './FilterGroup';
import styles from './Sidebar.module.scss';
import {
  getCategoriesApi,
  getCityDistrictApi,
  getDecorLevelsApi,
  getEquipmentApi,
  getFeaturesApi,
  getFurnitureApi,
  getIncludedInRentApi,
  getMaterialsApi,
  getRulesApi,
  getShapesApi,
} from './SidebarHelper';

export default function Sidebar({
  originfilterParams,
  setFilterParams,
  isSideBarOpen,
  setIsSideBarOpen,
  total,
  city,
}) {
  const queryClient = useQueryClient();
  // const {} = originfilterParams;

  const [district, setDistrict] = useState(null);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [includedInRents, setIncludedInRents] = useState([]);
  const [decorLevels, setDecorLevels] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [rules, setRules] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  const [livingRoomCount, setLivingRoomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [balconyCount, setBalconyCount] = useState(0);
  const [rent, setRent] = useState([200, 500]);

  const checkBoxValueChange = (id, checked, selectedOptions, setFunction) => {
    if (!checked) {
      // Add the option to the selected options array
      setFunction([...selectedOptions, id]);
    } else {
      // Remove the option from the selected options array
      setFunction(selectedOptions.filter((option) => option !== id));
    }
  };

  const { data: cityDistrictOptions } = useQuery({
    queryKey: ['getCityDistrictApi', city],
    queryFn: getCityDistrictApi,
    meta: {
      city,
    },
    initialData: [],
  });

  useEffect(() => {
    if (cityDistrictOptions.length > 0) {
      setDistrict(cityDistrictOptions[0].id);
    }
  }, [cityDistrictOptions]);

  // 物件類型
  const { data: categoriesOptions } = useQuery({
    queryKey: ['getCategoriesApi'],
    queryFn: getCategoriesApi,
  });

  // 物件特色
  const { data: featuresOptions } = useQuery({
    queryKey: ['getFeaturesApi'],
    queryFn: getFeaturesApi,
  });

  // 物件格局
  const { data: shapesOptions } = useQuery({
    queryKey: ['getShapesApi'],
    queryFn: getShapesApi,
  });

  // 租金內含
  const { data: IncludedInRentOptions } = useQuery({
    queryKey: ['getIncludedInRentApi'],
    queryFn: getIncludedInRentApi,
  });

  // 裝潢程度
  const { data: decorLevelsOptions } = useQuery({
    queryKey: ['getDecorLevelsApi'],
    queryFn: getDecorLevelsApi,
  });

  // 提供設備
  const { data: equipmentOptions } = useQuery({
    queryKey: ['getEquipmentApi'],
    queryFn: getEquipmentApi,
  });

  // 提供家具
  const { data: furnitureOptions } = useQuery({
    queryKey: ['getFurnitureApi'],
    queryFn: getFurnitureApi,
  });

  // 隔間材質
  const { data: materialsOptions } = useQuery({
    queryKey: ['getMaterialsApi'],
    queryFn: getMaterialsApi,
  });

  // 租屋規則
  const { data: rulesOptions } = useQuery({
    queryKey: ['getRulesApi'],
    queryFn: getRulesApi,
  });

  const getFilterParams = () => {
    const tempParams = {
      districtId: district,
    };

    if (categories.length > 0) {
      tempParams.categoryIds = categories;
    }

    if (features.length > 0) {
      tempParams.featureIds = features;
    }

    if (shapes.length > 0) {
      tempParams.shapeIds = shapes;
    }

    if (includedInRents.length > 0) {
      tempParams.includedInRentIds = includedInRents;
    }

    if (decorLevels.length > 0) {
      tempParams.decorLevelIds = decorLevels;
    }

    if (equipments.length > 0) {
      tempParams.equipmentIds = equipments;
    }

    if (furnitures.length > 0) {
      tempParams.furnitureIds = furnitures;
    }

    if (materials.length > 0) {
      tempParams.materialIds = materials;
    }

    if (rules.length > 0) {
      tempParams.ruleIds = rules;
    }

    if (roomCount > 0) {
      tempParams.room = roomCount;
    }

    if (livingRoomCount > 0) {
      tempParams.livingRoom = livingRoomCount;
    }

    if (bathroomCount > 0) {
      tempParams.bathroom = bathroomCount;
    }

    if (balconyCount > 0) {
      tempParams.balcony = balconyCount;
    }

    setFilterParams((prev) => ({
      ...prev,
      ...tempParams,
    }));

    queryClient.invalidateQueries({
      queryKey: ['getRentPropertiesApi'],
    });
  };

  return (
    <aside
      className={styles.sideBar}
      data-isopen={isSideBarOpen ? 'open' : 'close'}
    >
      <div className={styles.sideBarHeader}>
        <div className={styles.searchResult}>
          <span className={styles.searchNumber}>{total}</span>
          <div className={styles.result}>個結果</div>
        </div>
        <div class="slidecontainer">
          <input
            type="range"
            min="0"
            max="100"
            value="50"
            class="slider"
            id="myRange"
          />
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
              <Dropdown
                optionList={[{ displayName: '按鄉鎮', value: '按鄉鎮' }]}
                dropdownType="menu"
                value="按鄉鎮"
                onChange={() => {}}
              />
            </div>
            <div className={styles.filterDropdown}>
              <Dropdown
                optionList={cityDistrictOptions}
                value={district}
                dropdownType="menu"
                onChange={(value) => setDistrict(value)}
              />
            </div>
          </div>
        </FilterGroup>
        <FilterGroup title="物件類型">
          <FilterCheckbox
            optionList={categoriesOptions}
            selectedOptions={categories}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, categories, setCategories);
            }}
          />
        </FilterGroup>
        <FilterGroup title="單月租金">
          <div>
            <RangeSlider
              min={500}
              max={1000}
              step={100}
              values={rent}
              setValues={setRent}
              type="money"
            />
          </div>
        </FilterGroup>
        <FilterGroup title="物件格局" filterType="layout">
          <div className={styles.counterGroup}>
            <div className={styles.counter}>
              <Counter
                text="房"
                Icon={BedIcon}
                count={roomCount}
                setCount={setRoomCount}
              />
            </div>
            <div className={styles.counter}>
              <Counter
                text="廳"
                Icon={CouchIcon}
                count={livingRoomCount}
                setCount={setLivingRoomCount}
              />
            </div>
            <div className={styles.counter}>
              <Counter
                text="衛"
                Icon={TubIcon}
                count={bathroomCount}
                setCount={setBathroomCount}
              />
            </div>
            <div className={styles.counter}>
              <Counter
                text="陽台"
                Icon={GrassIcon}
                count={balconyCount}
                setCount={setBalconyCount}
              />
            </div>
          </div>
        </FilterGroup>
        <FilterGroup title="物件特色">
          <FilterCheckbox
            optionList={featuresOptions}
            selectedOptions={features}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, features, setFeatures);
            }}
          />
        </FilterGroup>
        <FilterGroup title="物件樓層">
          <div>{/* <RangeSlider /> */}</div>
        </FilterGroup>
        <FilterGroup title="物件型態">
          <FilterCheckbox
            optionList={shapesOptions}
            selectedOptions={shapes}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, shapes, setShapes);
            }}
          />
        </FilterGroup>
        <FilterGroup title="租金內含">
          <FilterCheckbox
            optionList={IncludedInRentOptions}
            selectedOptions={includedInRents}
            onChange={(id, isChecked) => {
              checkBoxValueChange(
                id,
                isChecked,
                includedInRents,
                setIncludedInRents
              );
            }}
          />
        </FilterGroup>
        <FilterGroup title="物件坪數">
          <div>{/* <RangeSlider /> */}</div>
        </FilterGroup>
        <FilterGroup title="裝潢程度">
          <FilterCheckbox
            optionList={decorLevelsOptions}
            selectedOptions={decorLevels}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, decorLevels, setDecorLevels);
            }}
          />
        </FilterGroup>
        <FilterGroup title="提供設備">
          <FilterCheckbox
            optionList={equipmentOptions}
            selectedOptions={equipments}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, equipments, setEquipments);
            }}
          />
        </FilterGroup>
        <FilterGroup title="提供家具">
          <FilterCheckbox
            optionList={furnitureOptions}
            selectedOptions={furnitures}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, furnitures, setFurnitures);
            }}
          />
        </FilterGroup>
        <FilterGroup title="隔間材質">
          <FilterCheckbox
            optionList={materialsOptions}
            selectedOptions={materials}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, materials, setMaterials);
            }}
          />
        </FilterGroup>
        <FilterGroup title="租屋規則">
          <FilterCheckbox
            optionList={rulesOptions}
            selectedOptions={rules}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, rules, setRules);
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
          action={() => getFilterParams()}
        />
      </div>
    </aside>
  );
}
