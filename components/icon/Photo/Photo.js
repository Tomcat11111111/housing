const Photo = ({ color = 'white' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="filter" clip-path="url(#clip0_1351_54814)">
        <path
          id="Vector"
          d="M15.96 10.29L13.21 13.83L11.25 11.47L8.5 15H19.5L15.96 10.29ZM3 5H1V23H19V21H3V5ZM23 1H5V19H23V1ZM21 17H7V3H21V17Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1351_54814">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Photo;
