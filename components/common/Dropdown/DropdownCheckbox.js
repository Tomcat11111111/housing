import { useState } from 'react';
import CheckboxChecked from '../../icon/CheckboxChecked/CheckboxChecked';
import CheckboxIcon from '../../icon/CheckboxIcon/CheckboxIcon';
import Checkbox from '@common/Checkbox/Checkbox';
import styles from './DropdownCheckbox.module.scss';

const DropdownCheckbox = ({ value, onChange, setIsDropdownOpen }) => {
  const itemTypeFilterList = [
    { value: '住宅', text: '住宅', isChecked: true },
    { value: '套房', text: '套房', isChecked: true },
    { value: '法拍屋', text: '法拍屋', isChecked: false },
    { value: '車位', text: '車位', isChecked: false },
    { value: '其他', text: '其他', isChecked: true },
  ];
  const [checkboxList, setCheckboxList] = useState(itemTypeFilterList);

  const checkBoxValueChange = (value, isChecked) => {
    const newCheckboxList = checkboxList.map((item) => {
      if (item.value === value) {
        return { ...item, isChecked: !isChecked };
      }
      return item;
    });

    setCheckboxList(newCheckboxList);
  };

  return (
    <div className={styles.checkboxSelector}>
      {checkboxList.map((item, key) => {
        return (
          <Checkbox
            text={item.text}
            isChecked={item.isChecked}
            value={item.value}
            key={`checkbox_${key}`}
            onChange={(value, isChecked) => {
              checkBoxValueChange(value, isChecked);
            }}
          />
        );
      })}
    </div>
  );
};

export default DropdownCheckbox;
