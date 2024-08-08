export default function BookmarkIcon({ color = '#909090' }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="bookmark_border">
        <path
          id="Vector"
          d="M23.75 3.75H6.25V26.25L15 22.5L23.75 26.25V3.75ZM21.25 22.5L15 19.775L8.75 22.5V6.25H21.25V22.5Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
