import React, { useRef, useState } from 'react';

import DropdownCheckbox from '@/common/Dropdown/DropdownCheckbox';

import useOutSideClose from '@/utils/hooks/useoutsideClose';

import ArrowDropdownDown from '../../icon/ArrowDropdownDown/ArrowDropdownDown';
import ArrowDropdownUp from '../../icon/ArrowDropdownUp/ArrowDropdownUp';
import Menu from '../Menu/Menu';
import CitySelector from './CitySelector';
import styles from './Dropdown.module.scss';

const Dropdown = (props) => {
  const {
    placeholder,
    isHasNoBorder = false,
    value,
    dropdownType,
    onChange,
    optionList = [],
    displayName = '',
  } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useOutSideClose(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        data-open={isDropdownOpen ? 'open' : ''}
        data-no-border={isHasNoBorder ? 'noBorder' : ''}
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
      >
        <span
          className={styles.showValue}
          data-placeholder={displayName ? '' : 'placeholder'}
        >
          {displayName || placeholder}
        </span>
        {isDropdownOpen ? <ArrowDropdownUp /> : <ArrowDropdownDown />}
      </button>
      {isDropdownOpen && !props.children && (
        <>
          {dropdownType === 'menu' && (
            <Menu
              menuList={optionList}
              onChange={onChange}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}
          {dropdownType === 'city' && (
            <CitySelector
              onChange={onChange}
              selectedOptions={value}
              setIsDropdownOpen={setIsDropdownOpen}
              citiesOptions={optionList}
            />
          )}
          {dropdownType === 'checkbox' && (
            <DropdownCheckbox
              selectedOptions={value}
              onChange={(value, isChecked) => {
                onChange(value, isChecked);
              }}
              optionList={optionList}
            />
          )}
        </>
      )}
      {isDropdownOpen && props.children && <>{props.children}</>}
    </div>
  );
};

export default Dropdown;
