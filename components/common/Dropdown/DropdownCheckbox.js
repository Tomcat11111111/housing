import Checkbox from '@common/Checkbox/Checkbox';

import styles from './DropdownCheckbox.module.scss';

const DropdownCheckbox = ({
  optionList = [],
  selectedOptions = [],
  onChange,
}) => {
  return (
    <div className={styles.checkboxSelector}>
      {optionList.map((item, key) => {
        return (
          <Checkbox
            text={item.displayName}
            id={item.id}
            isChecked={selectedOptions.includes(item.id)}
            key={`checkbox_${key}`}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export default DropdownCheckbox;
