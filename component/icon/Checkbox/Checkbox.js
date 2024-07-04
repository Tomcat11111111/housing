import styles from './Checkbox.module.scss';

const Checkbox = ({ color = 'white' }) => {
  return (
    <div className={styles.checkboxContainer}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="check">
          <path
            id="Vector"
            d="M6.75 12.1274L3.62249 8.99988L2.5575 10.0574L6.75 14.2499L15.75 5.24988L14.6925 4.19238L6.75 12.1274Z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  );
};

export default Checkbox;
