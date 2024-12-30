'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import BurgerMenu from '@/common/BurgerMenu/BurgerMenu';

import Logo from '@/components/common/Logo/Logo';

import { useAuthTypeStore } from '@/store/useAuthStore';
import useSearchStore from '@/store/useSearchStore';

import Account from '@/icon/Account/Account';

import styles from './Header.module.scss';

const Header = ({ headerType = 'default' }) => {
  const router = useRouter();
  const { selectedTab, setSelectedTab } = useSearchStore();

  const { setAuthType, setModalOpen } = useAuthTypeStore();

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
                  router.push('/search');
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
                  router.push('/search');
                }}
              >
                租屋區
              </button>
              |
              <button
                className={styles.linkButton}
                onClick={() => {
                  router.push('/discount');
                }}
              >
                破盤區
              </button>
            </div>
          )}
          <div className={styles.buttonArea}>
            {headerType === 'default' && (
              <>
                <div className="flex items-center justify-center ">
                  <Button
                    onClick={() => {
                      setAuthType('unauthorized');
                      setModalOpen(true);
                    }}
                    className=" rounded-lg hover:bg-[#e9e9e9] text-[#333333] font-bold"
                  >
                    在TOPRE上刊登物件
                  </Button>
                  |
                </div>
                <div className={styles.memberArea}>
                  <div className={styles.memberButton}>
                    <Button
                      onClick={() => {
                        setAuthType('signin');
                        setModalOpen(true);
                      }}
                      className=" rounded-lg hover:bg-[#e9e9e9] text-[#333333] "
                    >
                      登入
                    </Button>
                    |
                    <Button
                      onClick={() => {
                        setAuthType('signup');
                        setModalOpen(true);
                      }}
                      className=" rounded-lg hover:bg-[#e9e9e9] text-[#333333] "
                    >
                      註冊
                    </Button>
                    |
                  </div>
                  <div
                    className=" cursor-pointer"
                    onClick={() => router.push('/member')}
                  >
                    <Account color="#0936D8" />
                  </div>
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
