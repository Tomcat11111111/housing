import styles from './Input.module.scss';

const Input = (props) => {
  const {
    icon,
    iconPosition,
    placeholder,
    isReadonly,
    inputWidth,
    input = '',
    onChange = () => {},
  } = props;

  return (
    <div className={styles.inputContainer}>
      <div>{iconPosition === 'left' ? icon : null}</div>
      <input
        className={styles.input}
        placeholder={placeholder}
        readOnly={isReadonly}
        style={{ width: inputWidth ? inputWidth : '100%' }}
        value={input}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {iconPosition === 'right' ? icon : null}
    </div>
  );
};

export default Input;
