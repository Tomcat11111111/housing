import People from '@components/icon/People/People';
import Content from '@icon/Content/Content';
import CustomerService from '@icon/CustomerService/CustomerService';
import Info from '@icon/Info/Info';
import Person from '@icon/Person/Person';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './Footer.module.scss';

const Footer = () => {
  const router = useRouter();

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.linkArea}>
          <div>
            <div className={styles.listTitle}>
              <div className={styles.linkIcon}>
                <Info />
              </div>
              <span>關於我們</span>
            </div>
            <ul className={styles.list}>
              <li
                onClick={() => {
                  router.push('/About');
                }}
              >
                關於平台
              </li>
              <li>隱私權聲明</li>
              <li>免責聲明</li>
              <li>消費者保護</li>
              <li>服務說明</li>
            </ul>
          </div>
          <div>
            <div className={styles.listTitle}>
              <div className={styles.linkIcon}>
                <Content />
              </div>
              <span>網站導覽</span>
            </div>
            <ul className={styles.list}>
              <li>買房</li>
              <li>租房</li>
              <li>出租/售</li>
              <li>拍賣特區</li>
              <li>破盤特區</li>
              <li>平轉特區</li>
            </ul>
          </div>
          <div>
            <div className={styles.listTitle}>
              <div className={styles.linkIcon}>
                <Person color="#333333" />
              </div>
              <span>會員服務</span>
            </div>
            <ul className={styles.list}>
              <li>加入會員</li>
              <li>合作業務</li>
            </ul>
          </div>
          <div>
            <div className={styles.listTitle}>
              <div className={styles.linkIcon}>
                <People color="#333333" />
              </div>
              <span>合作提案</span>
            </div>
            <ul className={styles.list}>
              <li>廣告刊登</li>
              <li>投資人專區</li>
            </ul>
          </div>
          <div>
            <div className={styles.listTitle}>
              <div className={styles.linkIcon}>
                <CustomerService color="#333333" />
              </div>
              <span>客服中心</span>
            </div>
            <ul className={styles.list}>
              <li>常見問題</li>
              <li>忘記密碼</li>
              <li>客服電話</li>
            </ul>
          </div>
        </div>
        <p className={styles.companyInfo}>
          客服專線：02-23219884 服務時間：上班日週ㄧ ~ 週五 9:00 ~ 18:30
        </p>
        <p className={styles.companyInfo}>
          Copyright Ⓒ 2024 ICON,Inc. 金智傑股份有限公司
        </p>
      </div>
    </div>
  );
};

export default Footer;
