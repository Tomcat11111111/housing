import { useState, useEffect } from 'react';
import Image from 'next/image';
import Arrow from '../../icon/Arrow/Arrow';
import styles from './Carousel.module.scss';

const Carousel = (props) => {
  const {
    images,
    indicatorsPosition = 'center',
    isAutoSlide = false,
    isHasArrow = false,
    isHasIndicator = true,
    width,
    height,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoSlide) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgSrc, index) => (
          <div className={styles.carouselItem} key={index}>
            <Image
              style={{
                borderRadius: '16px',
              }}
              src={imgSrc}
              alt={`Slide ${index + 1}`}
              width={width}
              height={height}
              // fill
            />
          </div>
        ))}
      </div>
      {isHasArrow && (
        <>
          <button
            className={`${styles.carouselControl} ${styles.prev}`}
            onClick={prevSlide}
          >
            <Arrow color="#fff" />
          </button>
          <button
            className={`${styles.carouselControl} ${styles.next}`}
            onClick={nextSlide}
          >
            <Arrow color="#fff" />
          </button>
        </>
      )}
      {isHasIndicator && (
        <div
          className={styles.indicators}
          data-indicatorspostion={indicatorsPosition}
        >
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
