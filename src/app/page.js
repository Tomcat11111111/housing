'use client';

import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

import Button from '@/common/Button/Button';
import CardCarouselBox from '@/common/CardCarouselBox/CardCarouselBox';
import Carousel from '@/common/Carousel/Carousel';

import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/Header';
import SearchBar from '@/layout/SearchBar/SearchBar';

import useSearchStore from '@/store/useSearchStore';

import Arrow from '@/icon/Arrow/Arrow';
import Domain from '@/icon/Domain/Domain';
// import ArrowBack from '@/icon/ArrowBack/ArrowBack';
// import ArrowDropdownDown from '@/icon/ArrowDropdownDown/ArrowDropdownDown';
// import ArrowDropdownUp from '@/icon/ArrowDropdownUp/ArrowDropdownUp';
// import ArrowForward from '@/icon/ArrowForward/ArrowForward';
import SmallArrow from '@/icon/SmallArrow/SmallArrow';

import styles from './page.module.scss';

export default function Home() {
  const [headerType, setHeaderType] = useState('default');
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  const { setSelectedTab } = useSearchStore();

  const handleScroll = useCallback(() => {
    // Adjusting based on scroll position
    if (window.scrollY > 530) {
      setHeaderType('white');
    } else {
      setHeaderType('default');
    }

    // if (window.scrollY > 1069) {
    if (window.scrollY > 761) {
      // fixed區域
      if (!isFixed) setIsFixed(true);
      if (isOpen) setIsOpen(false);
    } else {
      // 不fixed區域
      if (isFixed) setIsFixed(false);
      if (!isOpen) setIsOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const images = [
    '/housing/image/Banner_1.png',
    '/housing/image/Banner_2.png',
    '/housing/image/Banner_3.png',
  ];

  const getRentalRecommendationsApi = async () => {
    const response = await axios.get(
      'https://jzj-api.zeabur.app/properties/for-rent?limit=4&offset=0&sort=-views' // 先寫租的
    );
    return response.data;
  };

  const getSaleRecommendationsApi = async () => {
    const response = await axios.get(
      'https://jzj-api.zeabur.app/properties/for-sale?limit=4&offset=0&sort=-views' // 先寫租的
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

  const { data: rentalRecommendationsList } = useQuery({
    queryKey: ['getRentalRecommendationsData'],
    queryFn: getRentalRecommendationsApi,
    select: formatCardData,
    initialData: [],
  });

  const { data: saleRecommendationsList } = useQuery({
    queryKey: ['getSaleRecommendationsData'],
    queryFn: getSaleRecommendationsApi,
    select: formatCardData,
    initialData: [],
  });

  return (
    <main className={styles.basic}>
      <Header headerType={headerType} />
      <div className={styles.page}>
        {/* TODO:整理Arrow
         <Arrow />
        <ArrowBack />
        <ArrowForward />
        <ArrowDropdownDown />
        <ArrowDropdownUp /> */}
        <div className={styles.carouselContainer}>
          <Carousel
            images={images}
            indicatorsPosition="right"
            width={1200}
            height={400}
            isAutoSlide
            isHasIndicator
          />
        </div>
        <div className={styles.pageCardArea}>
          <div
            className={styles.pageCard}
            onClick={() => {
              setSelectedTab('buy');
              router.push(`/Search`);
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Domain />
                <span>售屋區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Arrow />
          </div>
          <div
            className={styles.pageCard}
            onClick={() => {
              setSelectedTab('rent');
              router.push(`/Search`);
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Domain />
                <span>租屋區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Arrow />
          </div>
          <div
            className={styles.pageCard}
            onClick={() => {
              router.push(`/discount`);
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Domain />
                <span>破盤區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Arrow />
          </div>
        </div>
        {/* {isFixed && <div style={{ height: '524px' }}></div>} */}
        {isFixed && <div style={{ height: '237px' }}></div>}
        <SearchBar isFixed={isFixed} isOpen={isOpen} setIsOpen={setIsOpen} />
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
              action={() => router.push('/recommand')}
            />
          </div>
          <CardCarouselBox
            cardItemList={saleRecommendationsList}
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
              action={() => router.push('/recommand')}
            />
          </div>
          <CardCarouselBox
            cardItemList={rentalRecommendationsList}
          />
        </div>
      </div>
      <Footer />
      {/* <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCudV7XzW3pXqAE-RljZ5JdGkOE8Dd-XQM&callback=initMap`}
        strategy="beforeInteractive"
      /> */}
    </main>
  );
}
