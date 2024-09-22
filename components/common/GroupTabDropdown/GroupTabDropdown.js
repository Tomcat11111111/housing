import { useEffect, useRef, useState } from 'react';

import Button from '@common/Button/Button';
import useOutSideClose from '@utils/hooks/useoutsideClose';

import styles from './GroupTabDropdown.module.scss';

export default function GroupTabDropdown({
  selectedTab,
  tabOptions = [],
  onChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [optionList, setOptionList] = useState(
    tabOptions.filter((item) => item.id !== selectedTab)
  );

  const groupTabRef = useRef(null);

  useEffect(() => {
    setOptionList(tabOptions.filter((item) => item.id !== selectedTab));
  }, [selectedTab]);

  const SelectedTabIcon = tabOptions.find(
    (item) => item.id === selectedTab
  )?.icon;

  useOutSideClose(groupTabRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className={styles.groupTabDropdownContainer} ref={groupTabRef}>
      <div
        className={styles.groupTabDropdown}
        data-isopen={isDropdownOpen ? 'open' : ''}
      >
        <Button
          buttonText={
            tabOptions.find((item) => item.id === selectedTab)?.displayName
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
                  onChange(item.id);
                  setIsDropdownOpen(false);
                }}
              >
                <ItemIcon color="#CCCCCC" />
                <p>{item.displayName}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
