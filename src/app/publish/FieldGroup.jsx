import clsx from 'clsx';

const FieldGroup = (props) => {
  const { title, isAvailable = true } = props;
  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-2xl border-solid border-1 border-[#E9E9E9]">
      <h1
        className={clsx(
          'text-[#333] text-xl font-bold leading-8',
          !isAvailable && 'text-[#909090]'
        )}
      >
        {title}
      </h1>
      {isAvailable && <>{props.children}</>}
    </div>
  );
};

export default FieldGroup;
