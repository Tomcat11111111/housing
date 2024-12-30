'use client';

import { useCallback, useEffect, useState } from 'react';

import { Snackbar, SnackbarContent } from '@mui/material';
import { CheckCircleIcon, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Carousel from '@/common/Carousel/Carousel';

import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/Header';
import SearchBar from '@/layout/SearchBar/SearchBar';

import RecommendList from '@/components/RecommendList/RecommendList';

import useSearchStore from '@/store/useSearchStore';
import useToastStore from '@/store/useToastStore';

import Arrow from '@/icon/Arrow/Arrow';
import Domain from '@/icon/Domain/Domain';

// import ArrowBack from '@/icon/ArrowBack/ArrowBack';
// import ArrowDropdownDown from '@/icon/ArrowDropdownDown/ArrowDropdownDown';
// import ArrowDropdownUp from '@/icon/ArrowDropdownUp/ArrowDropdownUp';
// import ArrowForward from '@/icon/ArrowForward/ArrowForward';
import styles from './page.module.scss';

export default function Home() {
  const [headerType, setHeaderType] = useState('default');
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { toastOpen, setToastOpen, status, errorText, successText } =
    useToastStore();

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
    '/image/Banner_1.png',
    '/image/Banner_2.png',
    '/image/Banner_3.png',
  ];

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
              router.push('/search');
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Domain />
                <span>售屋區</span>
              </div>
              <p>可以找到各式出售中的物件，可以用篩選器更快找到喜歡的物件。</p>
            </div>
            <Arrow />
          </div>
          <div
            className={styles.pageCard}
            onClick={() => {
              setSelectedTab('rent');
              router.push('/search');
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.title}>
                <Domain />
                <span>租屋區</span>
              </div>
              <p>可以找到各式出租中的物件，可以用篩選器更快找到喜歡的物件。</p>
            </div>
            <Arrow />
          </div>
          <div
            className={styles.pageCard}
            onClick={() => {
              router.push('/discount');
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
        <RecommendList type="buy" queryKey="home_2" />
        <RecommendList type="rent" queryKey="home_1" />
      </div>
      <Footer />
      {/* Toast訊息 */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => {
          setToastOpen(false);
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: status === 'success' ? '#0ABD13' : '#F44336',
            color: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <SnackbarContent
          message={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {status === 'success' && (
                <CheckCircleIcon style={{ color: '#FFFFFF' }} />
              )}
              {status === 'error' && (
                <ShieldAlert style={{ color: '#FFFFFF' }} />
              )}
              <span>{status === 'success' && successText}</span>
              <span>{status === 'error' && errorText}</span>
            </div>
          }
        />
      </Snackbar>
      ;
    </main>
  );
}
