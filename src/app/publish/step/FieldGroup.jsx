import clsx from 'clsx';

const FieldGroup = ({ title, children, isAvailable = true, error }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-2xl border-solid border-1 border-[#E9E9E9]">
      <h1
        className={clsx(
          'text-[#333] text-xl font-bold leading-8',
        )}
      >
        {title}
      </h1>
      {isAvailable && <>{children}</>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default FieldGroup;
