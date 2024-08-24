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
import Remove from '@icon/Remove/Remove';
import SearchIcon from '@icon/SearchIcon/SearchIcon';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { find, propEq } from 'ramda';

import styles from './SearchBar.module.scss';

const SearchBar = (props) => {
  const { isFixed } = props;

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

  const [selectedTab, setSelectedTab] = useState('rent');
  const [isOpen, setIsOpen] = useState(true);
  const [userToggled, setUserToggled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [rentMax, setRentMax] = useState(20000);
  const [rentMin, setRentMin] = useState(12000);
  const [singleMax, setSingleMax] = useState(70);
  const [singleMin, setSingleMin] = useState(50);
  const [squareMax, setSquareMax] = useState(25);
  const [squareMin, setSquareMin] = useState(15);
  const [roomCount, setRoomCount] = useState(0);
  const [livingRoomCount, setLivingRoomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [balconyCount, setBalconyCount] = useState(0);

  const timeoutRef = useRef(null);

  const mapRef = useRef(null);
  const [city, setCity] = useState(1);

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

  const handleScroll = () => {
    if (window.scrollY > 1069 && !userToggled && isOpen) {
      // 419+108= 527+542=1069
      setIsOpen(false);
    }

    if (window.scrollY <= 1069 && !userToggled && !isOpen) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && isOpen) {
      initMap();
    }
  }, [isOpen]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    setUserToggled(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setUserToggled(false);
    }, 3000); // 3秒後重置userToggled
  };

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.search} data-fixed={isFixed ? 'fixed' : ''}>
      {isOpen ? (
        <>
          <div className={styles.searchHeader}>
            <GroupTab onChange={(value) => setSelectedTab(value)} />
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
                action={() => toggleCollapse()}
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
                value={city}
                dropdownType="city"
                onChange={(key) => setCity(key)}
                optionList={citiesOptions}
                displayName={find(propEq(city, 'id'))(citiesOptions)}
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
                  />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown placeholder="租金" onChange={(values) => {}}>
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
                  <Dropdown placeholder="格局">
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
                    // TODO: 這邊應該要接不一樣的API
                  />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown placeholder="單坪售價">
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
                  <Dropdown placeholder="權狀坪數">
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
            <GroupTabDropdown onChange={(value) => setSelectedTab(value)} />
            <div className={styles.group}>
              <div className={styles.cityDropdown}>
                <Dropdown
                  isHasNoBorder
                  dropdownType="city"
                  value={city}
                  onChange={(key) => setCity(key)}
                  optionList={citiesOptions}
                  displayName={
                    find(propEq(city, 'id'))(citiesOptions)?.displayName
                  }
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
              action={() => toggleCollapse()}
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
