export default function Store({ color = '#909090', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="store_mall_directory" clip-path="url(#clip0_1351_54929)">
        <path
          id="Vector"
          d="M33.3333 6.66797H6.66667V10.0013H33.3333V6.66797ZM35 23.3346V20.0013L33.3333 11.668H6.66667L5 20.0013V23.3346H6.66667V33.3346H23.3333V23.3346H30V33.3346H33.3333V23.3346H35ZM20 30.0013H10V23.3346H20V30.0013Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1351_54929">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
