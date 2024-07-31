import { useEffect, useState } from 'react';
import Button from '@common/Button/Button';
import House from '@components/icon/House/House';
import styles from './GroupTabDropdown.module.scss';

const ORIGIN_OPTION_LIST = [
  { text: '租房子', value: 'rent', icon: House },
  { text: '買房子', value: 'buy', icon: House },
  { text: '新建案', value: 'new', icon: House },
];

export default function GroupTabDropdown({ onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('rent');
  const [optionList, setOptionList] = useState(
    ORIGIN_OPTION_LIST.filter((item) => item.value !== selectedTab)
  );

  useEffect(() => {
    setOptionList(
      ORIGIN_OPTION_LIST.filter((item) => item.value !== selectedTab)
    );
  }, [selectedTab]);

  const SelectedTabIcon = ORIGIN_OPTION_LIST.find(
    (item) => item.value === selectedTab
  ).icon;

  return (
    <div className={styles.groupTabDropdownContainer}>
      <div
        className={styles.groupTabDropdown}
        data-isopen={isDropdownOpen ? 'open' : ''}
      >
        <Button
          buttonText={
            ORIGIN_OPTION_LIST.find((item) => item.value === selectedTab).text
          }
          textStyle={{
            color: '#FFF',
          }}
          buttonStyle={{
            backgroundColor: '#FF8E26',
            padding: '16px 32px',
            gap: '8px',
          }}
          icon={<SelectedTabIcon color="#FFFFFF" />}
          iconPosition="left"
          action={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </div>
      {isDropdownOpen && (
        <div
          className={styles.groupTabDropdownContent}
          data-isopen={isDropdownOpen ? 'open' : ''}
        >
          {optionList.map((item, key) => {
            const ItemIcon = item.icon;
            return (
              <div
                className={styles.groupTabDropdownItem}
                key={`groupTabDropdownItem_${key}`}
                onClick={() => {
                  setSelectedTab(item.value);
                  onChange(item.value);
                  setIsDropdownOpen(false);
                }}
              >
                <ItemIcon color="#CCCCCC" />
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
