import styles from './Main.module.scss';

const PropertySummary = ({ propertySummary = [] }) => {
  console.log('🚀 ~ PropertySummary ~ propertySummary:', propertySummary);
  return (
    <div className={styles.area}>
      <span className={styles.title}>物件介紹</span>
      <div className={styles.infoArea}>
        {propertySummary.map((info, sectionIndex) => (
          <div key={`section_${sectionIndex}`}>
            <span className={styles.infoType}>{info.title}</span>
            <div className={styles.singleArea}>
              {info.content.map((item, index) => (
                <span
                  className={styles.singleInfo}
                  key={`info_${sectionIndex}_${index}`}
                >
                  <p className={styles.colon}>{item.subtitle}：</p>
                  <p className={styles.info}>{item.description}</p>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySummary;
