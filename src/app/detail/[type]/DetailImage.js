import { useState } from 'react';

import { Modal, StepButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import Button from '@/components/common/Button/Button';
import CustomStepper from '@/components/common/Stepper/Stepper';
import Photo from '@/components/icon/Photo/Photo';

import { getImageurl } from '@/utils/tools';

import styles from './DetailImage.module.scss';

const DetailImage = (props) => {
  const { images } = props;
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % images.length);
  };

  const handleBack = () => {
    setActiveStep((prevStep) =>
      prevStep === 0 ? images.length - 1 : prevStep - 1
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageClick = (index) => {
    setActiveStep(index);
    setOpen(true);
  };

  return (
    <>
      <figure className={styles.imgArea}>
        <div
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
            cursor: 'pointer',
          }}
        >
          <Image
            style={{
              borderRadius: '16px 0 0 16px',
            }}
            src={getImageurl(images, 0)}
            alt={1}
            fill
            onClick={() => handleImageClick(0)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexGrow: 1,
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              height: 'calc(50% - 4px)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <Image
                src={getImageurl(images, 1)}
                alt={1}
                fill
                onClick={() => handleImageClick(1)}
              />
            </div>
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <Image
                style={{
                  borderRadius: '0 16px 0 0',
                }}
                src={getImageurl(images, 2)}
                alt={1}
                fill
                onClick={() => handleImageClick(2)}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              height: 'calc(50% - 4px)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <Image
                src={getImageurl(images, 3)}
                alt={1}
                fill
                onClick={() => handleImageClick(3)}
              />
            </div>
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <Image
                style={{
                  borderRadius: '0 0 16px 0',
                }}
                src={getImageurl(images, 4)}
                alt={1}
                fill
                onClick={() => handleImageClick(4)}
              />
            </div>
          </div>
        </div>
        {images.length > 5 && (
          <div className={styles.imgCount} onClick={() => handleImageClick(0)}>
            <Button
              buttonText={`${images.length - 5}+`}
              textStyle={{
                color: '#FFF',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
              }}
              buttonStyle={{
                borderRadius: '8px',
                opacity: 0.8,
                background: '#333',
                padding: '16px',
                gap: '8px',
              }}
              icon={<Photo />}
              iconPosition="left"
            />
          </div>
        )}
      </figure>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
        >
          <div>
            <StepButton
              // className={styles.stepButtonLeft}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                padding: '16px',
                marginRight: '30px',
              }}
              onClick={handleBack}
            >
              <ChevronLeft />
            </StepButton>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <Image
              src={getImageurl(images, activeStep)}
              alt="image"
              width={1200}
              height={900}
              className=" object-contain"
            />
            <div className="flex flex-col justify-center items-center gap-2">
              <CustomStepper
                steps={images.length}
                activeStep={activeStep}
                maxDots={3}
              />
              <div className=" text-base font-bold text-[#FFFFFF]">
                {activeStep + 1} / {images.length}
              </div>
            </div>
          </div>
          <div>
            <StepButton
              // className={styles.stepButtonRight}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                padding: '16px',
                marginLeft: '30px',
              }}
              onClick={handleNext}
            >
              <ChevronRight />
            </StepButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailImage;
