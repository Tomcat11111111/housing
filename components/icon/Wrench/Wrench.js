export default function Wrench({ color = '#909090', size = 100 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
    >
      <g clip-path="url(#clip0_2102_16390)">
        <path
          d="M50.3751 12.1258C42.0001 3.75079 29.4585 2.04245 19.3751 6.95912L37.4585 25.0425L24.9585 37.5425L6.87514 19.4591C2.00014 29.5841 3.70847 42.0425 12.0835 50.4175C19.8335 58.1675 31.1668 60.2091 40.7918 56.5841L81.7085 97.5008L97.1668 82.0424L56.4168 41.2508C60.2501 31.5008 58.2501 20.0008 50.3751 12.1258Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2102_16390">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
