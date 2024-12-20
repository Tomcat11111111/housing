'use client';

import { Suspense, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { filter, find, map, propEq } from 'ramda';

import Footer from '@/layout/Footer/Footer';
import HeaderWithSearch from '@/layout/HeaderWithSearch/HeaderWithSearch';

import RecommendList from '@/components/RecommendList/RecommendList';
import Loading from '@/components/layout/Loading/Loading';

import useSearchStore from '@/store/useSearchStore';

import styles from './Detail.module.scss';
import Main from './Main';

export default function Detail({ params }) {
  const { type } = params;

  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedTab, setSelectedTab } = useSearchStore();

  const [cityId, setCityId] = useState({ id: 1, displayName: '台北市' });
  const [search, setSearch] = useState('');

  const propertyId = searchParams.get('id');

  const getDetailApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/${type === 'rent' ? 'for-rent' : 'for-sale'}/${propertyId}`
    );
    return response.data;
  };

  const { isSuccess, data: detailData } = useQuery({
    queryKey: [`detail_${propertyId}`],
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
      <div className={styles.recommendBox}>
        <RecommendList type="buy" queryKey="detail_2" />
        <RecommendList type="rent" queryKey="detail_1" />
      </div>
      <Footer />
    </Suspense>
  );
}
