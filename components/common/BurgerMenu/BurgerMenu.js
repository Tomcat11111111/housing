import React, { useState } from 'react';

import Account from '../../icon/Account/Account';
import Close from '../../icon/Close/Close';
import Menu from '../../icon/Menu/Menu';
import styles from './BurgerMenu.module.scss';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={styles.burgerMenu}
    >
      {isOpen && <Close />}
      {!isOpen && <Menu />}
      {isOpen && (
        <div className={styles.menuContainer}>
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
              // onListClick(item, key);
            }}
          >
            註冊
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              // onListClick(item, key);
            }}
          >
            登入
          </div>
          <hr className={styles.hr} />
          <div
            className={styles.menuItem}
            onClick={() => {
              // onListClick(item, key);
            }}
          >
            我有房子
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              // onListClick(item, key);
            }}
          >
            我有廣告
          </div>
        </div>
      )}
    </div>
  );
}

export default BurgerMenu;
