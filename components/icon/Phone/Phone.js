const Phone = ({ color = 'white' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="phone" clip-path="url(#clip0_1352_55843)">
        <path
          id="Vector"
          d="M21 15.46L15.73 14.85L13.21 17.37C10.38 15.93 8.05999 13.62 6.61999 10.78L9.14999 8.25L8.53999 3H3.02999C2.44999 13.18 10.82 21.55 21 20.97V15.46Z"
          fill="#909090"
        />
      </g>
      <defs>
        <clipPath id="clip0_1352_55843">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Phone;
