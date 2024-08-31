'use client';

import { useEffect, useRef, useState } from 'react';

import Button from '@components/common/Button/Button';
import Dropdown from '@components/common/Dropdown/Dropdown';
import ItemCard from '@components/common/ItemCard/ItemCard';
import House from '@components/icon/House/House';
import HeaderWithSearch from '@layout/HeaderWithSearch/HeaderWithSearch';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { find, propEq, sort } from 'ramda';

import styles from './Search.module.scss';
import Sidebar from './Sidebar';

const FILTER_DROPDOWN_LIST = [
  { id: '', displayName: '預設' },
  { id: '-price', displayName: '金額 大到小' },
  { id: '+price', displayName: '金額 小到大' },
  { id: '-squareMeters', displayName: '坪數 大到小' },
  { id: '+squareMeters', displayName: '坪數 小到大' },
  { id: '-createdAt', displayName: '刊登時間 新到舊' },
  { id: '+createdAt', displayName: '刊登時間 舊到新' },
];

const ORIGIN_OPTION_LIST = [
  { displayName: '租房子', id: 'rent', icon: House },
  { displayName: '買房子', id: 'buy', icon: House },
  { displayName: '新建案', id: 'new', icon: House },
];

const getOriginFilterParams = (searchParams, setFilterParams) => {
  let tempParams = {};
  if (searchParams.get('selectedTab')) {
    tempParams.selectedTab = searchParams.get('selectedTab');
  }

  setFilterParams((prev) => ({
    ...prev,
    ...tempParams,
  }));
};

const defaultFilterParams = {
  city: { id: 1, displayName: '台北市' },
  cityIds: 2,
  districtId: 1,
  limit: 10,
  categoryIds: [],
  minMonthlyRent: 0,
  maxMonthlyRent: 0,
  room: 0,
  livingRoom: 0,
  bathroom: 0,
  balcony: 0,
  featureIds: [],
  minFloor: 0,
  maxFloor: 0,
  shapeIds: [],
  minSquareMeters: 0,
  maxSquareMeters: 0,
  decorLevelIds: [],
  materialIds: [],
  ruleIds: [],
};

export default function Search() {
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState('rent');
  const [filterParams, setFilterParams] = useState(defaultFilterParams);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [filterOption, setFilterOption] = useState('');
  const [cardWidth, setCardWidth] = useState(null);

  const cardListRef = useRef(null);

  const calculateCardNum = () => {
    const cardListWidth = cardListRef.current?.offsetWidth;
    const cardNum = Math.floor((cardListWidth + 16) / 286);

    setCardWidth((cardListWidth - (cardNum - 1) * 16) / cardNum);
  };

  useEffect(() => {
    calculateCardNum();

    window.addEventListener('resize', calculateCardNum);

    return () => {
      window.removeEventListener('resize', calculateCardNum);
    };
  });

  const getRentPropertiesApi = async (data) => {
    try {
      const reponse = await axios.get(
        'https://jzj-api.zeabur.app/properties/for-rent',
        {
          params: { ...data.meta, sort: filterOption },
        }
      );

      return reponse.data;
    } catch (error) {}
  };

  const formatCardData = (reponse) => {
    const { total, data = [] } = reponse;
    const formatData = data.map((item) => ({
      ...item.property,
      price: item.price,
    }));

    return {
      total: total,
      list: formatData,
    };
  };

  const { data: queryResult, isFetching } = useQuery({
    queryKey: ['getRentPropertiesApi', filterParams, filterOption],
    queryFn: getRentPropertiesApi,
    select: formatCardData,
    meta: filterParams,
    initialData: {
      total: 0,
      list: [],
    },
  });

  useEffect(() => {
    getOriginFilterParams(searchParams, setFilterParams);
  }, [searchParams]);

  return (
    <div>
      <div className={styles.header}>
        <HeaderWithSearch
          headerType="white"
          city={filterParams.city}
          onCityChange={(city) => {
            console.log('city', city);
            setFilterParams({ ...filterParams, city: city, cityIds: city.id });
          }}
          selectedTab={selectedTab}
          tabOptions={ORIGIN_OPTION_LIST}
          onChange={(value) => setSelectedTab(value)}
        />
      </div>
      <div className={styles.page}>
        {isSideBarOpen && (
          <Sidebar
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            total={queryResult?.total}
            city={filterParams.city}
            originFilterParams={filterParams}
            setFilterParams={setFilterParams}
            selectedTab={selectedTab}
          />
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
                onChange={(id) => setFilterOption(id)}
                displayName={
                  find(propEq(filterOption, 'id'))(FILTER_DROPDOWN_LIST)
                    ?.displayName
                }
              />
            </div>
          </div>
          <div className={styles.cardList} ref={cardListRef}>
            {!isFetching &&
              queryResult.list.length > 0 &&
              queryResult?.list.map((itemData, index) => (
                <div
                  className={styles.cardContainer}
                  style={{
                    width: `${cardWidth}px`,
                  }}
                  key={index}
                >
                  {cardWidth && (
                    <ItemCard
                      itemData={itemData}
                      index={index}
                      averagePrice={12000}
                    />
                  )}
                </div>
              ))}
            {!isFetching && queryResult.list.length === 0 && (
              <div className={styles.noResult}>沒有資料</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
