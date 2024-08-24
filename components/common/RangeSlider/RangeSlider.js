import React, { useState } from 'react';
import { Range } from 'react-range';

import styles from './RangeSlider.module.scss';

const getShowMoney = (value) => {
  if (typeof value !== 'number') return value;

  return value.toLocaleString();
};

const UnitBox = ({ max, min, rangeMax, rangeMin, type }) => {
  const showMin = min < rangeMin ? '不限' : min;
  const showMax = max > rangeMax ? '不限' : max;

  const sliderUnitMap = new Map([
    [
      'money',
      <>
        <p className={styles.price}>
          最低$
          <span>{getShowMoney(showMin)}</span>
        </p>
        <p className={styles.price}>
          最高$
          <span>{getShowMoney(showMax)}</span>
        </p>
      </>,
    ],
    [
      'totalPrice',
      <>
        <p className={styles.price}>
          最低$
          <span>{getShowMoney(showMin)}</span>萬
        </p>
        <p className={styles.price}>
          最高$
          <span>{getShowMoney(showMax)}</span>萬
        </p>
      </>,
    ],
    [
      'perSquare',
      <>
        <p className={styles.price}>
          最低$
          <span>{getShowMoney(showMin)}</span>萬/坪
        </p>
        <p className={styles.price}>
          最低$
          <span>{getShowMoney(showMax)}</span>萬/坪
        </p>
      </>,
    ],
    [
      'floor',
      <>
        <p className={styles.price}>
          <span>{showMin}</span>層
        </p>
        <p className={styles.price}>
          <span>{showMax}</span>層
        </p>
      </>,
    ],
    [
      'square',
      <>
        <p className={styles.price}>
          <span>{showMin}</span>坪
        </p>
        <p className={styles.price}>
          <span>{showMax}</span>坪
        </p>
      </>,
    ],
  ]);

  return <div className={styles.unitBox}>{sliderUnitMap.get(type)}</div>;
};

const RangeSlider = ({
  rangeMax = 1000,
  rangeMin = 0,
  step = 1,
  max,
  min,
  onChange,
  type,
}) => {
  return (
    <div className={styles.container}>
      <Range
        step={step}
        min={rangeMin - step}
        max={rangeMax + step}
        values={[min, max]}
        onChange={(values) => {
          const chanegeMin = values[0];
          const changeMax = values[1];

          if (chanegeMin > rangeMax) return;
          if (changeMax < rangeMin) return;

          onChange(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '1px',
              width: '100%',
              backgroundColor: '#E9E9E9',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: '#999',
              borderRadius: '37px',
              border: '2px solid #FF8E26',
              background: '#FFF',
              boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.20)',
            }}
          >
            {/* {index === 0 ? 'Min' : 'Max'} */}
          </div>
        )}
      />
      <UnitBox
        max={max}
        min={min}
        rangeMax={rangeMax}
        rangeMin={rangeMin}
        type={type}
      />
    </div>
  );
};

export default RangeSlider;
