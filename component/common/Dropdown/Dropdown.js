import React, { useState } from 'react';
import ArrowDropdown from '../../icon/ArrowDropdown/ArrowDropdown';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';
import styles from './Dropdown.module.scss';

const Dropdown = (props) => {
  const { placeholder, isHasBorder, optionList = [], value } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropDownShowText = () => {
    const result = optionList.filter(
      (option) => option.value === value,
      optionList
    );

    return result.length > 0 ? result[0].text : placeholder;
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        data-border={isHasBorder ? 'hasBorder' : ''}
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
        }}
      >
        <span>{dropDownShowText()}</span>
        <ArrowDropdown />
      </button>
      {isMenuOpen && optionList.length > 0 && <Menu menuList={optionList} />}
    </div>
  );
};

export default Dropdown;