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
  } = props;

  return (
    <div
      className={styles.tag}
      style={{
        border: borderColor ? `1px solid ${borderColor}` : '',
        backgroundColor: tagColor,
        gap: gap,
        padding: padding,
      }}
    >
      {iconPosition === 'left' ? icon : null}
      <span style={textStyle}>{text}</span>
      {iconPosition === 'right' ? icon : null}
    </div>
  );
};

export default Tag;
