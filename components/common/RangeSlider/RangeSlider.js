import React from 'react';
import { Range, getTrackBackground } from 'react-range';

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
        <p className={styles.unit}>
          最低$
          <span>{getShowMoney(showMin)}</span>
        </p>
        <p className={styles.unit}>
          最高$
          <span>{getShowMoney(showMax)}</span>
        </p>
      </>,
    ],
    [
      'totalPrice',
      <>
        <p className={styles.unit}>
          最低$
          <span>{getShowMoney(showMin)}</span>萬
        </p>
        <p className={styles.unit}>
          最高$
          <span>{getShowMoney(showMax)}</span>萬
        </p>
      </>,
    ],
    [
      'perSquare',
      <>
        <p className={styles.unit}>
          最低$
          <span>{getShowMoney(showMin)}</span>萬/坪
        </p>
        <p className={styles.unit}>
          最低$
          <span>{getShowMoney(showMax)}</span>萬/坪
        </p>
      </>,
    ],
    [
      'floor',
      <>
        <p className={styles.unit}>
          <span>{showMin}</span>層
        </p>
        <p className={styles.unit}>
          <span>{showMax}</span>層
        </p>
      </>,
    ],
    [
      'square',
      <>
        <p className={styles.unit}>
          <span>{showMin}</span>坪
        </p>
        <p className={styles.unit}>
          <span>{showMax}</span>坪
        </p>
      </>,
    ],
    [
      'year',
      <>
        <p className={styles.unit}>
          <span>{showMin}</span>年
        </p>
        <p className={styles.unit}>
          <span>{showMax}</span>年
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
  let bg = getTrackBackground({
    values: [min, max],
    colors: ['#E9E9E9', '#0936D8', '#E9E9E9'],
    min: 0,
    max: 100,
  });
  console.log('🚀 ~ bg:', bg);
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
              background: getTrackBackground({
                values: [min, max],
                colors: ['#E9E9E9', '#0936D8', '#E9E9E9'],
                min: rangeMin,
                max: rangeMax,
              }),
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
              border: '2px solid #0936D8',
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
