'use client';

import { useEffect, useState } from 'react';

import Button from '@common/Button/Button';
import CardCarouselBox from '@common/CardCarouselBox/CardCarouselBox';
import Carousel from '@common/Carousel/Carousel';
import Arrow from '@icon/Arrow/Arrow';
import Footer from '@layout/Footer/Footer';
import Header from '@layout/Header/Header';
import SearchBar from '@layout/SearchBar/SearchBar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Script from 'next/script';

import styles from './page.module.scss';

export default function Home() {
  const [headerType, setHeaderType] = useState('default');
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // function throttle(callback, delay) {
  //   let timerID = null;
  //   const throttledFunction = function (...args) {
  //     if (timerID) return;

  //     timerID = setTimeout(() => {
  //       callback.apply(this, args);
  //       timerID = null;
  //     }, delay);
  //   };

  //   return throttledFunction;
  // }

  const handleScroll = () => {
    //400+19+110
    if (window.scrollY > 529) {
      setHeaderType('white');
    } else {
      setHeaderType('default');
    }

    // 419+108= 527+542=1069
    // let fixedHeight = isOpen ? 1069 : 633;

    if (window.scrollY > 1069) {
      setIsFixed(true);
      setIsOpen(false);
    } else {
      setIsFixed(false);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [
    '/housing/image/house.png',
    '/housing/image/banner_example.png',
    '/housing/image/banner_example_2.png',
    '/housing/image/banner_example_3.png',
  ];

  const getRecommendationsApi = async () => {
    const response = await axios.get(
      'https://jzj-api.zeabur.app/recommendations/7a01f65e-7fc3-47b7-983e-3ec2fcad4cff' // 先寫死熱門物件
    );
    return response.data;
  };

  const { data: recommendationsData } = useQuery({
    queryKey: ['getRecommendationsData'],
    queryFn: getRecommendationsApi,
    initialData: [],
  });

  return (
    <main className={styles.basic}>
      <div className={styles.headerContainer}>
        <Header headerType={headerType} />
      </div>
      <div className={styles.page}>
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
          <div className={styles.pageCard}>
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Image
                  src="/housing/icon/domain.svg"
                  alt="account"
                  width={30}
                  height={30}
                />
                <span>拍賣特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Arrow />
          </div>
          <div className={styles.pageCard}>
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Image
                  src="/housing/icon/domain.svg"
                  alt="account"
                  width={30}
                  height={30}
                />
                <span>破盤特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Arrow />
          </div>
          <div className={styles.pageCard}>
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Image
                  src="/housing/icon/domain.svg"
                  alt="account"
                  width={30}
                  height={30}
                />
                <span>平賣特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Arrow />
          </div>
        </div>
        {/* {isFixed && <div style={{ height: isOpen ? '524px' : '88px' }}></div>} */}
        {isFixed && <div style={{ height: '524px' }}></div>}
        <SearchBar isFixed={isFixed} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>{recommendationsData?.title}</span>
            <Button
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
            />
          </div>
          <CardCarouselBox cardItemList={recommendationsData?.properties} />
        </div>
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>{recommendationsData?.title}</span>
            <Button
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
            />
          </div>
          <CardCarouselBox cardItemList={recommendationsData?.properties} />
        </div>
      </div>
      <Footer />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCudV7XzW3pXqAE-RljZ5JdGkOE8Dd-XQM&callback=initMap`}
        strategy="beforeInteractive"
      />
    </main>
  );
}