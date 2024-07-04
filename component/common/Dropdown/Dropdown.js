import React, { useState, useRef } from 'react';
import ArrowDropdown from '../../icon/ArrowDropdown/ArrowDropdown';
import Menu from '../Menu/Menu';
import useOutSideClose from '../../../utils/hooks/useoutsideClose';
import styles from './Dropdown.module.scss';

const Dropdown = (props) => {
  const { placeholder, optionList = [], value } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  const dropDownShowText = () => {
    const result = optionList.filter(
      (option) => option.value === value,
      optionList
    );

    return result.length > 0 ? result[0].text : placeholder;
  };

  useOutSideClose(dropdownRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        data-open={isMenuOpen ? 'open' : ''}
        data-selected={!!value ? 'selected' : ''}
        onClick={() => {
          console.log('onClick');
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
