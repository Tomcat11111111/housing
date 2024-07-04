import { useRef, useEffect } from 'react';
import CheckboxChecked from '../../icon/CheckboxChecked/CheckboxChecked';
import Checkbox from '../../icon/Checkbox/Checkbox';
import styles from './CheckboxSelector.module.scss';

const CheckboxSelector = ({ value, onChange, setIsDropdownOpen }) => {
  const itemTypeFilterList = [
    { type: '住宅', isChecked: true },
    { type: '套房', isChecked: true },
    { type: '法拍屋', isChecked: false },
    { type: '車位', isChecked: false },
    { type: '其他', isChecked: true },
  ];

  return (
    <div className={styles.checkboxSelector}>
      {itemTypeFilterList.map((item, key) => {
        return (
          <div
            className={styles.itemType}
            key={`menuItem-${key}`}
            onClick={() => {
              onChange(item.type);
              setIsDropdownOpen(false);
            }}
            data-checked={item.isChecked ? 'checked' : ''}
          >
            <p>{item.type}</p>

            {item.isChecked ? (
              <CheckboxChecked color="#FF8E26" />
            ) : (
              <Checkbox color="#CCCCCC" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxSelector;
