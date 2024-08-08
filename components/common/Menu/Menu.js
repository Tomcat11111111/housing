import styles from './Menu.module.scss';

const Menu = (props) => {
  const { menuList, onChange } = props;

  return (
    <div className={styles.menuContainer}>
      {menuList.map((item, key) => {
        return (
          <div
            className={styles.menuItem}
            key={`menuItem-${key}`}
            onClick={() => {
              onChange(item, key);
            }}
          >
            {item?.text}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
