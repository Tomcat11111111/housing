const CheckboxChecked = ({ color = '#333333' }) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Check Box" clip-path="url(#clip0_1018_47352)">
          <path
            id="Vector"
            d="M21 3H3V21H21V3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_1018_47352">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default CheckboxChecked;
