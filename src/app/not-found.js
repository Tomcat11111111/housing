'use client';

import Header from '@/layout/Header/Header';

import Wrench from '@/icon/Wrench/Wrench';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <>
      <Header headerType="white" />
      <div className={styles.notFoundContainer}>
        <div className={styles.wrench}>
          <Wrench />
        </div>
        <p className={styles.yet}>建置中~盡請期待</p>
      </div>
    </>
  );
}
