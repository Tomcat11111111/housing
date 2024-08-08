import { useState } from 'react';
import Image from 'next/image';
import BurgerMenu from '@components/common/BurgerMenu/BurgerMenu';
import Button from '@components/common/Button/Button';
import Dropdown from '@components/common/Dropdown/Dropdown';
import Input from '@components/common/Input/Input';
import SearchIcon from '@components/icon/SearchIcon/SearchIcon';
import GroupTabDropdown from '@components/common/GroupTabDropdown/GroupTabDropdown';
import styles from './Header.module.scss';

const Header = ({ headerType = 'default' }) => {
  const [county, setCounty] = useState('台北市');

  return (
    <div
      className={styles.header}
      data-header={headerType === 'white' ? 'white' : ''}
    >
      <div className={styles.iconArea}>
        <Image
          src="/housing/icon/ellipse.svg"
          alt="ellipse"
          width={30}
          height={30}
        />
        <Image src="/housing/icon/icon.svg" alt="icon" width={72} height={20} />
        <GroupTabDropdown onChange={(value) => console.log('value', value)} />
      </div>
      <div className={styles.searchArea}>
        <Dropdown
          isHasNoBorder
          value={county}
          dropdownType="county"
          onChange={(key) => setCounty(key)}
        />
        <div className={styles.searchInput}>
          <Input
            iconPosition="left"
            placeholder="請輸入地點/街道/社區或其他資訊"
          />
        </div>
        <Button
          buttonText="搜尋"
          textStyle={{
            color: '#FFF',
          }}
          buttonStyle={{
            backgroundColor: '#FF8E26',
            padding: '16px 22px 16px 16px',
            gap: '8px',
          }}
          icon={<SearchIcon color="#FFFFFF" />}
          iconPosition="left"
        />
      </div>
      <div className={styles.buttonArea}>
        <button className={styles.burger}>
          <BurgerMenu />
        </button>
      </div>
    </div>
  );
};

export default Header;
