import styles from './Menu.module.scss';

const Menu = (props) => {
  const { menuList, onChange, setIsDropdownOpen } = props;

  return (
    <div className={styles.menuContainer}>
      {menuList.map((item, key) => {
        return (
          <div
            className={styles.menuItem}
            key={`menuItem-${key}`}
            onClick={() => {
              onChange(item.id);
              setIsDropdownOpen(false);
            }}
          >
            {item?.displayName}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
