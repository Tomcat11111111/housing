import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../../common/Button/Button';
import Dropdown from '../../common/Dropdown/Dropdown';
import Input from '../../common/Input/Input';
import House from '../../../component/icon/House/House';
import Arrow from '../../../component/icon/Arrow/Arrow';
import Remove from '../../../component/icon/Remove/Remove';
import Search from '../../../component/icon/Search/Search';
import CountySelector from '../../common/Dropdown/CountySelector';
import styles from './SearchBar.module.scss';

const SearchBar = (props) => {
  const { isStickyMode, setIsSticky } = props;

  const mapRef = useRef(null);
  const [county, setCounty] = useState('台北市');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && !isStickyMode) {
      initMap();
    }
  }, [isStickyMode]);

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

  return (
    <div className={styles.search} data-sticky={isStickyMode ? 'sticky' : ''}>
      {isStickyMode ? (
        <div className={styles.stickySearchBar}>
          <Button
            buttonText="買房子"
            textStyle={{ color: '#FFFFFF' }}
            buttonStyle={{
              backgroundColor: '#FF8E26',
              padding: '8px 32px',
              gap: '8px',
            }}
            icon={<House color="#FFFFFF" />}
            iconPosition="left"
          />
          <div className={styles.group}>
            <Dropdown isHasNoBorder value={county}>
              <CountySelector
                value={county}
                onChange={(county) => setCounty(county)}
              />
            </Dropdown>
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
              icon={<Search color="#FFFFFF" />}
              iconPosition="left"
            />
          </div>
          <Button
            buttonText="進階篩選"
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
            // action={() => setIsSticky(false)}
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
          />
        </div>
      ) : (
        <>
          <div className={styles.searchHeader}>
            <div className={styles.tabArea}>
              <Button
                buttonText="買房子"
                textStyle={{ color: '#FFFFFF' }}
                buttonStyle={{
                  backgroundColor: '#FF8E26',
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#FFFFFF" />}
                iconPosition="left"
              />
              <Button
                buttonText="新建案"
                textStyle={{ color: '#CCCCCC' }}
                buttonStyle={{
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#CCCCCC" />}
                iconPosition="left"
              />
              <Button
                buttonText="租房子"
                textStyle={{ color: '#CCCCCC' }}
                buttonStyle={{
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#CCCCCC" />}
                iconPosition="left"
              />
            </div>
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
                // action={() => setIsSticky(true)}
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
              icon={<Search color="#FFFFFF" />}
              iconPosition="left"
            />
          </div>
          <div className={styles.dropdownBar}>
            <div className={styles.dropdown}>
              <Dropdown placeholder="物件類型" dropdownType="checkbox" />
            </div>
            <div className={styles.dropdown}>
              <Dropdown placeholder="總售價" dropdownType="price" />
            </div>
            <div className={styles.dropdown}>
              <Dropdown placeholder="單坪售價" dropdownType="price" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
