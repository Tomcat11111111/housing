import { useEffect, useRef, useState } from 'react';

import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import GroupTab from '@common/GroupTab/GroupTab';
import GroupTabDropdown from '@common/GroupTabDropdown/GroupTabDropdown';
import Input from '@common/Input/Input';
import RangeSlider from '@common/RangeSlider/RangeSlider';
import Counter from '@components/common/Counter/Counter';
import BedIcon from '@components/icon/BedIcon/BedIcon';
import CouchIcon from '@components/icon/CouchIcon/CouchIcon';
import GrassIcon from '@components/icon/GrassIcon/GrassIcon';
import TubIcon from '@components/icon/TubIcon/TubIcon';
import Arrow from '@icon/Arrow/Arrow';
import House from '@icon/House/House';
import Remove from '@icon/Remove/Remove';
import SearchIcon from '@icon/SearchIcon/SearchIcon';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { find, join, map, propEq } from 'ramda';
import URI from 'urijs';

import styles from './SearchBar.module.scss';

const ORIGIN_OPTION_LIST = [
  { text: '租房子', value: 'rent', icon: House },
  { text: '買房子', value: 'buy', icon: House },
  { text: '新建案', value: 'new', icon: House },
];

const SearchBar = (props) => {
  const { isFixed, isOpen, setIsOpen, setIsUserCollapsed } = props;

  const router = useRouter();

  const getCitiesApi = async () => {
    const regionData = [];
    const response = await axios.get(
      'https://jzj-api.zeabur.app/locations/cities'
    );

    response.data.forEach((city) => {
      const regionGroup = regionData.find(
        (region) => region.name === city.region
      );

      if (regionGroup) {
        regionGroup.cities.push(city);
      } else {
        regionData.push({
          name: city.region,
          cities: [city],
        });
      }
    });

    return regionData;
  };

  const { data: citiesOptions } = useQuery({
    queryKey: ['getCitiesApi'],
    queryFn: getCitiesApi,
    initialData: [],
  });

  // 篩選條件 state
  const [selectedTab, setSelectedTab] = useState('rent');
  const [categories, setCategories] = useState([]);
  const [rentMax, setRentMax] = useState(120100);
  const [rentMin, setRentMin] = useState(4000);
  const [singleMax, setSingleMax] = useState(205);
  const [singleMin, setSingleMin] = useState(15);
  const [squareMax, setSquareMax] = useState(151);
  const [squareMin, setSquareMin] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [livingRoomCount, setLivingRoomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [balconyCount, setBalconyCount] = useState(0);
  const [city, setCity] = useState({ id: 1, displayName: '台北市' });
  const [input, setInput] = useState('');

  const mapRef = useRef(null);

  const initMap = () => {
    const TWlocation = { lat: 25.033, lng: 121.5654 };

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 25.033, lng: 121.5654 },
      zoom: 10,
    });

    const markerTW = new google.maps.Marker({
      position: TWlocation,
      map: map,
    });
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setIsUserCollapsed(true); // Disable auto collapse when user interacts
  };

  // const handleScroll = () => {
  //   if (window.scrollY > 1069 && isOpen) {
  //     // 419+108= 527+542=1069
  //     setIsOpen(false);
  //   }

  //   if (window.scrollY <= 1069 && !isOpen) {
  //     setIsOpen(true);
  //   }
  // };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && isOpen) {
      initMap();
    }
  }, [isOpen]);

  const getCategoriesApi = async () => {
    const response = await axios.get('https://jzj-api.zeabur.app/categories');
    return response.data;
  };

  // 物件類型
  const { data: categoriesOptions } = useQuery({
    queryKey: ['getCategoriesApi'],
    queryFn: getCategoriesApi,
    enabled: isOpen,
  });

  const checkBoxValueChange = (id, checked, selectedOptions, setFunction) => {
    if (!checked) {
      // Add the option to the selected options array
      setFunction([...selectedOptions, id]);
    } else {
      // Remove the option from the selected options array
      setFunction(selectedOptions.filter((option) => option !== id));
    }
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const getCategoriesDropdownDisplayName = () => {
    const displayNameList = map(
      (categoryId) =>
        find(propEq(categoryId, 'id'))(categoriesOptions)?.displayName,
      categories
    );

    return join(' / ', displayNameList);
  };

  const getRangeDisplay = ({ isMoney, unit, max, min, rangeMax, rangeMin }) => {
    let displayResult = '';
    const maxDisplay =
      max > rangeMax
        ? '不限'
        : isMoney
          ? `$ ${max.toLocaleString()}`
          : `${max}`;
    const minDisplay =
      min < rangeMin
        ? '不限'
        : isMoney
          ? `$ ${min.toLocaleString()}`
          : `${min}`;

    if (minDisplay === '不限' && maxDisplay === '不限') return '';

    displayResult += `${minDisplay} ~ ${maxDisplay}`;

    if (unit) displayResult += ` ${unit}`;

    return displayResult;
  };

  const getLayoutDisplay = () => {
    const layoutInfo = [];
    if (roomCount > 0) layoutInfo.push(`${roomCount} 房`);
    if (livingRoomCount > 0) layoutInfo.push(`${livingRoomCount} 廳`);
    if (bathroomCount > 0) layoutInfo.push(`${bathroomCount} 衛`);
    if (balconyCount > 0) layoutInfo.push(`${balconyCount} 陽台`);

    return layoutInfo.length > 0 ? layoutInfo.join(' / ') : '';
  };

  const onSearch = () => {
    let pageSearchUrl = URI('/Search').query({
      selectedTab,
      id: city.id,
      displayName: city.displayName,
      categories,
    });

    // 租
    if (selectedTab === 'rent') {
      if (balconyCount > 1) pageSearchUrl.addQuery({ balconyCount });
      if (bathroomCount > 1) pageSearchUrl.addQuery({ bathroomCount });
      if (livingRoomCount > 1) pageSearchUrl.addQuery({ livingRoomCount });
      if (roomCount > 1) pageSearchUrl.addQuery({ roomCount });
      if (livingRoomCount > 1) pageSearchUrl.addQuery({ livingRoomCount });
      if (rentMin >= 5000) pageSearchUrl.addQuery({ rentMin });
      if (rentMax <= 120000) pageSearchUrl.addQuery({ rentMax });
    }

    // 買
    if (selectedTab === 'buy') {
      if (singleMin >= 20) pageSearchUrl.addQuery({ singleMin });
      if (singleMax <= 200) pageSearchUrl.addQuery({ singleMax });
      if (squareMin >= 1) pageSearchUrl.addQuery({ squareMin });
      if (squareMax <= 150) pageSearchUrl.addQuery({ squareMax });
    }

    router.push(pageSearchUrl.toString());
  };

  return (
    <div className={styles.search} data-fixed={isFixed ? 'fixed' : ''}>
      {isOpen ? (
        <>
          <div className={styles.searchHeader}>
            <GroupTab
              selectedTab={selectedTab}
              tabOptions={ORIGIN_OPTION_LIST}
              onChange={(value) => setSelectedTab(value)}
            />
            <div className={styles.buttonArea}>
              <Button
                buttonText="縮小篩選"
                buttonType="transparent"
                iconPosition="left"
                icon={<Remove />}
                textStyle={{
                  color: '#333',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                buttonStyle={{
                  border: '1px solid #E9E9E9',
                  opacity: 0.6,
                  padding: '8px 16px 8px 16px',
                  gap: '8px',
                }}
                action={() => {
                  toggleOpen();
                }}
              />
              <Button
                buttonText="篩選更多"
                buttonType="transparent"
                iconPosition="right"
                icon={<Arrow />}
                textStyle={{
                  color: '#333',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                buttonStyle={{
                  border: '1px solid #E9E9E9',
                  opacity: 0.6,
                  padding: '8px 8px 8px 16px',
                  gap: '8px',
                }}
                action={() => router.push('/Search')}
              />
            </div>
          </div>
          <div ref={mapRef} className={styles.mapFill} id="map"></div>
          <div className={styles.searchBar}>
            <div className={styles.cityDropdown}>
              <Dropdown
                isHasNoBorder
                value={city?.id}
                dropdownType="city"
                onChange={(city) => {
                  setCity(city);
                }}
                optionList={citiesOptions}
                displayName={city?.displayName}
              />
            </div>
            <div className={styles.searchInput}>
              <Input
                iconPosition="left"
                placeholder="請輸入地點/街道/社區或其他資訊"
              />
            </div>
            <Button
              buttonText="搜尋"
              textStyle={{
                color: '#FFF',
              }}
              buttonStyle={{
                backgroundColor: '#FF8E26',
                padding: '16px 22px 16px 16px',
                gap: '8px',
              }}
              icon={<SearchIcon color="#FFFFFF" />}
              iconPosition="left"
              action={() => onSearch()}
            />
          </div>
          <div className={styles.dropdownBar}>
            {selectedTab === 'rent' && (
              <>
                <div className={styles.dropdown}>
                  <Dropdown
                    placeholder="物件類型"
                    dropdownType="checkbox"
                    value={categories}
                    onChange={(id, isChecked) => {
                      checkBoxValueChange(
                        id,
                        isChecked,
                        categories,
                        setCategories
                      );
                    }}
                    optionList={categoriesOptions}
                    displayName={getCategoriesDropdownDisplayName()}
                  />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown
                    placeholder="租金"
                    displayName={getRangeDisplay({
                      isMoney: true,
                      max: rentMax,
                      min: rentMin,
                      rangeMax: 120000,
                      rangeMin: 5000,
                    })}
                  >
                    <div className={styles.rangeContainer}>
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
                  </Dropdown>
                </div>
                <div className={styles.dropdown}>
                  <Dropdown placeholder="格局" displayName={getLayoutDisplay()}>
                    <div className={styles.dropdownContentContainer}>
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
                    </div>
                  </Dropdown>
                </div>
              </>
            )}
            {selectedTab === 'buy' && (
              <>
                <div className={styles.dropdown}>
                  <Dropdown
                    placeholder="物件類型"
                    dropdownType="checkbox"
                    value={categories}
                    onChange={(id, isChecked) => {
                      checkBoxValueChange(
                        id,
                        isChecked,
                        categories,
                        setCategories
                      );
                    }}
                    optionList={categoriesOptions}
                    displayName={getCategoriesDropdownDisplayName()}
                  />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown
                    placeholder="單坪售價"
                    displayName={getRangeDisplay({
                      isMoney: true,
                      max: singleMax,
                      min: singleMin,
                      rangeMax: 200,
                      rangeMin: 20,
                      unit: '萬/坪',
                    })}
                  >
                    <div className={styles.rangeContainer}>
                      <RangeSlider
                        rangeMax={200}
                        rangeMin={20}
                        step={5}
                        min={singleMin}
                        max={singleMax}
                        onChange={(values) => {
                          setSingleMin(values[0]);
                          setSingleMax(values[1]);
                        }}
                        type="perSquare"
                      />
                    </div>
                  </Dropdown>
                </div>
                <div className={styles.dropdown}>
                  <Dropdown
                    placeholder="權狀坪數"
                    displayName={getRangeDisplay({
                      isMoney: true,
                      max: squareMax,
                      min: squareMin,
                      rangeMax: 150,
                      rangeMin: 1,
                      unit: '坪',
                    })}
                  >
                    <div className={styles.rangeContainer}>
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
                    </div>
                  </Dropdown>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.stickySearchBar}>
            <GroupTabDropdown
              selectedTab={selectedTab}
              tabOptions={ORIGIN_OPTION_LIST}
              onChange={(value) => setSelectedTab(value)}
            />
            <div className={styles.group}>
              <div className={styles.cityDropdown}>
                <Dropdown
                  isHasNoBorder
                  dropdownType="city"
                  value={city}
                  onChange={(key) => setCity(key)}
                  optionList={citiesOptions}
                  displayName={city?.displayName}
                />
              </div>
              <div className={styles.searchInput}>
                <Input
                  iconPosition="left"
                  placeholder="請輸入地點/街道/社區或其他資訊"
                />
              </div>
              <Button
                buttonText="搜尋"
                textStyle={{
                  color: '#FFF',
                }}
                buttonStyle={{
                  backgroundColor: '#FF8E26',
                  padding: '16px 22px 16px 16px',
                  gap: '8px',
                }}
                icon={<SearchIcon color="#FFFFFF" />}
                iconPosition="left"
                action={() => onSearch()}
              />
            </div>
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
                opacity: 0.6,
                padding: '8px 16px 8px 16px',
                gap: '8px',
              }}
              action={() => {
                toggleOpen();

                window.scrollTo({ top: 527 });
                // if (window.scrollY > 527) window.scrollTo({ top: 527 });
              }}
            />
            <Button
              buttonText="篩選更多"
              buttonType="transparent"
              iconPosition="right"
              icon={<Arrow />}
              textStyle={{
                color: '#333',
                fontSize: '14px',
                lineHeight: '20px',
              }}
              buttonStyle={{
                border: '1px solid #E9E9E9',
                opacity: 0.6,
                padding: '8px 8px 8px 16px',
                gap: '8px',
              }}
              action={() => router.push('/Search')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
