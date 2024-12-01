import Image from 'next/image';

import Button from '@/components/common/Button/Button';
import Photo from '@/components/icon/Photo/Photo';

import styles from './DetailImage.module.scss';

const DetailImage = (props) => {
  const { images } = props;
  //TODO:接物件的圖片
  return (
    <figure className={styles.imgArea}>
      <div style={{ position: 'relative', width: '50%', height: '400px' }}>
        <Image
          style={{
            borderRadius: '16px 0 0 16px',
          }}
          src={images[0] ? images[0].url : '/image/house_item.png'}
          alt={1}
          fill
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '50%',
              height: '196px',
            }}
          >
            <Image
              src={images[1] ? images[1].url : '/image/house_item.png'}
              alt={1}
              fill
            />
          </div>
          <div
            style={{
              position: 'relative',
              width: '50%',
              height: '196px',
            }}
          >
            <Image
              style={{
                borderRadius: '0 16px 0 0',
              }}
              src={images[2] ? images[2].url : '/image/house_item.png'}
              alt={1}
              fill
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div
            style={{
              position: 'relative',
              width: '50%',
              height: '196px',
            }}
          >
            <Image
              src={images[3] ? images[3].url : '/image/house_item.png'}
              alt={1}
              fill
            />
          </div>
          <div
            style={{
              position: 'relative',
              width: '50%',
              height: '196px',
            }}
          >
            <Image
              style={{
                borderRadius: '0 0 16px 0',
              }}
              src={images[4] ? images[4].url : '/image/house_item.png'}
              alt={1}
              fill
            />
          </div>
        </div>
      </div>
      <div className={styles.imgCount}>
        <Button
          buttonText="53+"
          textStyle={{
            color: '#FFF',
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '24px',
          }}
          buttonStyle={{
            borderRadius: '8px',
            opacity: 0.8,
            background: '#333',
            padding: '16px',
            gap: '8px',
          }}
          icon={<Photo />}
          iconPosition="left"
        />
      </div>
    </figure>
  );
};

export default DetailImage;
