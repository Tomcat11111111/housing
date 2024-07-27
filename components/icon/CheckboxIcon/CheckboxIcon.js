const CheckboxIcon = ({ color = 'white' }) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Check Box" clip-path="url(#clip0_1018_47358)">
          <path
            id="Vector"
            d="M19 5V19H5V5H19ZM21 3H3V21H21V3Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1018_47358">
            <rect width="24" height="24" fill={color} />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default CheckboxIcon;
