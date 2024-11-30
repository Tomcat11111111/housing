'use client';

import { Suspense, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { filter, find, map, propEq } from 'ramda';

import Button from '@/common/Button/Button';
import CardCarouselBox from '@/common/CardCarouselBox/CardCarouselBox';

import Footer from '@/layout/Footer/Footer';
import HeaderWithSearch from '@/layout/HeaderWithSearch/HeaderWithSearch';

import Loading from '@/components/layout/Loading/Loading';

import useSearchStore from '@/store/useSearchStore';

import SmallArrow from '@/icon/SmallArrow/SmallArrow';

import styles from './Detail.module.scss';
import Main from './Main';

export default function Detail({ params }) {
  const { type } = params;

  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedTab, setSelectedTab } = useSearchStore();

  const [cityId, setCityId] = useState({ id: 1, displayName: '台北市' });
  const [search, setSearch] = useState('');

  const getRecommendationsApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/${type === 'rent' ? 'for-rent' : 'for-sale'}?limit=4&offset=0&sort=-views`
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

  const { isSuccess: isRecommendSuccess, data: recommendationsList } = useQuery(
    {
      queryKey: ['getRecommendationsData'],
      queryFn: getRecommendationsApi,
      select: formatCardData,
    }
  );

  const propertyId = searchParams.get('id');

  const getDetailApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/${type === 'rent' ? 'for-rent' : 'for-sale'}/${propertyId}`
    );
    return response.data;
  };

  const { isSuccess, data: detailData } = useQuery({
    queryKey: ['detail'],
    queryFn: getDetailApi,
    select: (response) => {
      if (type === 'buy') return response;

      const { property = {}, rentalOffersAndRules } = response;
      let modifyRules = [];

      const [landLordOffer, equipments, rules = {}] = rentalOffersAndRules;
      const { content = [] } = rules;

      const tempRules =
        content.length > 0
          ? filter((rule) => rule?.subtitle !== '租金內含', content)
          : [];

      const inclusions =
        content.length > 0 ? find(propEq('租金內含', 'subtitle'))(content) : '';

      if (tempRules.length > 0) {
        modifyRules = map((rule) => {
          if (rule?.subtitle === '可遷入日') {
            const date = dayjs(rule.description);

            if (date.get('year')) {
              rule.description =
                date.get('year') +
                '年' +
                (date.get('month') + 1) +
                '月' +
                date.get('date') +
                '日';
            }
          }

          return rule;
        })(tempRules);
      }

      return {
        ...response,
        landLordOffer,
        property,
        modifyRules,
        inclusions,
        equipments,
      };
    },
    enabled: !!propertyId,
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
            router.push('/search');
          }}
          input={search}
          setInput={(value) => setSearch(value)}
        />
      </div>
      {isSuccess && <Main type={type} detailData={detailData} />}
      {!isSuccess && (
        <div className={styles.loadingContainer}>
          <Loading text="資料讀取中" />
        </div>
      )}
      {isRecommendSuccess && (
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
            <CardCarouselBox cardItemList={[...recommendationsList]} />
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
            <CardCarouselBox cardItemList={[...recommendationsList]} />
          </div>
        </div>
      )}
      <Footer />
    </Suspense>
  );
}
