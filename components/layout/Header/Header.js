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
          <Logo size="big" />
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
                buttonText="在TOPRE上刊登物件"
                textStyle={{ fontWeight: 600, lineHeight: '20px' }}
                buttonStyle={{
                  padding: '8px',
                }}
                buttonType="transparent"
              />
              <div className={styles.memberArea}>
                <div style={{ cursor: 'pointer' }}>登入</div>
                <div>|</div>
                <div style={{ cursor: 'pointer' }}>註冊</div>
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
  );
};

export default Header;
