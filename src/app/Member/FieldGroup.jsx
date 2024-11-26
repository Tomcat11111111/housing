const FieldGroup = (props) => (
  <div className="p-4 flex flex-col gap-4 bg-white rounded-2xl border-solid border-1 border-[#E9E9E9]">
    <h1 className="text-[#333] text-xl font-bold leading-8">{props.title}</h1>
    <>{props.children}</>
  </div>
);

export default FieldGroup;
