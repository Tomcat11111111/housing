import styles from './Menu.module.scss';

const Menu = (props) => {
  const { menuList, onListClick } = props;

  return (
    <div className={styles.menuContainer}>
      {menuList.map((item, key) => {
        return (
          <div
            className={styles.menuItem}
            key={`menuItem-${key}`}
            onClick={() => {
              onListClick(item, key);
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
