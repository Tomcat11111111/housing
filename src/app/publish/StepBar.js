'use client';

const StepBar = ({ step }) => {
  const steps = [
    '選擇物件類型',
    '輸入物件資訊',
    '輸入進階資訊',
    '完成物件刊登',
  ];

  return (
    <div className="flex justify-between text-[#CCC] tracking-wider leading-8 text-xl text-center">
      {steps.map((stepName, i) => (
        <div
          key={stepName}
          className={`${i === step ? 'text-[#0936D8]' : 'text-[#CCC]'}`}
        >
          {stepName}
        </div>
      ))}
    </div>
  );
};

export default StepBar;
