const Close = ({ color = 'white' }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="close" clip-path="url(#clip0_727_30625)">
        <path
          id="Vector"
          d="M25.3334 8.54602L23.4534 6.66602L16 14.1193L8.54669 6.66602L6.66669 8.54602L14.12 15.9993L6.66669 23.4527L8.54669 25.3327L16 17.8793L23.4534 25.3327L25.3334 23.4527L17.88 15.9993L25.3334 8.54602Z"
          fill="#666666"
        />
      </g>
      <defs>
        <clipPath id="clip0_727_30625">
          <rect width="32" height="32" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Close;
