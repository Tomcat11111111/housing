import React, { useRef, useState, useEffect } from 'react';
import Arrow from '../../icon/Arrow/Arrow';
import Image from 'next/image';
import Tag from '../Tag/Tag';
import Carousel from '../Carousel/Carousel';
import styles from './ItemCard.module.scss';

const priceStatusMap = new Map([
  [
    'above',
    {
      text: '略高於平均',
      color: '#E85454',
      icon: (
        <Image
          src="/housing/icon/trending_up.svg"
          alt="trending_up"
          width={20}
          height={20}
        />
      ),
    },
  ],
  [
    'below',
    {
      text: '略低於平均',
      color: '#52C32A',
      icon: (
        <Image
          src="/housing/icon/trending_down.svg"
          alt="trending_down"
          width={20}
          height={20}
        />
      ),
    },
  ],
  [
    'equal',
    {
      text: '等於平均',
      color: '#FAAF1D',
      icon: (
        <Image
          src="/housing/icon/trending_flat.svg"
          alt="trending_flat"
          width={20}
          height={20}
        />
      ),
    },
  ],
]);

const ItemCard = (props) => {
  const { priceStatus } = props;
  const priceStatusInfo = priceStatusMap.get(priceStatus);

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const node = cardRef.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup event listeners on unmount
      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [cardRef]);

  const images = [
    '/housing/image/house_item.png',
    '/housing/image/house_item.png',
    '/housing/image/house_item.png',
    '/housing/image/house_item.png',
  ];

  return (
    <div className={styles.itemCard} ref={cardRef}>
      <div className={styles.imgContainer}>
        <div className={styles.imgBox}>
          <Image
            src="/housing/image/house_item.png"
            alt="house_item"
            // width={389}
            // height={182}
            fill
          />
          {isHovered && (
            <>
              <button className={`${styles.carouselControl} ${styles.prev}`}>
                <Arrow color="#fff" />
              </button>
              <button className={`${styles.carouselControl} ${styles.next}`}>
                <Arrow color="#fff" />
              </button>
            </>
          )}
          {isHovered && (
            <div className={styles.indicators}>
              {images.map((_, index) => (
                <button key={index} className={`${styles.indicator}`} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.address}>
          景美站/羅斯六段高樓四房車位 坡平車位
        </div>
        <div className={styles.browse}>
          <Tag
            text="321人瀏覽"
            icon={
              <Image
                src="/housing/icon/eye.svg"
                alt="eye"
                width={20}
                height={20}
              />
            }
            gap="4px"
            iconPosition="left"
          />
          |
          <Tag
            text="10小時內更新"
            icon={
              <Image
                src="/housing/icon/time.svg"
                alt="time"
                width={20}
                height={20}
              />
            }
            gap="4px"
            iconPosition="left"
          />
        </div>
        <div className={styles.district}>文山區 | 31.12坪 | 15年 | 3F/5F</div>
        <div className={styles.icon}>
          <Tag
            text="3房"
            icon={
              <Image
                src="/housing/icon/bed.svg"
                alt="bed"
                width={20}
                height={20}
              />
            }
            gap="8px"
            padding="8px"
            iconPosition="left"
            borderColor="#F6F6F6"
            textStyle={{
              color: '#333',
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
          <Tag
            text="2聽"
            icon={
              <Image
                src="/housing/icon/couch.svg"
                alt="couch"
                width={20}
                height={20}
              />
            }
            gap="8px"
            padding="8px"
            iconPosition="left"
            borderColor="#F6F6F6"
            textStyle={{
              color: '#333',
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
          <Tag
            text="3衛"
            icon={
              <Image
                src="/housing/icon/tub.svg"
                alt="tub"
                width={20}
                height={20}
              />
            }
            gap="8px"
            padding="8px"
            iconPosition="left"
            borderColor="#F6F6F6"
            textStyle={{
              color: '#333',
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
        </div>
        <hr />
      </div>
      <div className={styles.bottom}>
        <Tag
          text={priceStatusInfo.text}
          textStyle={{
            color: '#F6F6F6',
            fontSize: isHovered ? '16px' : '14px',
          }}
          tagColor={priceStatusInfo.color}
          iconPosition="right"
          icon={priceStatusInfo.icon}
          padding="8px 16px"
          gap="4px"
        />
        <span style={{ fontSize: isHovered ? '20px' : '16px' }}>31,910/月</span>
      </div>
    </div>
  );
};

export default ItemCard;
