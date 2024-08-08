import styles from './Input.module.scss';

const Input = (props) => {
  const { icon, iconPosition, placeholder, isReadonly } = props;

  return (
    <div className={styles.inputContainer}>
      {iconPosition === 'left' ? icon : null}
      <input
        className={styles.input}
        placeholder={placeholder}
        readOnly={isReadonly}
      />
      {iconPosition === 'right' ? icon : null}
    </div>
  );
};

export default Input;
