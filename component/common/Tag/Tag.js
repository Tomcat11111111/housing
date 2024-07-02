import styles from './Tag.module.scss';

const Tag = (props) => {
  const {
    text = '',
    textStyle = {},
    tagColor = '',
    gap = '',
    icon = {},
    iconPosition = '',
    padding = '',
  } = props;

  return (
    <div
      className={styles.tag}
      style={{
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
