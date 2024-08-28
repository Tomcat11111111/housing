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

import styles from './Search.module.scss';
import Sidebar from './Sidebar';

const FILTER_DROPDOWN_LIST = [
  { value: '預設', displayName: '預設' },
  { value: '金額 大到小', displayName: '金額 大到小' },
  { value: '金額 小到大', displayName: '金額 小到大' },
  { value: '坪數 大到小', displayName: '坪數 大到小' },
  { value: '坪數 小到大', displayName: '坪數 小到大' },
  { value: '刊登時間 新到舊', displayName: '刊登時間 新到舊' },
  { value: '刊登時間 舊到新', displayName: '刊登時間 舊到新' },
];

const ORIGIN_OPTION_LIST = [
  { text: '租房子', value: 'rent', icon: House },
  { text: '買房子', value: 'buy', icon: House },
  { text: '新建案', value: 'new', icon: House },
];

const defaultFilterParams = {
  cityId: 1,
  districtId: 1,
  limit: 10,
  // categoryIds: [],
  // minMonthlyRent: 0,
  // maxMonthlyRent: 0,
  // room: 0,
  // livingRoom: 0,
  // bathroom: 0,
  // balcony: 0,
  // featureIds: [],
  // minFloor: 0,
  // maxFloor: 0,
  // shapeIds: [],
  // minSquareMeters: 0,
  // maxSquareMeters: 0,
  // decorLevelIds: [],
  // materialIds: [],
  // ruleIds: [],
};

export default function Search() {
  const [selectedTab, setSelectedTab] = useState('rent');
  const [filterParams, setFilterParams] = useState(defaultFilterParams);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [filterOption, setFilterOption] = useState('預設');
  const [cardWidth, setCardWidth] = useState();

  const cardListRef = useRef(null);

  useEffect(() => {
    const calculateCardNum = () => {
      const cardListWidth = cardListRef.current?.offsetWidth;
      const cardNum = Math.floor((cardListWidth + 16) / 286);

      setCardWidth((cardListWidth - (cardNum - 1) * 16) / cardNum);
    };

    window.addEventListener('resize', calculateCardNum);

    calculateCardNum();

    return () => {
      window.removeEventListener('resize', calculateCardNum);
    };
  }, [isSideBarOpen]);

  const getRentPropertiesApi = async (data) => {
    try {
      const reponse = await axios.get(
        'https://jzj-api.zeabur.app/properties/for-rent',
        {
          params: { ...data.meta },
        }
      );

      return reponse.data;
    } catch (error) {
      console.log(error.message ?? 'Get RentProperties failed');
    }
  };

  const formatCardData = (reponse) => {
    const { total = 0, data = [] } = reponse;
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
    queryKey: ['getRentPropertiesApi', filterParams],
    queryFn: getRentPropertiesApi,
    select: formatCardData,
    meta: filterParams,
    initialData: {
      total: 0,
      list: [],
    },
  });

  // console.log('🚀 ~ filterParams:', filterParams);
  // console.log('🚀 ~ queryResult:', queryResult);

  return (
    <div>
      <div className={styles.header}>
        <HeaderWithSearch
          headerType="white"
          city={filterParams.cityId}
          onCityChange={(value) =>
            setFilterParams({ ...filterParams, cityId: value })
          }
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
            city={filterParams.cityId}
            originFilterParams={filterParams}
            setFilterParams={setFilterParams}
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
                onChange={(item) => setFilterOption(item.value)}
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
