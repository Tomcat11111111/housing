import { useState } from 'react';
import House from '@icon/House/House';
import Button from '@common/Button/Button';
import styles from './GroupTab.module.scss';

const ORIGIN_OPTION_LIST = [
  { text: '租房子', value: 'rent', icon: House },
  { text: '買房子', value: 'buy', icon: House },
  { text: '新建案', value: 'new', icon: House },
];

export default function GroupTabDropdown({ onChange }) {
  const [selectedTab, setSelectedTab] = useState('rent');

  return (
    <div className={styles.groupTabContainer}>
      {ORIGIN_OPTION_LIST.map((item, key) => {
        const ItemIcon = item.icon;
        const isSelectedTab = item.value === selectedTab;

        return (
          <Button
            key={`groupTabDropdownItem_${key}`}
            buttonText={item.text}
            textStyle={{ color: isSelectedTab ? '#FFFFFF' : '#CCCCCC' }}
            buttonStyle={{
              backgroundColor: isSelectedTab ? '#FF8E26' : '',
              padding: '8px 32px',
              gap: '8px',
            }}
            icon={<ItemIcon color={isSelectedTab ? '#FFFFFF' : '#CCCCCC'} />}
            iconPosition="left"
            action={() => {
              setSelectedTab(item.value);
              onChange(item.value);
            }}
          />
        );
      })}
    </div>
  );
}
