'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Arrow from '../../component/icon/Arrow/Arrow';
import ArrowBack from '../../component/icon/ArrowBack/ArrowBack';
import ArrowForward from '../../component/icon/ArrowForward/ArrowForward';
import Button from '../../component/common/Button/Button';
import Carousel from '../../component/common/Carousel/Carousel';
import Footer from '../../component/layout/Footer/Footer';
import Header from '../../component/layout/Header/Header';
import ItemCard from '../../component/common/ItemCard/ItemCard';
import SearchBar from '../../component/layout/SearchBar/SearchBar';
import styles from './page.module.scss';

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [isShrink, setIsShrink] = useState(false);
  const [headerType, setHeaderType] = useState('default');

  const handleScroll = () => {
    //400+19+110
    if (window.scrollY > 529) {
      setHeaderType('white');
    } else {
      setHeaderType('default');
    }

    if (window.scrollY > 527) {
      // 419+108= 527
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }

    if (window.scrollY > 590) {
      // 527+?
      setIsShrink(true);
    } else {
      setIsShrink(false);
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
    '/housing/image/house.png',
    '/housing/image/house.png',
    '/housing/image/house.png',
    '/housing/image/house.png',
  ];

  return (
    <main className={styles.basic}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCudV7XzW3pXqAE-RljZ5JdGkOE8Dd-XQM&libraries=places`}
        strategy="beforeInteractive"
      />
      <div className={styles.headerContainer}>
        <Header headerType={headerType} />
      </div>
      <div className={styles.page}>
        <div className={styles.carouselContainer}>
          <Carousel
            images={images}
            indicatorsPosition="right"
            isAutoSlide
            isHasArrow
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
            <Image
              src="/housing/icon/arrow.svg"
              alt="account"
              width={24}
              height={24}
            />
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
                <span>拍賣特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Image
              src="/housing/icon/arrow.svg"
              alt="account"
              width={24}
              height={24}
            />
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
                <span>拍賣特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Image
              src="/housing/icon/arrow.svg"
              alt="account"
              width={24}
              height={24}
            />
          </div>
        </div>
        <SearchBar isStickyMode={isSticky} isShrinkMode={isShrink} />
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>熱門物件</span>
            <Button
              buttonText="瀏覽更多"
              iconPosition="right"
              icon={<Arrow />}
              textStyle={{
                color: '#333',
                fontFamily: 'Noto Sans TC',
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
          <div className={styles.cardcontainer}>
            <div className={styles.arrowForward}>
              <ArrowForward />
            </div>
            <ItemCard priceStatus="above" />
            <ItemCard priceStatus="below" />
            <ItemCard priceStatus="equal" />
            <div className={styles.arrowBack}>
              <ArrowBack />
            </div>
          </div>
        </div>
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>熱門物件</span>
            <Button
              buttonText="瀏覽更多"
              iconPosition="right"
              icon={<Arrow />}
              textStyle={{
                color: '#333',
                fontFamily: 'Noto Sans TC',
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
          <div className={styles.cardcontainer}>
            <div className={styles.arrowForward}>
              <ArrowForward />
            </div>
            <ItemCard priceStatus="above" />
            <ItemCard priceStatus="below" />
            <ItemCard priceStatus="equal" />
            <div className={styles.arrowBack}>
              <ArrowBack />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
