import React, { useState } from 'react';
import { Range } from 'react-range';
import styles from './CustomSlider.module.scss';

const CustomSlider = () => {
  const [values, setValues] = useState([200, 800]);

  const increaseMinValue = () => {
    setValues([Math.min(values[0] + 10, values[1] - 10), values[1]]);
  };

  const decreaseMinValue = () => {
    setValues([Math.max(values[0] - 10, 0), values[1]]);
  };

  const increaseMaxValue = () => {
    setValues([values[0], Math.min(values[1] + 10, 1000)]);
  };

  const decreaseMaxValue = () => {
    setValues([values[0], Math.max(values[1] - 10, values[0] + 10)]);
  };

  return (
    <div className={styles.container}>
      <Range
        step={10}
        min={0}
        max={1000}
        values={values}
        onChange={(values) => setValues(values)}
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
      <div className={styles.price}>
        <p>最低${values[0]}</p>
        <p>最高${values[1]}</p>
      </div>
      {/* <button className="button" onClick={decreaseMinValue}>
        Decrease Min
      </button>
      <button className="button" onClick={increaseMinValue}>
        Increase Min
      </button>
      <button className="button" onClick={decreaseMaxValue}>
        Decrease Max
      </button>
      <button className="button" onClick={increaseMaxValue}>
        Increase Max
      </button> */}
    </div>
  );
};

export default CustomSlider;
