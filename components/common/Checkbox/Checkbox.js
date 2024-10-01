import CheckboxChecked from '@/components/icon/CheckboxChecked/CheckboxChecked';
import CheckboxIcon from '@/components/icon/CheckboxIcon/CheckboxIcon';

import styles from './Checkbox.module.scss';

export default function Checkbox({ text, id, isChecked, onChange = () => {} }) {
  return (
    <div
      className={styles.checkboxContainer}
      data-checked={isChecked ? 'checked' : ''}
      onClick={() => {
        onChange(id, isChecked);
      }}
    >
      <p>{text}</p>
      <>
        {isChecked ? (
          <CheckboxChecked color="#333333" />
        ) : (
          <CheckboxIcon color="#909090" />
        )}
      </>
    </div>
  );
}
