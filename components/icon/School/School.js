export default function School({ color = '#909090', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="school" clip-path="url(#clip0_1351_54921)">
        <path
          id="Vector"
          d="M8.33333 21.9667V28.6333L20 35L31.6667 28.6333V21.9667L20 28.3333L8.33333 21.9667ZM20 5L1.66667 15L20 25L35 16.8167V28.3333H38.3333V15L20 5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1351_54921">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
