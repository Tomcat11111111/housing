'use client';

import { useRouter } from 'next/navigation';

import BurgerMenu from '@/common/BurgerMenu/BurgerMenu';
import Button from '@/common/Button/Button';

import AuthButton from '@/components/auth/AuthButton';
import Logo from '@/components/common/Logo/Logo';

import useAuthTypeStore from '@/store/useAuthStore';
import useSearchStore from '@/store/useSearchStore';

import Account from '@/icon/Account/Account';

import styles from './Header.module.scss';

const Header = ({ headerType = 'default' }) => {
  const router = useRouter();
  const { selectedTab, setSelectedTab } = useSearchStore();

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
                className={styles.linkButton}
                data-active={selectedTab === '' ? 'active' : ''}
                onClick={() => {
                  router.push('/');
                }}
              >
                首頁
              </button>
              |
              <button
                className={styles.linkButton}
                data-active={selectedTab === 'buy' ? 'active' : ''}
                onClick={() => {
                  setSelectedTab('buy');
                  router.push(`/Search`);
                }}
              >
                售屋區
              </button>
              |
              <button
                className={styles.linkButton}
                data-active={selectedTab === 'rent' ? 'active' : ''}
                onClick={() => {
                  setSelectedTab('rent');
                  router.push(`/Search`);
                }}
              >
                租屋區
              </button>
              |
              <button
                className={styles.linkButton}
                onClick={() => {
                  router.push(`/discount`);
                }}
              >
                破盤區
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
                  action={() => {
                    router.push('/publish');
                  }}
                />
                <div className={styles.memberArea}>
                  <div className={styles.memberButton}>
                    {/* <Button
                      buttonText="登入"
                      textStyle={{ lineHeight: '20px' }}
                      buttonStyle={{
                        padding: '8px 16px',
                      }}
                      buttonType="transparent"
                    /> */}
                    <AuthButton type={'signin'} />|
                    {/* <Button
                      buttonText="註冊"
                      textStyle={{ lineHeight: '20px' }}
                      buttonStyle={{
                        padding: '8px 16px',
                      }}
                      buttonType="transparent"
                    /> */}
                    <AuthButton type={'signup'} />
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
