'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Arrow from '../../component/icon/Arrow/Arrow';
import ArrowBack from '../../component/icon/ArrowBack/ArrowBack';
import ArrowForward from '../../component/icon/ArrowForward/ArrowForward';
import Button from '../../component/common/Button/Button';
import Carousel from '../../component/common/Carousel/Carousel';
import Dropdown from '../../component/common/Dropdown/Dropdown';
import Footer from '../../component/layout/Footer';
import Header from '../../component/layout/Header';
import Input from '../../component/common/Input/Input';
import ItemCard from '../../component/common/ItemCard/ItemCard';
import Search from '../../component/icon/Search/Search';

import House from '../../component/icon/House/House';
import styles from './page.module.scss';

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [headerType, setHeaderType] = useState('default');
  console.log('isSticky', isSticky);

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
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [
    '/image/house.png',
    '/image/house.png',
    '/image/house.png',
    '/image/house.png',
    '/image/house.png',
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
                  src="/icon/domain.svg"
                  alt="account"
                  width={30}
                  height={30}
                />
                <span>拍賣特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Image src="/icon/arrow.svg" alt="account" width={24} height={24} />
          </div>
          <div className={styles.pageCard}>
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Image
                  src="/icon/domain.svg"
                  alt="account"
                  width={30}
                  height={30}
                />
                <span>拍賣特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Image src="/icon/arrow.svg" alt="account" width={24} height={24} />
          </div>
          <div className={styles.pageCard}>
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Image
                  src="/icon/domain.svg"
                  alt="account"
                  width={30}
                  height={30}
                />
                <span>拍賣特區</span>
              </div>
              <p>可以找到相對低價的物件，歡迎來掏寶找好房屋。</p>
            </div>
            <Image src="/icon/arrow.svg" alt="account" width={24} height={24} />
          </div>
        </div>
        <div className={styles.search} data-sticky={isSticky ? 'sticky' : ''}>
          <div className={styles.searchHeader}>
            <div className={styles.tabArea}>
              <Button
                buttonText="買房子"
                textStyle={{ color: '#FFFFFF' }}
                buttonStyle={{
                  backgroundColor: '#FF8E26',
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#FFFFFF" />}
                iconPosition="left"
              />
              <Button
                buttonText="新建案"
                textStyle={{ color: '#CCCCCC' }}
                buttonStyle={{
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#CCCCCC" />}
                iconPosition="left"
              />
              <Button
                buttonText="租房子"
                textStyle={{ color: '#CCCCCC' }}
                buttonStyle={{
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#CCCCCC" />}
                iconPosition="left"
              />
            </div>
            <div className={styles.buttonArea}>
              <Button
                buttonText="進階篩選"
                iconPosition="left"
                icon={
                  <Image
                    src="/icon/setting.svg"
                    alt="setting"
                    width={24}
                    height={24}
                  />
                }
                textStyle={{
                  color: '#333',
                  fontFamily: 'Noto Sans TC',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                buttonStyle={{
                  border: '1px solid #E9E9E9',
                  opacity: 0.6,
                  padding: '8px 16px 8px 16px',
                  gap: '8px',
                }}
              />
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
          </div>
          <div className={styles.mapFill}></div>
          <div className={styles.searchBar}>
            <Dropdown
              isHasBorder={false}
              optionList={[
                { text: '台北市', value: 'taipei' },
                { text: '高雄市', value: 'kaoshiun' },
                { text: '台南市', value: 'tainan' },
                { text: '花蓮市', value: 'hualien' },
              ]}
              value="taipei"
            />
            <div className={styles.searchInput}>
              <Input
                iconPosition="left"
                placeholder="請輸入地點/街道/社區或其他資訊"
              />
            </div>

            <Button
              buttonText="搜尋"
              textStyle={{
                color: '#FFF',
              }}
              buttonStyle={{
                backgroundColor: '#FF8E26',
                padding: '16px 22px 16px 16px',
                gap: '8px',
              }}
              icon={<Search color="#FFFFFF" />}
              iconPosition="left"
            />
          </div>
          <div className={styles.dropdownBar}>
            <div className={styles.dropdown}>
              <Dropdown isHasBorder placeholder="物件類型" />
            </div>
            <div className={styles.dropdown}>
              <Dropdown isHasBorder placeholder="總售價" />
            </div>
            <div className={styles.dropdown}>
              <Dropdown isHasBorder placeholder="單坪售價" />
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
