import Logo from '@components/common/Logo/Logo';
import Image from 'next/image';

import BurgerMenu from '../../common/BurgerMenu/BurgerMenu';
import Button from '../../common/Button/Button';
import Account from '../../icon/Account/Account';
import styles from './Header.module.scss';

const Header = ({ headerType = 'default' }) => {
  return (
    <div
      className={styles.header}
      data-header={headerType === 'white' ? 'white' : ''}
    >
      <div className={styles.headerContent}>
        <div className={styles.iconArea}>
          <Logo />
        </div>
        {headerType === 'white' && (
          <div className={styles.linkArea}>
            <button data-active={'active'}>首頁</button>|
            <button>拍賣特區</button>|<button>破盤特區</button>|
            <button>平轉特區</button>
          </div>
        )}
        <div className={styles.buttonArea}>
          {headerType === 'default' && (
            <>
              <Button
                buttonText="我有房子"
                buttonType="orange"
                textStyle={{ color: '#FFFFFF' }}
                buttonStyle={{
                  backgroundColor: '#FF8E26',
                  padding: '8px',
                }}
              />
              <Button
                buttonText="我有廣告"
                buttonType="orange"
                textStyle={{ color: '#FFFFFF' }}
                buttonStyle={{
                  backgroundColor: '#FF8E26',
                  padding: '8px',
                }}
              />
              <div className={styles.memberArea}>
                <div>登入</div>
                <div>|</div>
                <div style={{ fontWeight: 700 }}>註冊</div>
                <Account />
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
  );
};

export default Header;
