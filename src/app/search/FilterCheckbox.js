import Checkbox from '@/components/common/Checkbox/Checkbox';

import styles from './FilterCheckbox.module.scss';

export default function FilterCheckbox({
  optionList = [],
  selectedOptions = [],
  onChange,
}) {
  const isEven = (num) => num % 2 === 0;

  return (
    <div className={styles.filterCheckboxContainer}>
      {optionList.map((item, key) => {
        return (
          <div
            className={styles.filterChecbox}
            key={`checkbox_${key}`}
            data-position={isEven(key) ? 'left' : 'right'}
          >
            <Checkbox
              text={item.displayName}
              id={item.id}
              isChecked={selectedOptions.includes(item.id)}
              key={`checkbox_${key}`}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
}
