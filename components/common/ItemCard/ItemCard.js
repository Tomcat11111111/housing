import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { slice } from 'ramda';

import Bookmark from '@/common/Bookmark/Bookmark';
import Tag from '@/common/Tag/Tag';

import CustomStepper from '@/components/common/Stepper/Stepper';

import { getPriceStatusInfo, getSalePriceDisplay } from '@/utils/tools';

import Arrow from '@/icon/Arrow/Arrow';
import BedIcon from '@/icon/BedIcon/BedIcon';
import Clock from '@/icon/Clock/Clock';
import CouchIcon from '@/icon/CouchIcon/CouchIcon';
import Eye from '@/icon/Eye/Eye';
import GrassIcon from '@/icon/GrassIcon/GrassIcon';
import TubIcon from '@/icon/TubIcon/TubIcon';

import styles from './ItemCard.module.scss';

const ItemCard = (props) => {
  const { itemData, averagePrice, index, type } = props;

  const {
    id = '',
    title,
    views,
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
    location = {},
    totalPrice,
    unitPrice,
  } = itemData;
  const { district = '' } = location;

  const router = useRouter();

  const tempAveragePrice = type === 'buy' ? 25000000 : 50000; // TODO: 先寫死，之後要改成從API取得

  const displayPrice = type === 'buy' ? totalPrice : price;
  const priceStatusInfo = getPriceStatusInfo(displayPrice, tempAveragePrice);

  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardRef = useRef();
  const [activeStep, setActiveStep] = useState(0);

  const getPropertyInfo = () => {
    let result = '';
    if (district.displayName) result += `${district.displayName} | `;
    if (squareMeters) result += `${squareMeters}坪 | `;
    if (age) result += `${age}年 | `;
    if (floor) result += `${floor}F/${totalFloors}F`;

    return result;
  };

  const cardColor = isHovered ? '#333' : '#666';

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % images.length);
  };

  const handleBack = () => {
    setActiveStep((prevStep) =>
      prevStep === 0 ? images.length - 1 : prevStep - 1
    );
  };

  const getImageurl = (images) => {
    if (images.length > 0) {
      if (images[activeStep]?.url) {
        return images[activeStep]?.url;
      }

      return images[activeStep];
    }

    return '/image/house_item.png';
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
        if (id) router.push(`/detail/${type}?id=${id}`);
      }}
    >
      <div className={styles.imgContainer}>
        <div className={styles.imgBox}>
          <Image
            src={getImageurl(images)} // TODO: 補上預設圖片（？
            alt="house_item"
            fill
          />
          {/* 
          //TODO:之後補上tag
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
          )} */}
          {isHovered && (
            <>
              <button
                className={`${styles.carouselControl} ${styles.prev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBack();
                }}
              >
                <Arrow color="#909090" size={12} direction="left" />
              </button>
              <button
                className={`${styles.carouselControl} ${styles.next}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <Arrow color="#909090" size={12} direction="right" />
              </button>
            </>
          )}
          {isHovered && (
            <div className=" absolute bottom-2 left-1/2 -translate-x-1/2">
              <CustomStepper
                steps={images.length}
                activeStep={activeStep}
                maxDots={3}
              />
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
        {views && updatedAt && (
          <div className={styles.browse}>
            {views && (
              <Tag
                text={`${views}人瀏覽`}
                icon={<Eye />}
                gap="4px"
                iconPosition="left"
              />
            )}
            |
            <Tag
              text={`${updatedAt}小時內更新`}
              icon={<Clock />}
              gap="4px"
              iconPosition="left"
            />
          </div>
        )}
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
        <div className={styles.priceTag}>
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
        </div>
        {price && type === 'rent' && (
          <span className={styles.price} data-hover={isHovered ? 'hover' : ''}>
            {price.toLocaleString()}/月
          </span>
        )}
        {totalPrice && type === 'buy' && (
          <div className={styles.priceBox}>
            <span>總價</span>
            <span
              className={styles.price}
              data-hover={isHovered ? 'hover' : ''}
            >
              {getSalePriceDisplay(totalPrice)} 萬
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
