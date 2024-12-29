import styles from './Main.module.scss';

const PropertyInfo = ({ 
  title,
  categoryStr = '',
  room = 0,
  livingRoom = 0,
  bathroom = 0,
  balcony = 0,
  squareMeters = 0,
  floor = 0,
  totalFloors = 0,
  shape = {},
}) => {

  return (
    <div className={styles.titleArea}>
      <span className={styles.title}>{title}</span>
      {/* // TODO: Tag區域後續補上 */}
      {/* 
        <div className={styles.tags}>
          <Tag
            text="含車位"
            textStyle={{
              color: '#FFFFFF',
            }}
            tagColor="#0936D8"
            padding="4px 8px"
          />
          <Tag
            text="有陽台"
            textStyle={{
              color: '#FFFFFF',
            }}
            tagColor="#0936D8"
            padding="4px 8px"
          />
          <Tag
            text="低公設"
            textStyle={{
              color: '#FFFFFF',
            }}
            tagColor="#0936D8"
            padding="4px 8px"
          />
          <Tag
            text="明星學區"
            textStyle={{
              color: '#FFFFFF',
            }}
            tagColor="#0936D8"
            padding="4px 8px"
          />
        </div> 
      */}
      <div className={styles.propertyInfo}>
        <div className={styles.propertyInfoGroup}>
          <span className={styles.typeName}>類型</span>
          <span className={styles.type}>{categoryStr}</span>
        </div>
        <div className={styles.propertyInfoGroup}>
          <span className={styles.typeName}>格局</span>
          <span className={styles.type}>
            {room} 房 / {livingRoom} 廳 / {bathroom} 衛 / {balcony} 陽台
          </span>
        </div>
        <div className={styles.propertyInfoGroup}>
          <span className={styles.typeName}>坪數</span>
          <span className={styles.type}>{squareMeters} 坪</span>
        </div>
        <div className={styles.propertyInfoGroup}>
          <span className={styles.typeName}>樓層</span>
          <span className={styles.type}>
            {floor}F / {totalFloors}F
          </span>
        </div>
        <div className={styles.propertyInfoGroup}>
          <span className={styles.typeName}>型態</span>
          <span className={styles.type}>{shape.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;