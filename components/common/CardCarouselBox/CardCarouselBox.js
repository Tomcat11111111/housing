import { useRef } from 'react';
import React from 'react';

import ArrowBack from '../../icon/ArrowBack/ArrowBack';
import ArrowForward from '../../icon/ArrowForward/ArrowForward';
import ItemCard from '../ItemCard/ItemCard';
import styles from './CardCarouselBox.module.scss';

const CardCarouselBox = (props) => {
  const { cardItemList = [] } = props;

  // const sliderRef = useRef();

  return (
    cardItemList.length > 0 && (
      <div className={styles.cardCarouselBox}>
        <div
          className={styles.arrowBack}
          //TODO: 補上carousel操作
          // onClick={() => sliderRef.current.slickPrev()}
        >
          <ArrowBack />
        </div>
        <div className={styles.cardContainer}>
          {cardItemList.map((itemData, index) => (
            <div className={styles.cardBox} key={index}>
              <ItemCard
                itemData={itemData}
                index={index}
                averagePrice={12000}
              />
            </div>
          ))}
        </div>
        <div
          className={styles.arrowForward}
          // onClick={() => sliderRef.current.slickNext()}
        >
          <ArrowForward />
        </div>
      </div>
    )
  );
};

export default CardCarouselBox;
