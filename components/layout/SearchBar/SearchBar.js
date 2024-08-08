import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import Input from '@common/Input/Input';
import GroupTabDropdown from '@common/GroupTabDropdown/GroupTabDropdown';
import Arrow from '@icon/Arrow/Arrow';
import Remove from '@icon/Remove/Remove';
import SearchIcon from '@icon/SearchIcon/SearchIcon';
import GroupTab from '@common/GroupTab/GroupTab';
import styles from './SearchBar.module.scss';

const BUY_ITEM_TYPE_LIST = [
  { value: '住宅', text: '住宅', isChecked: false },
  { value: '套房', text: '套房', isChecked: false },
  { value: '法拍屋', text: '法拍屋', isChecked: false },
  { value: '車位', text: '車位', isChecked: false },
  { value: '其他', text: '其他', isChecked: false },
];

const RENT_ITEM_TYPE_LIST = [
  { value: '整層住家', text: '整層住家', isChecked: false },
  { value: '獨立套房', text: '獨立套房', isChecked: false },
  { value: '分租套房', text: '分租套房', isChecked: false },
  { value: '雅房', text: '雅房', isChecked: false },
  { value: '車位', text: '車位', isChecked: false },
  { value: '其他', text: '其他', isChecked: false },
];

const SearchBar = (props) => {
  const { isFixed } = props;

  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState('rent');
  const [isOpen, setIsOpen] = useState(true);
  const [userToggled, setUserToggled] = useState(false);
  const timeoutRef = useRef(null);

  const mapRef = useRef(null);
  const [county, setCounty] = useState('台北市');

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
            <Dropdown
              isHasNoBorder
              value={county}
              dropdownType="county"
              onChange={(key) => setCounty(key)}
            />
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
                    optionList={RENT_ITEM_TYPE_LIST}
                  />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown placeholder="租金" dropdownType="price" />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown placeholder="格局" dropdownType="layout" />
                </div>
              </>
            )}
            {selectedTab === 'buy' && (
              <>
                <div className={styles.dropdown}>
                  <Dropdown
                    placeholder="物件類型"
                    dropdownType="checkbox"
                    optionList={BUY_ITEM_TYPE_LIST}
                  />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown placeholder="總售價" dropdownType="price" />
                </div>
                <div className={styles.dropdown}>
                  <Dropdown placeholder="單坪售價" dropdownType="price" />
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
              <Dropdown
                isHasNoBorder
                value={county}
                dropdownType="county"
                onChange={(key) => setCounty(key)}
              />
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
