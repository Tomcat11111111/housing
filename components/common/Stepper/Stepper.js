import React from 'react';

const CustomStepper = ({ steps, activeStep, maxDots }) => {
  const getVisibleSteps = () => {
    if (steps <= maxDots) {
      return [...Array(steps).keys()]; // 若步數小於等於maxDots，直接返回完整陣列
    }

    const startIndex = Math.max(0, activeStep - (maxDots - 1)); // 動態顯示的起始索引
    return [...Array(maxDots).keys()].map((i) => startIndex + i);
  };

  const visibleSteps = getVisibleSteps();
  const showSmallRightDot = steps > visibleSteps[visibleSteps.length - 1] + 1;
  const showSmallLeftDot = visibleSteps[0] > 0;

  return (
    <div
      style={{
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {/* 顯示左側縮小的點 */}
      {showSmallLeftDot && (
        <div
          style={{
            width: activeStep < visibleSteps[0] ? '10px' : '6px',
            height: activeStep < visibleSteps[0] ? '10px' : '6px',
            borderRadius: '50%',
            backgroundColor: activeStep < visibleSteps[0] ? '#FFFFFF' : '#ccc',
            transition: 'all 0.3s ease',
          }}
        ></div>
      )}

      {/* 顯示完整大小的點 */}
      {visibleSteps.map((step) => (
        <div
          key={step}
          style={{
            width: step === activeStep ? '10px' : '10px',
            height: step === activeStep ? '10px' : '10px',
            borderRadius: '50%',
            backgroundColor: step === activeStep ? '#FFFFFF' : '#ccc',
            transition: 'all 0.3s ease',
          }}
        ></div>
      ))}

      {/* 顯示右側縮小的點 */}
      {showSmallRightDot && (
        <div
          style={{
            width:
              activeStep >= visibleSteps[visibleSteps.length - 1] + 1
                ? '10px'
                : '6px',
            height:
              activeStep >= visibleSteps[visibleSteps.length - 1] + 1
                ? '10px'
                : '6px',
            borderRadius: '50%',
            backgroundColor:
              activeStep >= visibleSteps[visibleSteps.length - 1] + 1
                ? '#FFFFFF'
                : '#ccc',
            transition: 'all 0.3s ease',
          }}
        ></div>
      )}
    </div>
  );
};

export default CustomStepper;
