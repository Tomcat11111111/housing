'use client';

import { useRouter } from 'next/navigation';

import BurgerMenu from '@/common/BurgerMenu/BurgerMenu';
import Button from '@/common/Button/Button';

import Logo from '@/components/common/Logo/Logo';

import Account from '@/icon/Account/Account';

import styles from './Header.module.scss';

const Header = ({ headerType = 'default' }) => {
  const router = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div
        className={styles.header}
        data-header={headerType === 'white' ? 'white' : ''}
      >
        <div className={styles.headerContent}>
          <div className={styles.iconArea}>
            <Logo size="big" />
          </div>
          {headerType === 'white' && (
            <div className={styles.linkArea}>
              <button
                data-active={'active'}
                onClick={() => {
                  router.push('/');
                }}
              >
                首頁
              </button>
              |
              <button
                onClick={() => {
                  router.push(`/auction`);
                }}
              >
                拍賣特區
              </button>
              |
              <button
                onClick={() => {
                  router.push(`/discount`);
                }}
              >
                破盤特區
              </button>
              |
              <button
                onClick={() => {
                  router.push(`/flat`);
                }}
              >
                平轉特區
              </button>
            </div>
          )}
          <div className={styles.buttonArea}>
            {headerType === 'default' && (
              <>
                <Button
                  buttonText="在TOPRE上刊登物件"
                  textStyle={{ fontWeight: 600, lineHeight: '20px' }}
                  buttonStyle={{
                    padding: '8px',
                  }}
                  buttonType="transparent"
                />
                <div className={styles.memberArea}>
                  <div className={styles.memberButton}>
                    <Button
                      buttonText="登入"
                      textStyle={{ lineHeight: '20px' }}
                      buttonStyle={{
                        padding: '8px  12px',
                      }}
                      buttonType="transparent"
                    />
                    |
                    <Button
                      buttonText="註冊"
                      textStyle={{ lineHeight: '20px' }}
                      buttonStyle={{
                        padding: '8px 12px',
                      }}
                      buttonType="transparent"
                    />
                  </div>
                  <Account color="#0936D8" />
                </div>
              </>
            )}
            {headerType === 'white' && (
              <button className={styles.burger}>
                <BurgerMenu />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
