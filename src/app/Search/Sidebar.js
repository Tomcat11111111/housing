import { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { find, propEq } from 'ramda';

import Button from '@/components/common/Button/Button';
import Counter from '@/components/common/Counter/Counter';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import RangeSlider from '@/components/common/RangeSlider/RangeSlider';
import Arrow from '@/components/icon/Arrow/Arrow';
import BedIcon from '@/components/icon/BedIcon/BedIcon';
import CouchIcon from '@/components/icon/CouchIcon/CouchIcon';
import GrassIcon from '@/components/icon/GrassIcon/GrassIcon';
import Reload from '@/components/icon/Reload/Reload';
import SearchIcon from '@/components/icon/SearchIcon/SearchIcon';
import TubIcon from '@/components/icon/TubIcon/TubIcon';

import {
  DIRECTION_OPTIONS,
  PARKING_SPACE_OPTIONS,
  RENTAL_CATEGORIES,
  SALES_CATEGORIES,
  SOURCE_OPTIONS,
} from '@/utils/tools';

import FilterCheckbox from './FilterCheckbox';
import FilterGroup from './FilterGroup';
import styles from './Sidebar.module.scss';
import {
  getCityDistrictApi,
  getDecorLevelsApi,
  getEquipmentApi,
  getFeaturesApi,
  getFurnitureApi,
  getIncludedInRentApi,
  getMaterialsApi,
  getRulesApi,
  getShapesApi,
  getSurroundingsApi,
} from './SidebarHelper';

export default function Sidebar({
  setFilterParams,
  isSideBarOpen,
  setIsSideBarOpen,
  total,
  city,
  selectedTab,
}) {
  const queryClient = useQueryClient();

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
  const [rentMax, setRentMax] = useState(120100);
  const [rentMin, setRentMin] = useState(4000);
  const [floorMax, setFloorMax] = useState(21);
  const [floorMin, setFloorMin] = useState(0);
  const [totalMax, setTotalMax] = useState(5001);
  const [totalMin, setTotalMin] = useState(199);
  const [squareMax, setSquareMax] = useState(151);
  const [squareMin, setSquareMin] = useState(0);
  const [singleMax, setSingleMax] = useState(206);
  const [singleMin, setSingleMin] = useState(14);
  const [yearMax, setYearMax] = useState(61);
  const [yearMin, setYearMin] = useState(-1);
  const [directions, setDirections] = useState([]);
  const [sources, setSources] = useState([]);
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [surroundings, setSurroundings] = useState([]);

  const checkBoxValueChange = (id, checked, selectedOptions, setFunction) => {
    if (!checked) {
      // Add the option to the selected options array
      setFunction([...selectedOptions, id]);
    } else {
      // Remove the option from the selected options array
      setFunction(selectedOptions.filter((option) => option !== id));
    }
  };

  const { status: districtApiStatus, data: cityDistrictOptions } = useQuery({
    queryKey: ['getCityDistrictApi', city.id],
    queryFn: getCityDistrictApi,
    meta: {
      city: city.id,
    },
    select: (data) => [{ id: null, displayName: '全部' }, ...data],
    initialData: [],
  });

  useEffect(() => {
    if (districtApiStatus === 'success') {
      setDistrict(null);
    }
  }, [districtApiStatus]);

  // 物件特色
  const { data: featuresOptions } = useQuery({
    queryKey: ['getFeaturesApi'],
    enabled: selectedTab === 'rent',
    queryFn: getFeaturesApi,
  });

  // 物件格局
  const { data: shapesOptions } = useQuery({
    queryKey: ['getShapesApi'],
    queryFn: getShapesApi,
  });

  // 租金內含
  const { data: includedInRentOptions } = useQuery({
    queryKey: ['getIncludedInRentApi'],
    enabled: selectedTab === 'rent',
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
    enabled: selectedTab === 'rent',
    queryFn: getEquipmentApi,
  });

  // 提供家具
  const { data: furnitureOptions } = useQuery({
    queryKey: ['getFurnitureApi'],
    enabled: selectedTab === 'rent',
    queryFn: getFurnitureApi,
  });

  // 隔間材質
  const { data: materialsOptions } = useQuery({
    queryKey: ['getMaterialsApi'],
    enabled: selectedTab === 'rent',
    queryFn: getMaterialsApi,
  });

  // 租屋規則
  const { data: rulesOptions } = useQuery({
    queryKey: ['getRulesApi'],
    enabled: selectedTab === 'rent',
    queryFn: getRulesApi,
  });

  // 生活機能
  const { data: surroundingsOptions } = useQuery({
    queryKey: ['getSurroundingsApi'],
    enabled: selectedTab === 'buy',
    queryFn: getSurroundingsApi,
  });

  const getFilterParams = () => {
    const tempParams = {
      districtIds: district,
    };

    if (categories.length > 0) {
      tempParams.category = categories;
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

    if (directions.length > 0) {
      tempParams.directions = directions;
    }

    if (sources.length > 0) {
      tempParams.sources = sources;
    }

    if (parkingSpaces.length > 0) {
      tempParams.parkingSpaces = parkingSpaces;
    }

    if (surroundings.length > 0) {
      tempParams.surroundingIds = surroundings;
    }

    setFilterParams((prev) => ({
      ...prev,
      ...tempParams,
    }));

    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ['getRentPropertiesApi'],
      });
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
                optionList={[{ displayName: '按鄉鎮', id: '按鄉鎮' }]}
                dropdownType="menu"
                value="按鄉鎮"
                displayName="按鄉鎮"
                onChange={() => {}}
              />
            </div>
            <div className={styles.filterDropdown}>
              <Dropdown
                optionList={cityDistrictOptions}
                value={district}
                dropdownType="menu"
                onChange={(value) => setDistrict(value)}
                displayName={
                  find(propEq(district, 'id'))(cityDistrictOptions)?.displayName
                }
              />
            </div>
          </div>
        </FilterGroup>
        <FilterGroup title="物件類型">
          <FilterCheckbox
            optionList={
              selectedTab === 'rent' ? RENTAL_CATEGORIES : SALES_CATEGORIES
            }
            selectedOptions={categories}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, categories, setCategories);
            }}
          />
        </FilterGroup>
        {selectedTab === 'rent' && (
          <FilterGroup title="單月租金">
            <div>
              <RangeSlider
                rangeMax={120000}
                rangeMin={5000}
                step={1000}
                min={rentMin}
                max={rentMax}
                onChange={(values) => {
                  setRentMin(values[0]);
                  setRentMax(values[1]);
                }}
                type="money"
              />
            </div>
          </FilterGroup>
        )}
        {selectedTab === 'buy' && (
          <>
            <FilterGroup title="總售價">
              <RangeSlider
                rangeMax={5000}
                rangeMin={200}
                step={25}
                min={totalMin}
                max={totalMax}
                onChange={(values) => {
                  setTotalMin(values[0]);
                  setTotalMax(values[1]);
                }}
                type="totalPrice"
              />
            </FilterGroup>
            <FilterGroup title="單坪售價">
              <RangeSlider
                rangeMax={205}
                rangeMin={15}
                step={5}
                min={singleMin}
                max={singleMax}
                onChange={(values) => {
                  setSingleMin(values[0]);
                  setSingleMax(values[1]);
                }}
                type="perSquare"
              />
            </FilterGroup>
          </>
        )}
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
        {selectedTab === 'rent' && (
          <FilterGroup title="物件特色">
            <FilterCheckbox
              optionList={featuresOptions}
              selectedOptions={features}
              onChange={(id, isChecked) => {
                checkBoxValueChange(id, isChecked, features, setFeatures);
              }}
            />
          </FilterGroup>
        )}
        <FilterGroup title="物件樓層">
          <div>
            <RangeSlider
              rangeMax={20}
              rangeMin={1}
              step={1}
              min={floorMin}
              max={floorMax}
              onChange={(values) => {
                setFloorMin(values[0]);
                setFloorMax(values[1]);
              }}
              type="floor"
            />
          </div>
        </FilterGroup>
        {selectedTab === 'buy' && (
          <FilterGroup title="權狀坪數">
            <RangeSlider
              rangeMax={150}
              rangeMin={1}
              step={1}
              min={squareMin}
              max={squareMax}
              onChange={(values) => {
                setSquareMin(values[0]);
                setSquareMax(values[1]);
              }}
              type="square"
            />
          </FilterGroup>
        )}
        <FilterGroup title="物件型態">
          <FilterCheckbox
            optionList={shapesOptions}
            selectedOptions={shapes}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, shapes, setShapes);
            }}
          />
        </FilterGroup>
        {selectedTab === 'buy' && (
          <FilterGroup title="物件屋齡">
            <RangeSlider
              rangeMax={60}
              rangeMin={0}
              step={1}
              min={yearMin}
              max={yearMax}
              onChange={(values) => {
                setYearMin(values[0]);
                setYearMax(values[1]);
              }}
              type="year"
            />
          </FilterGroup>
        )}
        {selectedTab === 'rent' && (
          <FilterGroup title="租金內含">
            <FilterCheckbox
              optionList={includedInRentOptions}
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
        )}
        {selectedTab === 'rent' && (
          <FilterGroup title="物件坪數">
            <RangeSlider
              rangeMax={150}
              rangeMin={1}
              step={1}
              min={squareMin}
              max={squareMax}
              onChange={(values) => {
                setSquareMin(values[0]);
                setSquareMax(values[1]);
              }}
              type="square"
            />
          </FilterGroup>
        )}
        <FilterGroup title="裝潢程度">
          <FilterCheckbox
            optionList={decorLevelsOptions}
            selectedOptions={decorLevels}
            onChange={(id, isChecked) => {
              checkBoxValueChange(id, isChecked, decorLevels, setDecorLevels);
            }}
          />
        </FilterGroup>
        {selectedTab === 'rent' && (
          <>
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
          </>
        )}
        {selectedTab === 'buy' && (
          <>
            <FilterGroup title="物件朝向">
              <FilterCheckbox
                optionList={DIRECTION_OPTIONS}
                selectedOptions={directions}
                onChange={(id, isChecked) => {
                  checkBoxValueChange(id, isChecked, directions, setDirections);
                }}
              />
            </FilterGroup>
            <FilterGroup title="生活機能">
              <FilterCheckbox
                optionList={surroundingsOptions}
                selectedOptions={surroundings}
                onChange={(id, isChecked) => {
                  checkBoxValueChange(
                    id,
                    isChecked,
                    surroundings,
                    setSurroundings
                  );
                }}
              />
            </FilterGroup>
            <FilterGroup title="物件來源">
              <FilterCheckbox
                optionList={SOURCE_OPTIONS}
                selectedOptions={sources}
                onChange={(id, isChecked) => {
                  checkBoxValueChange(id, isChecked, sources, setSources);
                }}
              />
            </FilterGroup>
            <FilterGroup title="車位形式">
              <FilterCheckbox
                optionList={PARKING_SPACE_OPTIONS}
                selectedOptions={parkingSpaces}
                onChange={(id, isChecked) => {
                  checkBoxValueChange(
                    id,
                    isChecked,
                    parkingSpaces,
                    setParkingSpaces
                  );
                }}
              />
            </FilterGroup>
          </>
        )}
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
          buttonText="篩選"
          buttonStyle={{
            width: '200px',
            borderRadius: '8px',
            padding: '16px',
            background: '#0936D8',
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
