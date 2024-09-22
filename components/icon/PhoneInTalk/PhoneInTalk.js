const PhoneInTalk = ({ color = 'white' }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="phone_in_talk" clip-path="url(#clip0_1369_35335)">
        <path
          id="Vector"
          d="M19.5 12H21.5C21.5 7.03 17.47 3 12.5 3V5C16.37 5 19.5 8.13 19.5 12ZM15.5 12H17.5C17.5 9.24 15.26 7 12.5 7V9C14.16 9 15.5 10.34 15.5 12ZM13.71 17.37C10.88 15.93 8.56002 13.62 7.12002 10.78L9.65002 8.25L9.04002 3H3.53002C2.95002 13.18 11.32 21.55 21.5 20.97V15.46L16.23 14.85L13.71 17.37Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1369_35335">
          <rect
            width="24"
            height="24"
            fill={color}
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PhoneInTalk;
