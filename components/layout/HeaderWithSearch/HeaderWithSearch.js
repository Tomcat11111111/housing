import { useState } from 'react';

import BurgerMenu from '@components/common/BurgerMenu/BurgerMenu';
import Button from '@components/common/Button/Button';
import Dropdown from '@components/common/Dropdown/Dropdown';
import GroupTabDropdown from '@components/common/GroupTabDropdown/GroupTabDropdown';
import Input from '@components/common/Input/Input';
import Logo from '@components/common/Logo/Logo';
import SearchIcon from '@components/icon/SearchIcon/SearchIcon';
import Image from 'next/image';

import styles from './HeaderWithSearch.module.scss';

//TODO: 此元件可再整理過
const HeaderWithSearch = ({
  headerType = 'default',
  city,
  onCityChange = () => {},
  padding = '0 24px',
}) => {
  return (
    <header
      className={styles.header}
      data-header={headerType === 'white' ? 'white' : ''}
      style={{ padding }}
    >
      <div className={styles.iconArea}>
        <Logo />
        <GroupTabDropdown onChange={(value) => console.log('value', value)} />
      </div>
      <div className={styles.searchArea}>
        <Dropdown
          isHasNoBorder
          value={city}
          dropdownType="county"
          onChange={(key) => onCityChange(key)}
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
    </header>
  );
};

export default HeaderWithSearch;
