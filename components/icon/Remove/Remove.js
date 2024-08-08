const Menu = ({ color = '#323232' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_1227_19736)">
        <path d="M19 13H5V11H19V13Z" fill="#323232" />
      </g>
      <defs>
        <clipPath id="clip0_1227_19736">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Menu;
