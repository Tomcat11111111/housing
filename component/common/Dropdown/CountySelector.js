import { useRef, useEffect } from 'react';
import styles from './CountySelector.module.scss';

const CountySelector = ({ value, onChange, setIsDropdownOpen }) => {
  const selectorRef = useRef(null);

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
      <div>
        <div className={styles.district}>北部</div>
        <div className={styles.countyBox}>
          <span className={styles.county}>台北市</span>
          <span className={styles.county}>新北市</span>
          <span className={styles.county}>桃園市</span>
          <span className={styles.county}>新竹市</span>
          <span className={styles.county}>新竹縣</span>
          <span className={styles.county}>基隆市</span>
        </div>
      </div>
      <div>
        <div className={styles.district}>中部</div>
        <div className={styles.countyBox}>
          <span className={styles.county}>台中市</span>
          <span className={styles.county}>彰化縣</span>
          <span className={styles.county}>南投縣</span>
          <span className={styles.county}>苗栗縣</span>
          <span className={styles.county}>雲林縣</span>
        </div>
      </div>
      <div>
        <div className={styles.district}>南部</div>
        <div className={styles.countyBox}>
          <span className={styles.county}>台南市</span>
          <span className={styles.county}>高雄市</span>
          <span className={styles.county}>嘉義市</span>
          <span className={styles.county}>嘉義縣</span>
          <span className={styles.county}>屏東縣</span>
        </div>
      </div>
      <div>
        <div className={styles.district}>東部</div>
        <div className={styles.countyBox}>
          <span className={styles.county}>宜蘭市</span>
          <span className={styles.county}>花蓮縣</span>
          <span className={styles.county}>台東縣</span>
          <span className={styles.county}>澎湖縣</span>
          <span className={styles.county}>金門縣</span>
          <span className={styles.county}>連江縣</span>
        </div>
      </div>
    </div>
  );
};

export default CountySelector;
