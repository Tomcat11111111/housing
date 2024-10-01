const Ellipse = ({ color = '#0936D8', size = 6 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle id="Ellipse 699" cx="15" cy="15" r="15" fill={color} />
    </svg>
  );
};
export default Ellipse;
