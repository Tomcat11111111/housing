'use client';

import { useState } from 'react';

import Button from '@common/Button/Button';
import CardCarouselBox from '@common/CardCarouselBox/CardCarouselBox';
import Arrow from '@icon/Arrow/Arrow';
import Footer from '@layout/Footer/Footer';
import HeaderWithSearch from '@layout/HeaderWithSearch/HeaderWithSearch';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import styles from './Detail.module.scss';

export default function Detail() {
  // const url = new URL(window.location.href);
  // const [propertyId, setPropertyId] = useState(url.searchParams.get('id'));
  // console.log('🚀 ~ Detail ~ propertyId:', propertyId);

  const [cityId, setCityId] = useState(1);

  const getDetailApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/for-rent/`
    );
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['detail'],
    queryFn: getDetailApi,
  });

  console.log('🚀 ~ data:', data);
  return (
    <>
      <div className={styles.header}>
        <HeaderWithSearch
          headerType="white"
          city={cityId}
          onCityChange={(value) => setCityId(value)}
          padding="0 172px"
        />
      </div>
      <div className={styles.body}>
        <nav className={styles.toolbar}>
          <div
            className={styles.breadcrumb}
          >{`首頁 > 租房 > 台北市 > 麵包屑`}</div>
          <div className={styles.tool}>收藏、分享</div>
        </nav>
        <figure className={styles.imgArea}>照片</figure>
        <div className={styles.detail}>
          <article className={styles.detailContent}>細節內容</article>
          <aside className={styles.detailSidebar}>填資料</aside>
        </div>
      </div>
      <div className={styles.recommendArea}>
        <section className={styles.recommend}>
          <div className={styles.recommendArea}>
            <div className={styles.recommendTitle}>
              <span>其他推薦</span>
              {/* <Button
                buttonText="瀏覽更多"
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
              /> */}
            </div>
            <CardCarouselBox />
          </div>
        </section>
        <section className={styles.recommend}>
          <div className={styles.recommendArea}>
            <div className={styles.recommendTitle}>
              <span>附近物件</span>
              {/* <Button
                buttonText="瀏覽更多"
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
              /> */}
            </div>
            <CardCarouselBox />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
