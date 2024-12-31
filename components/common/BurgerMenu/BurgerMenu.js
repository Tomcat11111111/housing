import React, { useEffect, useState } from 'react';

import { useToast } from '@/app/contexts/ToastContext';
import { useRouter } from 'next/navigation';

import { useAuthTypeStore } from '@/store/useAuthStore';

import Account from '../../icon/Account/Account';
import Close from '../../icon/Close/Close';
import Menu from '../../icon/Menu/Menu';
import styles from './BurgerMenu.module.scss';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { setAuthType, setModalOpen, hasToken, checkToken, logout } =
    useAuthTypeStore();
  const { showToast } = useToast();

  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={styles.burgerMenu}
    >
      {isOpen ? <Close /> : <Menu />}

      {isOpen && (
        <div className={styles.menuContainer}>
          {!hasToken ? (
            <>
              <div
                className={styles.menuItem}
                style={{ color: '#CCCCCC' }}
                onClick={() => {
                  // onListClick(item, key);
                }}
              >
                未登入
                <Account />
              </div>
              <hr className={styles.hr} />
              <div
                className={styles.menuItem}
                style={{ fontWeight: 700 }}
                onClick={() => {
                  setAuthType('signup');
                  setModalOpen(true);
                }}
              >
                註冊
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  setAuthType('signin');
                  setModalOpen(true);
                }}
              >
                登入
              </div>
              <hr className={styles.hr} />
              <div
                className={styles.menuItem}
                onClick={() => {
                  setAuthType('unauthorized');
                  setModalOpen(true);
                }}
              >
                在TOPRE上刊登物件
              </div>
            </>
          ) : (
            <>
              <div className={styles.menuItem}>
                王小明 先生
                <Account />
              </div>
              <hr className={styles.hr} />
              <div className={styles.menuItem} onClick={() => {}}>
                帳號管理
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  router.push('/member');
                }}
              >
                收藏管理
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  router.push('/member/management');
                }}
              >
                物件管理
              </div>
              <hr className={styles.hr} />
              <div
                className={styles.menuItem}
                onClick={() => {
                  router.push('/q&a');
                }}
              >
                說明中心
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  logout();
                  router.push('/');
                  showToast('success', '已登出');
                }}
              >
                登出
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BurgerMenu;
