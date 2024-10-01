import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Bookmark from '@/common/Bookmark/Bookmark';
import Carousel from '@/common/Carousel/Carousel';
import Tag from '@/common/Tag/Tag';

import { getPriceStatusInfo } from '@/utils/tools';

import Arrow from '@/icon/Arrow/Arrow';
import BedIcon from '@/icon/BedIcon/BedIcon';
import Clock from '@/icon/Clock/Clock';
import CouchIcon from '@/icon/CouchIcon/CouchIcon';
import Eye from '@/icon/Eye/Eye';
import GrassIcon from '@/icon/GrassIcon/GrassIcon';
import TubIcon from '@/icon/TubIcon/TubIcon';

import styles from './ItemCard.module.scss';

const ItemCard = (props) => {
  const { itemData, averagePrice, index } = props;

  const {
    id,
    title,
    views = 0,
    updatedAt = '',
    squareMeters,
    floor,
    totalFloors,
    age,
    room = 0,
    bathroom = 0,
    livingRoom = 0,
    balcony = 0,
    price = null,
    images = [],
    location,
  } = itemData;
  const { district } = location;

  const router = useRouter();

  const priceStatusInfo = getPriceStatusInfo(price, averagePrice);

  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardRef = useRef();

  const getPropertyInfo = () => {
    let result = '';
    if (district.displayName) result += `${district.displayName} | `;
    if (squareMeters) result += `${squareMeters}坪 | `;
    if (age) result += `${age} | `;
    if (floor) result += `${floor}F/${totalFloors}F`;

    return result;
  };

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const node = cardRef.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [cardRef]);

  const cardColor = isHovered ? '#333' : '#666';

  return (
    <div
      className={styles.itemCard}
      ref={cardRef}
      onClick={() => {
        if (id) router.push(`/Detail?id=${id}`);
      }}
    >
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
            <div className={styles.tagArea}>
              <Tag
                textStyle={{ color: '#FFFFFF' }}
                tagColor="#386CFC"
                text="新建案"
                padding="6px 8px"
              />
              <Tag
                textStyle={{ color: '#FFFFFF' }}
                tagColor="#386CFC"
                text="拍賣"
                padding="6px 8px"
              />
            </div>
          )}
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
                <button key={index} className={styles.indicator} />
              ))}
            </div>
          )}
          {isHovered && (
            <div className={styles.bookmark}>
              <Bookmark
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.address} style={{ color: cardColor }}>
          {title}
        </div>
        {/* TODO:color */}
        <div className={styles.browse}>
          <Tag
            text={`${views}人瀏覽`}
            icon={<Eye />}
            gap="4px"
            iconPosition="left"
          />
          |
          <Tag
            text="10小時內更新"
            icon={<Clock />}
            gap="4px"
            iconPosition="left"
          />
        </div>
        <div className={styles.propertyInfo} style={{ color: cardColor }}>
          {getPropertyInfo()}
        </div>
        <div className={styles.icon}>
          <Tag
            tagColor={isHovered ? '#F6F6F6' : ''}
            text={room}
            icon={<BedIcon color={cardColor} size={16} />}
            gap="8px"
            padding="4px 8px"
            iconPosition="left"
            borderColor="#F6F6F6"
            borderRadius="4px"
            textStyle={{
              color: cardColor,
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
          <Tag
            tagColor={isHovered ? '#F6F6F6' : ''}
            text={livingRoom}
            icon={<CouchIcon color={cardColor} size={16} />}
            gap="8px"
            padding="4px 8px"
            iconPosition="left"
            borderColor="#F6F6F6"
            borderRadius="4px"
            textStyle={{
              color: cardColor,
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
          <Tag
            tagColor={isHovered ? '#F6F6F6' : ''}
            text={bathroom}
            icon={<TubIcon color={cardColor} size={16} />}
            gap="8px"
            padding="4px 8px"
            iconPosition="left"
            borderColor="#F6F6F6"
            borderRadius="4px"
            textStyle={{
              color: cardColor,
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
          <Tag
            tagColor={isHovered ? '#F6F6F6' : ''}
            text={balcony}
            icon={<GrassIcon color={cardColor} size={16} />}
            gap="8px"
            padding="4px 8px"
            iconPosition="left"
            borderColor="#F6F6F6"
            borderRadius="4px"
            textStyle={{
              color: cardColor,
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
        </div>
        <hr />
      </div>
      <div className={styles.bottom} data-hover={isHovered ? 'hover' : ''}>
        <Tag
          text={priceStatusInfo?.text}
          textStyle={{
            color: '#F6F6F6',
          }}
          tagColor={priceStatusInfo?.color}
          iconPosition="right"
          icon={priceStatusInfo?.icon}
          padding="8px 16px"
          gap="4px"
          opacity={isHovered ? '' : 0.8}
        />
        {price && <span>{price.toLocaleString()}/月</span>}
      </div>
    </div>
  );
};

export default ItemCard;
