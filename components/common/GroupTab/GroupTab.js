import Button from '@common/Button/Button';
import { ORIGIN_OPTION_LIST } from '@utils/tools';

import styles from './GroupTab.module.scss';

export default function GroupTabDropdown({ selectedTab, onChange }) {
  return (
    <div className={styles.groupTabContainer}>
      {ORIGIN_OPTION_LIST.map((item, key) => {
        const ItemIcon = item.icon;
        const isSelectedTab = item.id === selectedTab;

        return (
          <Button
            key={`groupTabDropdownItem_${key}`}
            buttonText={item.displayName}
            textStyle={{ color: isSelectedTab ? '#FFFFFF' : '#CCCCCC' }}
            buttonStyle={{
              backgroundColor: isSelectedTab ? '#FF8E26' : '',
              padding: '8px 32px',
              gap: '8px',
            }}
            icon={<ItemIcon color={isSelectedTab ? '#FFFFFF' : '#CCCCCC'} />}
            iconPosition="left"
            action={() => {
              onChange(item.id);
            }}
          />
        );
      })}
    </div>
  );
}
