export default function Hospital({ color = '#909090', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="local_hospital" clip-path="url(#clip0_1351_54925)">
        <path
          id="Vector"
          d="M35 5H5.01667L5 35H35V5ZM30 23.3333H23.3333V30H16.6667V23.3333H10V16.6667H16.6667V10H23.3333V16.6667H30V23.3333Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1351_54925">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
