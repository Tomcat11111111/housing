import CheckboxIcon from '@components/icon/CheckboxIcon/CheckboxIcon';
import CheckboxChecked from '@components/icon/CheckboxChecked/CheckboxChecked';
import styles from './Checkbox.module.scss';

export default function Checkbox({
  text,
  value,
  isChecked,
  onChange = () => {},
}) {
  return (
    <div
      className={styles.checkboxContainer}
      data-checked={isChecked ? 'checked' : ''}
    >
      <p>{text}</p>
      <div
        className={styles.checkbox}
        onClick={() => {
          onChange(value, isChecked);
        }}
      >
        {isChecked ? (
          <CheckboxChecked color="#FF8E26" />
        ) : (
          <CheckboxIcon color="#CCCCCC" />
        )}
      </div>
    </div>
  );
}
