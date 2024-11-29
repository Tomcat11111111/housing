'use client';

import { Suspense, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/common/Button/Button';
import CardCarouselBox from '@/common/CardCarouselBox/CardCarouselBox';

import Footer from '@/layout/Footer/Footer';
import HeaderWithSearch from '@/layout/HeaderWithSearch/HeaderWithSearch';

import useSearchStore from '@/store/useSearchStore';

import SmallArrow from '@/icon/SmallArrow/SmallArrow';

import styles from './Detail.module.scss';
import Main from './Main';

export default function Detail() {
  const router = useRouter();

  const { selectedTab, setSelectedTab } = useSearchStore();

  const [cityId, setCityId] = useState({ id: 1, displayName: '台北市' });
  const [search, setSearch] = useState('');

  const getRecommendationsApi = async () => {
    const response = await axios.get(
      'https://jzj-api.zeabur.app/properties/for-rent?limit=4&offset=0&sort=-views' // 先寫租的
    );
    return response.data;
  };

  const formatCardData = (reponse) => {
    const { data = [] } = reponse;
    const formatData = data.map((item) => ({
      ...item.property,
      price: item.price,
    }));

    return formatData;
  };

  const { data: recommendationsList } = useQuery({
    queryKey: ['getRecommendationsData'],
    queryFn: getRecommendationsApi,
    select: formatCardData,
    initialData: [],
  });

  return (
    <Suspense>
      <div className={styles.header}>
        <HeaderWithSearch
          headerType="white"
          city={cityId}
          onCityChange={(value) => setCityId(value)}
          padding="0 172px"
          selectedTab={selectedTab}
          onChange={(value) => {
            setSelectedTab(value);
            router.push('/Search');
          }}
          input={search}
          setInput={(value) => setSearch(value)}
        />
      </div>
      <Main />
      <div className={styles.recommendBox}>
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>熱門物件</span>
            <Button
              buttonText="瀏覽更多"
              buttonType="transparent"
              iconPosition="right"
              icon={<SmallArrow />}
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
          <CardCarouselBox
            cardItemList={[...recommendationsList, ...recommendationsList]}
          />
        </div>
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>熱門物件</span>
            <Button
              buttonText="瀏覽更多"
              buttonType="transparent"
              iconPosition="right"
              icon={<SmallArrow />}
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
          <CardCarouselBox
            cardItemList={[...recommendationsList, ...recommendationsList]}
          />
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
