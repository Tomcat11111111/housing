const SmallArrow = ({ color = '#333333' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="keyboard_arrow_right" clip-path="url(#clip0_2281_16812)">
        <path
          id="Vector"
          d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2281_16812">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SmallArrow;
