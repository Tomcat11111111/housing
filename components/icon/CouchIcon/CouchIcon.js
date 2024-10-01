export default function CouchIcon({ color = '#333333', size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="weekend" clip-path="url(#clip0_894_11333)">
        <path
          id="Vector"
          d="M5.00016 7.92474V12.0664H15.0002V7.92474H16.6668V4.56641H3.3335V7.92474H5.00016ZM15.8335 12.8997H4.16683V8.75807H0.833496V16.2331H19.1668V8.75807H15.8335V12.8997Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_894_11333">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.400391)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
