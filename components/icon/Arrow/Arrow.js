import styles from './Arrow.module.scss';

const Arrow = ({ color = '#333333', direction = 'right' }) => {
  return (
    <div className={styles.arrow} data-direction={direction}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="arrow_forward_ios" clip-path="url(#clip0_787_4287)">
          <path
            id="Vector"
            d="M6.82373 20.1296L8.59373 21.8996L18.4937 11.9996L8.59373 2.09961L6.82373 3.86961L14.9537 11.9996L6.82373 20.1296Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_787_4287">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.333496)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Arrow;
