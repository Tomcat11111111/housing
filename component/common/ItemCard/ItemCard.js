import Image from 'next/image';
import Tag from '../Tag/Tag';
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

  return (
    <div className={styles.itemCard}>
      <Image
        src="/housing/image/house_item.png"
        alt="house_item"
        width={389}
        height={182}
      />
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
            tagColor="#F6F6F6"
            textStyle={{
              color: '#333',
              fontFamily: 'Montserrat',
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
            tagColor="#F6F6F6"
            textStyle={{
              color: '#333',
              fontFamily: 'Montserrat',
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
            tagColor="#F6F6F6"
            textStyle={{
              color: '#333',
              fontFamily: 'Montserrat',
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '4px',
            }}
          />
        </div>
        <hr />
        <div className={styles.bottom}>
          <Tag
            text={priceStatusInfo.text}
            textStyle={{ color: '#F6F6F6' }}
            tagColor={priceStatusInfo.color}
            iconPosition="right"
            icon={priceStatusInfo.icon}
            padding="8px 16px"
            gap="4px"
          />
          <span>31,910/月</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
