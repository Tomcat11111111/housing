'use client';

import { useEffect, useRef, useState } from 'react';

import Button from '@components/common/Button/Button';
import Dropdown from '@components/common/Dropdown/Dropdown';
import ItemCard from '@components/common/ItemCard/ItemCard';
import Image from 'next/image';

import Header from './Header';
import styles from './Search.module.scss';
import Slider from './Slider';

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

const FILTER_DROPDOWN_LIST = [
  { value: '預設', text: '預設' },
  { value: '金額 大到小', text: '金額 大到小' },
  { value: '金額 小到大', text: '金額 小到大' },
  { value: '坪數 大到小', text: '坪數 大到小' },
  { value: '坪數 小到大', text: '坪數 小到大' },
  { value: '刊登時間 新到舊', text: '刊登時間 新到舊' },
  { value: '刊登時間 舊到新', text: '刊登時間 舊到新' },
];

export default function Search() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [filterOption, setFilterOption] = useState('預設');

  const cardListRef = useRef(null);
  const [cardWidth, setCardWidth] = useState();

  useEffect(() => {
    const calculateCardNum = () => {
      const cardListWidth = cardListRef.current?.offsetWidth;
      const cardNum = Math.floor((cardListWidth + 16) / 286);

      setCardWidth((cardListWidth - (cardNum - 1) * 16) / cardNum);
    };

    window.addEventListener('resize', calculateCardNum);

    calculateCardNum();

    return () => {
      window.removeEventListener('resize', calculateCardNum);
    };
  }, [isSideBarOpen]);

  return (
    <div>
      <div className={styles.header}>
        <Header headerType="white" />
      </div>
      <div className={styles.page}>
        {isSideBarOpen && <Slider isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />}
        <div className={styles.listContainer}>
          <div className={styles.buttonArea}>
            {!isSideBarOpen && (
              <Button
                buttonText="展開篩選"
                buttonType="transparent"
                iconPosition="left"
                icon={
                  <Image
                    src="/housing/icon/setting.svg"
                    alt="setting"
                    width={24}
                    height={24}
                  />
                }
                textStyle={{
                  color: '#333',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                buttonStyle={{
                  border: '1px solid #E9E9E9',
                  padding: '16px',
                  gap: '8px',
                  borderRadius: '8px',
                  background: '#FFF',
                }}
                action={() => setIsSideBarOpen(true)}
              />
            )}
            <div className={styles.dropdownButton}>
              <Dropdown
                dropdownType="menu"
                optionList={FILTER_DROPDOWN_LIST}
                value={filterOption}
                onChange={(item) => setFilterOption(item.value)}
              />
            </div>
          </div>
          <div className={styles.cardList} ref={cardListRef}>
            {BUY_HOUSE_MOCK_LIST.map((itemData, index) => (
              <div
                className={styles.cardContainer}
                style={{
                  width: `${cardWidth}px`,
                }}
                key={index}
              >
                {cardWidth && <ItemCard itemData={itemData} index={index} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
