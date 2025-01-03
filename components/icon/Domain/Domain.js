const Domain = ({ color = '#0936D8', size = 30 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="domain" clip-path="url(#clip0_787_4282)">
        <path
          id="Vector"
          d="M15 8.75V3.75H2.5V26.25H27.5V8.75H15ZM7.5 23.75H5V21.25H7.5V23.75ZM7.5 18.75H5V16.25H7.5V18.75ZM7.5 13.75H5V11.25H7.5V13.75ZM7.5 8.75H5V6.25H7.5V8.75ZM12.5 23.75H10V21.25H12.5V23.75ZM12.5 18.75H10V16.25H12.5V18.75ZM12.5 13.75H10V11.25H12.5V13.75ZM12.5 8.75H10V6.25H12.5V8.75ZM25 23.75H15V21.25H17.5V18.75H15V16.25H17.5V13.75H15V11.25H25V23.75ZM22.5 13.75H20V16.25H22.5V13.75ZM22.5 18.75H20V21.25H22.5V18.75Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_787_4282">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Domain;
