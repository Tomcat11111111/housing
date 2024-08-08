import { useRef } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import ArrowForward from '../../icon/ArrowForward/ArrowForward';
import ArrowBack from '../../icon/ArrowBack/ArrowBack';
import React from 'react';
import styles from './CardCarouselBox.module.scss';

const BUY_HOUSE_MOCK_LIST = [
  {
    title: '景美站/羅斯六段高樓含車位 坡平車位',
    views: 1234,
    updatedAt: 1672531199000,
    district: '文山區',
    squareMeters: 120,
    totalSquareMeters: 150,
    floor: 7,
    totalFloor: 12,
    houseAge: 10,
    layout: {
      room: 3,
      living: 1,
      bath: 2,
    },
    price: 5000000,
    images: [
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
    floor: 15,
    totalFloor: 20,
    houseAge: 5,
    layout: {
      room: 2,
      living: 1,
      bath: 1,
    },
    price: 7000000,
    images: [
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
    totalSquareMeters: 45,
    floor: 2 + 1,
    totalFloor: 2,
    houseAge: 20,
    layout: {
      room: 4,
      living: 1,
      bath: 2,
    },
    price: 3000000,
    images: [
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
    totalSquareMeters: 34,
    floor: 5,
    totalFloor: 10,
    houseAge: 7,
    layout: {
      room: 1,
      living: 1,
      bath: 1,
    },
    price: 4000000,
    images: [
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
      '/housing/image/house_item.png',
    ],
  },
];

// axios properties/for-rent

const Arr = [
  {
    id: '56b714f9-bfb2-463f-b231-23a1b66d3e08',
    price: 1200,
    property: {
      id: '08aaf98a-b277-4216-afdf-1d5a68ddd6b9',
      title: 'Spacious Apartment Near Downtown',
      age: 5,
      squareMeters: 120,
      floor: 2,
      totalFloors: 5,
      room: 3,
      livingRoom: 1,
      bathroom: 2,
      balcony: 1,
      status: 'available',
      views: 0,
    },
  },
  {
    id: 'd574a13b-b2b6-4b54-bbb5-6733c0859ee3',
    price: 1200,
    property: {
      id: 'c994f2c9-f209-4880-8896-173c64c84cd0',
      title: 'Spacious Apartment Near Downtown 2',
      age: 5,
      squareMeters: 120,
      floor: 2,
      totalFloors: 5,
      room: 3,
      livingRoom: 1,
      bathroom: 2,
      balcony: 1,
      status: 'available',
      views: 0,
    },
  },
];

const MOCK_AVERAGE_PRICE = 5000000;

const CardCarouselBox = (props) => {
  const {
    cardItemList = BUY_HOUSE_MOCK_LIST,
    averagePrice = MOCK_AVERAGE_PRICE,
  } = props;

  const sliderRef = useRef();

  return (
    <div className={styles.cardcontainer}>
      <div
        className={styles.arrowBack}
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ArrowBack />
      </div>
      {cardItemList.map((itemData, index) => (
        <div className={styles.cardBox} key={index}>
          <ItemCard
            itemData={itemData}
            averagePrice={averagePrice}
            index={index}
          />
        </div>
      ))}
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
