import Checkbox from '@/common/Checkbox/Checkbox';

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
          <div key={`checkbox_${key}`} style={{ padding: '8px 0' }}>
            <Checkbox
              text={item.displayName}
              id={item.id}
              isChecked={selectedOptions.includes(item.id)}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DropdownCheckbox;
