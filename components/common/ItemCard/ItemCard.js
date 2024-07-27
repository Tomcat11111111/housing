import React, { useRef, useState, useEffect } from 'react';
import Arrow from '../../icon/Arrow/Arrow';
import Image from 'next/image';
import Tag from '../Tag/Tag';
import Carousel from '../Carousel/Carousel';
import TubIcon from '@components/icon/TubIcon/TubIcon';
import CouchIcon from '@components/icon/CouchIcon/CouchIcon';
import BedIcon from '@components/icon/BedIcon/BedIcon';
import styles from './ItemCard.module.scss';

const PRICE_STATUS_MAP = new Map([
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

/*
買房物件
{
  "title": String, //標題、名稱
  "views": Number, //瀏覽數
  "updatedAt": Number, //更新動態，看要什麼 日期格式
  "district": String, //地點
  "squareMeters": Number, //坪數
  "totalSquareMeters": Number,// 權狀坪數，之後要搞慮細節頁其他坪數，建物登記
  "totalFloor": Number // 總樓層
  "houseAge": Number, //屋齡
  "layout": {
    room: Number,
    living: Number,
    bath: Number,
 }, //格局
 "compare": Number, //價格比較，看是給平均前端做比較，還是後端直接給結論，ex: 0等於平均,1高於平均,2低於平均或是字串
 "price": Number, //價格
 "img": jpg, //物件照片(數張),jpg...
}
*/
const BUY_HOUSE_MOCK_LIST = [
  {
    title: '景美站/羅斯六段高樓四房車位 坡平車位',
    views: 1234,
    updatedAt: 1672531199000,
    district: '文山區',
    squareMeters: 120,
    totalSquareMeters: 150,
    totalFloor: 12,
    houseAge: 10,
    layout: {
      room: 3,
      living: 1,
      bath: 2,
    },
    compare: 0,
    price: 5000000,
    img: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '新生站/臨沂街矮樓 巷子內',
    views: 5487,
    updatedAt: 1672617599000,
    district: '中正區',
    squareMeters: 80,
    totalSquareMeters: 95,
    totalFloor: 20,
    houseAge: 5,
    layout: {
      room: 2,
      living: 1,
      bath: 1,
    },
    compare: 1,
    price: 7000000,
    img: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '信義路五段150巷11弄1號1樓',
    views: 2345,
    updatedAt: 1672703999000,
    district: '信義區',
    squareMeters: 90,
    totalSquareMeters: 100,
    totalFloor: 2,
    houseAge: 20,
    layout: {
      room: 4,
      living: 1,
      bath: 2,
    },
    compare: 2,
    price: 3000000,
    img: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
  {
    title: '近牯嶺街小劇場 明星學區',
    views: 654,
    updatedAt: 1672870399000,
    district: '中正區',
    squareMeters: 70,
    totalSquareMeters: 85,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    compare: 0,
    price: 4000000,
    img: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
];

/*
租屋物件
{
"title": String, //標題、名稱
"views": Number, //瀏覽數
"updatedAt": Number, //更新動態，看要什麼 日期格式
"district": String, //地點
"squareMeters": Number, //坪數
"floor": Number, //樓層
"totalFloor": Number // 總樓層
"layout": {
"room": Number,
"living": Number,
"bath": Number,
 }, //格局
"compare": Number, //價格比較，看是給平均前端做比較，還是後端直接給結論，ex: 0等於平均,1高於平均,2低於平均或是字串
"price": Number, //價格
"img": jpg, //物件照片(數張),jpg...
"isKeep": Boolean,// 是否收藏
}
*/

const getPriceStatusInfo = (price, average = 0) => {
  if (price > average) return PRICE_STATUS_MAP.get('above');
  if (price < average) return PRICE_STATUS_MAP.get('below');
  if (price === average) return PRICE_STATUS_MAP.get('equal');
};

const ItemCard = (props) => {
  const { itemData, averagePrice, index } = props;
  const {
    title,
    views,
    updatedAt,
    district,
    squareMeters,
    totalSquareMeters,
    floor,
    totalFloor,
    houseAge,
    layout,
    price,
    images,
  } = itemData;
  const { room, living, bath } = layout;

  const priceStatusInfo = getPriceStatusInfo(price, averagePrice);

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();

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
        <div
          className={styles.district}
        >{`${district} | ${totalSquareMeters}坪 | ${houseAge} | ${floor}F/${totalFloor}F`}</div>
        <div className={styles.icon}>
          <Tag
            text={`${room}房`}
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
            text={`${living}聽`}
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
            text={`${bath}衛`}
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
        </div>
        <hr />
      </div>
      <div className={styles.bottom} data-hover={isHovered ? 'hover' : ''}>
        <Tag
          text={priceStatusInfo.text}
          textStyle={{
            color: '#F6F6F6',
          }}
          tagColor={priceStatusInfo.color}
          iconPosition="right"
          icon={priceStatusInfo.icon}
          padding="8px 16px"
          gap="4px"
        />
        <span>31,910/月</span>
      </div>
    </div>
  );
};

export default ItemCard;
