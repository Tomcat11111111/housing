import Logo from '@/components/common/Logo/Logo';

import Account from '@/icon/Account/Account';

import styles from './PublishHeader.module.scss';

const PublishHeader = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.iconArea}>
            <Logo size="big" />
            <span className={styles.stroke}>|</span>
            <p>會員中心</p>
          </div>
          <div className={styles.memberArea}>
            <p>某某某</p>
            <Account color="#0936D8" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublishHeader;
