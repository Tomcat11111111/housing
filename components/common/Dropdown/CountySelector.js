import { useRef, useEffect } from 'react';
import styles from './CountySelector.module.scss';

const CountySelector = ({ value, onChange, setIsDropdownOpen }) => {
  const selectorRef = useRef(null);

  // TODO: 這邊的資料改為從API傳
  const DISTRICT_LIST = [
    {
      name: '北部',
      counties: ['台北市', '新北市', '桃園市', '新竹市', '新竹縣', '基隆市'],
    },
    {
      name: '中部',
      counties: ['台中市', '彰化縣', '南投縣', '苗栗縣', '雲林縣'],
    },
    {
      name: '南部',
      counties: ['台南市', '高雄市', '嘉義市', '嘉義縣', '屏東縣'],
    },
    {
      name: '東部',
      counties: ['宜蘭市', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'],
    },
  ];

  useEffect(() => {
    const node = selectorRef.current;

    const handleClick = (e) => {
      onChange(e.target.innerText);
      setIsDropdownOpen(false);
    };

    node.addEventListener('click', handleClick);

    return () => {
      node.removeEventListener('click', handleClick);
    };
  }, []);

  //TODO:改成用資料長樣式

  return (
    <div className={styles.countySelector} ref={selectorRef}>
      {DISTRICT_LIST.map((district) => {
        return (
          <>
            <div className={styles.district} key={`${district.name}_district`}>
              {district.name}
            </div>
            <div className={styles.countyBox}>
              {district.counties.map((county) => {
                return (
                  <span
                    key={`${county}_county`}
                    className={styles.county}
                    data-active={value === county ? 'active' : ''}
                  >
                    {county}
                  </span>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CountySelector;
