import { useState } from 'react';
import Checkbox from '@common/Checkbox/Checkbox';
import styles from './DropdownCheckbox.module.scss';

const DropdownCheckbox = ({
  value,
  onChange,
  setIsDropdownOpen,
  optionList,
}) => {
  const [checkboxList, setCheckboxList] = useState(optionList);

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
