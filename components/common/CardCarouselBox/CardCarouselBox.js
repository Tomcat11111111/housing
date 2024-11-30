import Slider from 'react-slick';

import ItemCard from '@/common/ItemCard/ItemCard';

import useSearchStore from '@/store/useSearchStore';

import ArrowBack from '@/icon/ArrowBack/ArrowBack';
import ArrowForward from '@/icon/ArrowForward/ArrowForward';

import styles from './CardCarouselBox.module.scss';

const CardCarouselBox = (props) => {
  const { cardItemList = [], type } = props;

  const { setSelectedTab } = useSearchStore();

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          right: -28,
          zIndex: 2,
          position: 'absolute',
          right: '10px',
          top: '50%',
          // borderRadius: '95px',
          // opacity: 0.8,
          // background: '#fff',
          // padding: '16px',
          // height: '56px',
          // width: '56px',
        }}
        onClick={onClick}
      >
        <ArrowForward />
      </div>
    );
  };

  // Custom Previous Arrow Component
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          left: -28,
          zIndex: 2,
          position: 'absolute',
          right: '10px',
          top: '50%',
        }}
        onClick={onClick}
      >
        <ArrowBack />
      </div>
    );
  };

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    // nextArrow: (
    //   // <div className={styles.arrowForward}>
    //   <NextArrow />
    //   // </div>
    // ),
    // prevArrow: (
    //   // <div className={styles.arrowBack}>
    //   <PrevArrow />
    //   // </div>
    // ),
  };

  return (
    cardItemList.length > 0 && (
      <Slider {...settings}>
        {cardItemList.map((itemData, index) => (
          <div
            className={styles.cardBox}
            key={index}
            onClick={() => {
              setSelectedTab(type);
            }}
          >
            <ItemCard itemData={itemData} index={index} averagePrice={12000} />
          </div>
        ))}
      </Slider>
    )
  );
};

export default CardCarouselBox;
