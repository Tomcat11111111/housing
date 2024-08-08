import React, { useState, useRef } from 'react';
import ArrowDropdownDown from '../../icon/ArrowDropdownDown/ArrowDropdownDown';
import ArrowDropdownUp from '../../icon/ArrowDropdownUp/ArrowDropdownUp';
import Menu from '../Menu/Menu';
import CustomSlider from '../CustomSlider/CustomSlider';
import CountySelector from './CountySelector';
import DropdownCheckbox from '@common/Dropdown/DropdownCheckbox';
import Counter from '@common/Counter/Counter';
import BedIcon from '@icon/BedIcon/BedIcon';
import CouchIcon from '@icon/CouchIcon/CouchIcon';
import TubIcon from '@icon/TubIcon/TubIcon';
import GrassIcon from '@icon/GrassIcon/GrassIcon';
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
              optionList={optionList}
            />
          )}
          {dropdownType === 'price' && (
            <div className={styles.dropdownContentContainer}>
              <div className={styles.priceSelector}>
                <CustomSlider />
              </div>
            </div>
          )}
          {dropdownType === 'layout' && (
            <div className={styles.dropdownContentContainer}>
              <div className={styles.counterGroup}>
                <div className={styles.counter}>
                  <Counter text="房" Icon={BedIcon} />
                </div>
                <div className={styles.counter}>
                  <Counter text="廳" Icon={CouchIcon} />
                </div>
                <div className={styles.counter}>
                  <Counter text="衛" Icon={TubIcon} />
                </div>
                <div className={styles.counter}>
                  <Counter text="陽台" Icon={GrassIcon} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dropdown;
