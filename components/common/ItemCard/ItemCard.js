import React, { useEffect, useRef, useState } from 'react';

import Bookmark from '@common/Bookmark/Bookmark';
import GrassIcon from '@components/icon/GrassIcon/GrassIcon';
import BedIcon from '@icon/BedIcon/BedIcon';
import CouchIcon from '@icon/CouchIcon/CouchIcon';
import TubIcon from '@icon/TubIcon/TubIcon';
import { getPriceStatusInfo } from '@utils/tools';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Arrow from '../../icon/Arrow/Arrow';
import Carousel from '../Carousel/Carousel';
import Tag from '../Tag/Tag';
import styles from './ItemCard.module.scss';

const ItemCard = (props) => {
  const { itemData, averagePrice, index } = props;

  const {
    id,
    title,
    views = 0,
    updatedAt = '',
    district = '',
    squareMeters,
    floor,
    totalFloors,
    age,
    room,
    bathroom,
    livingRoom,
    balcony,
    price = null,
    images = [],
  } = itemData;

  const router = useRouter();

  const priceStatusInfo = getPriceStatusInfo(price, averagePrice);

  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false); // TODO:接api的值，後續值更新時要去打api
  const cardRef = useRef();

  const getPropertyInfo = () => {
    let result = '';
    if (district) result += `${district} | `;
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
        <div className={styles.address}>{title}</div>
        <div className={styles.browse}>
          <Tag
            text={`${views}人瀏覽`}
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
        <div className={styles.propertyInfo}>{getPropertyInfo()}</div>
        <div className={styles.icon}>
          <Tag
            text={room}
            icon={<BedIcon />}
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
            text={livingRoom}
            icon={<CouchIcon />}
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
            text={bathroom}
            icon={<TubIcon />}
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
            text={balcony}
            icon={<GrassIcon />}
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
        />
        {price && <span>{price.toLocaleString()}/月</span>}
      </div>
    </div>
  );
};

export default ItemCard;
