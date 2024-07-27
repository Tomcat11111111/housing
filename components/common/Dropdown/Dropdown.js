import React, { useState, useRef } from 'react';
import ArrowDropdownDown from '../../icon/ArrowDropdownDown/ArrowDropdownDown';
import ArrowDropdownUp from '../../icon/ArrowDropdownUp/ArrowDropdownUp';
import Menu from '../Menu/Menu';
import CustomSlider from '../CustomSlider/CustomSlider';
import CountySelector from './CountySelector';
import DropdownCheckbox from '@common/Dropdown/DropdownCheckbox';
import useOutSideClose from '../../../utils/hooks/useoutsideClose';
import styles from './Dropdown.module.scss';

const Dropdown = (props) => {
  const {
    placeholder,
    isHasNoBorder = false,
    value,
    dropdownType,
    onChange,
    optionList,
  } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const dropDownShowText = () => {
    const result = optionList.filter(
      (option) => option.value === value,
      optionList
    );

    return result.length > 0 ? result[0].text : placeholder;
  };

  useOutSideClose(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        data-open={isDropdownOpen ? 'open' : ''}
        data-selected={!!value ? 'selected' : ''}
        data-no-border={isHasNoBorder ? 'noBorder' : ''}
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
      >
        <span>{value ?? placeholder}</span>
        {isDropdownOpen ? <ArrowDropdownUp /> : <ArrowDropdownDown />}
      </button>
      {isDropdownOpen && (
        <>
          {dropdownType === 'menu' && (
            <Menu menuList={optionList} onChange={onChange} />
          )}
          {dropdownType === 'county' && (
            <CountySelector
              value={value}
              onChange={onChange}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}
          {dropdownType === 'checkbox' && (
            <DropdownCheckbox
              value={value}
              onChange={onChange}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}
          {dropdownType === 'price' && <CustomSlider />}
        </>
      )}
    </div>
  );
};

export default Dropdown;
