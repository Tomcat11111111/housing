import styles from './Main.module.scss';

const FacilityRules = (props) => {
  const { landLordOffer, equipments, modifyRules, inclusions } = props;
  console.log('🚀 ~ FacilityRules ~ props:', props);
  return (
    <div className={styles.area}>
      <span className={styles.title}>設備＆規則</span>
      <div className={styles.infoArea}>
        <span className={styles.infoType}>{landLordOffer.title}</span>
        {landLordOffer.content.map((offer, index) => (
          <div key={`offer_${index}`} className={styles.infoGroup}>
            <p className={styles.colon}>{offer.subtitle}：</p>
            <p className={styles.info}>{offer.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.infoArea}>
        <span className={styles.infoType}>房屋設備</span>
        {equipments?.content.map((item) => (
          <div className={styles.infoGroup} key={item?.subtitle}>
            <p className={styles.colon}>{item?.subtitle}：</p>
            <p className={styles.info}>{item?.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.infoArea}>
        <span className={styles.infoType}>租屋規則</span>
        <div className={styles.singleArea}>
          {modifyRules.map((rule, index) => (
            <span className={styles.singleInfo} key={`rule_${index}`}>
              <p className={styles.colon}>{rule.subtitle}：</p>
              <p className={styles.info}>{rule.description}</p>
            </span>
          ))}
        </div>
        <div className={styles.infoGroup}>
          <p className={styles.colon}>{inclusions?.subtitle}：</p>
          <p className={styles.info}>{inclusions?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FacilityRules;
