import { useRef } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import ArrowForward from '../../icon/ArrowForward/ArrowForward';
import ArrowBack from '../../icon/ArrowBack/ArrowBack';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CardCarouselBox.module.scss';

const CardCarouselBox = () => {
  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const sliderRef = useRef();

  return (
    <div className={styles.cardcontainer}>
      <div
        className={styles.arrowBack}
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ArrowBack />
      </div>
      <Slider {...settings} ref={sliderRef}>
        <div className={styles.cardBox}>
          <ItemCard priceStatus="above" />
        </div>
        <div className={styles.cardBox}>
          <ItemCard priceStatus="below" />
        </div>
        <div className={styles.cardBox}>
          <ItemCard priceStatus="above" />
        </div>
        <div className={styles.cardBox}>
          <ItemCard priceStatus="below" />
        </div>
        <div className={styles.cardBox}>
          <ItemCard priceStatus="equal" />
        </div>
        <div className={styles.cardBox}>
          <ItemCard priceStatus="above" />
        </div>
        <div className={styles.cardBox}>
          <ItemCard priceStatus="equal" />
        </div>
      </Slider>
      <div
        className={styles.arrowForward}
        onClick={() => sliderRef.current.slickNext()}
      >
        <ArrowForward />
      </div>
    </div>
  );
};

export default CardCarouselBox;
