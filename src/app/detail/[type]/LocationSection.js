import Map from '@/common/Map/Map';

import styles from './Main.module.scss';

const LocationSection = ({ location, geolocation }) => {
  console.log('🚀 ~ LocationSection ~ geolocation:', geolocation?.coordinates);

  return (
    <div className={styles.area}>
      <span className={styles.title}>位置＆周邊</span>
      <span className={styles.address}>
        <p className={styles.colon}>地址：</p>
        {location?.address}
      </span>
      {geolocation?.coordinates.length > 0 && (
        <div className={styles.mapFill}>
          <Map coordinates={geolocation?.coordinates} />
        </div>
      )}
    </div>
  );
};

export default LocationSection;
