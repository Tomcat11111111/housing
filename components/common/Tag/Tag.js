import styles from './Tag.module.scss';

const Tag = (props) => {
  const {
    text = '',
    textStyle = {},
    tagColor = '',
    borderColor = '',
    gap = '',
    icon = {},
    iconPosition = '',
    padding = '',
    borderRadius = '8px',
    opacity = '',
  } = props;

  return (
    <div
      className={styles.tag}
      style={{
        border: borderColor ? `1px solid ${borderColor}` : '',
        backgroundColor: tagColor,
        gap: gap,
        padding: padding,
        borderRadius: borderRadius,
        opacity: opacity,
      }}
    >
      {iconPosition === 'left' ? icon : null}
      {text && <span style={textStyle}>{text}</span>}
      {iconPosition === 'right' ? icon : null}
    </div>
  );
};

export default Tag;
