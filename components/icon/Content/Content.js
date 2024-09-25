const Content = ({ color = '#333333' }) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <path
          id="Vector"
          d="M20 0H0V16H20V0ZM2 5H12.5V8.5H2V5ZM2 10.5H12.5V14H2V10.5ZM18 14H14.5V5H18V14Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default Content;
