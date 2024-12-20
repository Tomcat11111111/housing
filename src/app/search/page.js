'use client';

import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { find, propEq } from 'ramda';

import HeaderWithSearch from '@/layout/HeaderWithSearch/HeaderWithSearch';
import Loading from '@/layout/Loading/Loading';
import NoData from '@/layout/NoData/NoData';

import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import ItemCard from '@/components/common/ItemCard/ItemCard';

import useSearchStore from '@/store/useSearchStore';

import styles from './Search.module.scss';
import Sidebar from './Sidebar';

const FILTER_RENT_DROPDOWN_LIST = [
  { id: '', displayName: '預設' },
  { id: encodeURIComponent('-price'), displayName: '金額 大到小' },
  { id: encodeURIComponent('+price'), displayName: '金額 小到大' },
  { id: encodeURIComponent('-squareMeters'), displayName: '坪數 大到小' },
  { id: encodeURIComponent('+squareMeters'), displayName: '坪數 小到大' },
  { id: encodeURIComponent('-createdAt'), displayName: '刊登時間 新到舊' },
  { id: encodeURIComponent('+createdAt'), displayName: '刊登時間 舊到新' },
];

const FILTER_SALE_DROPDOWN_LIST = [
  { id: '', displayName: '預設' },
  { id: encodeURIComponent('-totalPrice'), displayName: '金額 大到小' },
  { id: encodeURIComponent('+totalPrice'), displayName: '金額 小到大' },
  { id: encodeURIComponent('-ownership'), displayName: '坪數 大到小' },
  { id: encodeURIComponent('+ownership'), displayName: '坪數 小到大' },
  { id: encodeURIComponent('-createdAt'), displayName: '刊登時間 新到舊' },
  { id: encodeURIComponent('+createdAt'), displayName: '刊登時間 舊到新' },
];

const defaultFilterParams = {
  districtId: null,
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
  const {
    selectedTab,
    setSelectedTab,
    searchBarParams,
    searchCity,
    searchInput,
  } = useSearchStore();

  const [filterParams, setFilterParams] = useState(defaultFilterParams);
  const [city, setCity] = useState(searchCity);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [filterOption, setFilterOption] = useState('');
  const [cardWidth, setCardWidth] = useState(null);
  const [input, setInput] = useState(searchInput);

  const cardListRef = useRef(null);
  const searchRef = useRef('');

  const calculateCardNum = () => {
    const cardListWidth = cardListRef.current?.offsetWidth;
    const cardNum = Math.floor((cardListWidth + 16) / 316);

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
      const response = await axios.get(
        `https://jzj-api.zeabur.app/properties/${selectedTab === 'rent' ? 'for-rent' : 'for-sale'}`,
        {
          params: data.meta,
        }
      );

      return response.data;
    } catch (error) {}
  };

  const formatCardData = (response) => {
    const { total, data = [] } = response;

    const formatData = data.map((item) => ({
      ...item.property,
      price: item.price ?? null,
      totalPrice: item.totalPrice ?? null,
      unitPrice: item.unitPrice ?? null,
    }));

    return {
      total: total,
      list: formatData,
    };
  };

  const {
    refetch,
    data: queryResult,
    isFetching,
  } = useQuery({
    queryKey: [
      'getRentPropertiesApi',
      filterOption,
      selectedTab,
      city,
      searchRef.current,
    ],
    queryFn: getRentPropertiesApi,
    select: formatCardData,
    meta: {
      ...filterParams,
      address: input,
      sort: filterOption,
      cityIds: city.id,
      search: searchRef.current,
    },
    initialData: {
      total: 0,
      list: [],
    },
  });

  return (
    <div>
      <div className={styles.header}>
        <HeaderWithSearch
          headerType="white"
          city={city}
          onCityChange={setCity}
          selectedTab={selectedTab}
          onChange={(value) => setSelectedTab(value)}
          input={input}
          setInput={setInput}
          search={() => {
            searchRef.current = input;
            refetch();
          }}
        />
      </div>
      <div className={styles.page}>
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          total={queryResult?.total}
          city={city}
          selectedTab={selectedTab}
          setFilterParams={setFilterParams}
        />
        <div className={styles.listContainer}>
          <div className={styles.buttonArea}>
            {!isSideBarOpen && (
              <Button
                buttonText="展開篩選"
                buttonType="transparent"
                iconPosition="right"
                icon={<ChevronRight />}
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
                optionList={
                  selectedTab === 'rent'
                    ? FILTER_RENT_DROPDOWN_LIST
                    : FILTER_SALE_DROPDOWN_LIST
                }
                value={filterOption}
                onChange={(id) => setFilterOption(id)}
                displayName={
                  find(propEq(filterOption, 'id'))(
                    selectedTab === 'rent'
                      ? FILTER_RENT_DROPDOWN_LIST
                      : FILTER_SALE_DROPDOWN_LIST
                  )?.displayName
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
                      type={selectedTab}
                    />
                  )}
                </div>
              ))}
          </div>
          {!isFetching && queryResult.list.length === 0 && (
            <div className={styles.loadingContainer}>
              <NoData />
            </div>
          )}
          {isFetching && (
            <div className={styles.loadingContainer}>
              <Loading text="物件搜尋中" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
