const People = ({ color = '#E9E9E9' }) => {
  return (
    <svg
      width="25"
      height="12"
      viewBox="0 0 25 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <path
          id="Vector"
          d="M12.5 6.75C14.13 6.75 15.57 7.14 16.74 7.65C17.82 8.13 18.5 9.21 18.5 10.38V12H6.5V10.39C6.5 9.21 7.18 8.13 8.26 7.66C9.43 7.14 10.87 6.75 12.5 6.75ZM4.5 7C5.6 7 6.5 6.1 6.5 5C6.5 3.9 5.6 3 4.5 3C3.4 3 2.5 3.9 2.5 5C2.5 6.1 3.4 7 4.5 7ZM5.63 8.1C5.26 8.04 4.89 8 4.5 8C3.51 8 2.57 8.21 1.72 8.58C0.98 8.9 0.5 9.62 0.5 10.43V12H5V10.39C5 9.56 5.23 8.78 5.63 8.1ZM20.5 7C21.6 7 22.5 6.1 22.5 5C22.5 3.9 21.6 3 20.5 3C19.4 3 18.5 3.9 18.5 5C18.5 6.1 19.4 7 20.5 7ZM24.5 10.43C24.5 9.62 24.02 8.9 23.28 8.58C22.43 8.21 21.49 8 20.5 8C20.11 8 19.74 8.04 19.37 8.1C19.77 8.78 20 9.56 20 10.39V12H24.5V10.43ZM12.5 0C14.16 0 15.5 1.34 15.5 3C15.5 4.66 14.16 6 12.5 6C10.84 6 9.5 4.66 9.5 3C9.5 1.34 10.84 0 12.5 0Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default People;