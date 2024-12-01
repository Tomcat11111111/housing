import styles from './Button.module.scss';

const Button = (props) => {
  const {
    buttonText = '',
    buttonType = '',
    textStyle = {},
    buttonStyle = {},
    iconPosition = '',
    icon = {},
    action = () => {},
    isDisabled = false,
  } = props;

  return (
    <button
      className={styles.button}
      data-disabled={isDisabled ? 'disabled' : ''}
      style={buttonStyle}
      onClick={(e) => {
        if (isDisabled) return;

        e.stopPropagation();
        action();
      }}
      data-button-type={isDisabled ? '' : buttonType}
    >
      {iconPosition === 'left' ? icon : null}
      <span style={textStyle}>{buttonText}</span>
      {iconPosition === 'right' ? icon : null}
    </button>
  );
};

export default Button;
