import Image from 'next/image';
import BurgerMenu from '../common/BurgerMenu/BurgerMenu';
import styles from './Header.module.scss';

const Header = ({ headerType = 'default' }) => {
  return (
    <div
      className={styles.header}
      data-header={headerType === 'white' ? 'white' : ''}
    >
      <div className={styles.headerContent}>
        <div className={styles.iconArea}>
          <Image src="/icon/ellipse.svg" alt="ellipse" width={30} height={30} />
          <Image src="/icon/icon.svg" alt="icon" width={72} height={20} />
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
              <button className={styles.button}>我有房子</button>
              <button className={styles.button}>我有廣告</button>
              <div className={styles.memberArea}>
                <div>登入</div>
                <div>|</div>
                <div>註冊</div>
                <Image
                  src="/icon/account.svg"
                  alt="account"
                  width={30}
                  height={30}
                />
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
