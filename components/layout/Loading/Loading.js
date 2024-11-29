import Ellipse from '@/icon/Ellipse/Ellipse';

import styles from './Loading.module.scss';

export default function Loading({ size = 100, text = '' }) {
  return (
    <div className={styles.loadingContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          className={styles.outterSpin}
          d="M50 5C55.9095 5 61.7611 6.16396 67.2208 8.42542C72.6804 10.6869 77.6412 14.0016 81.8198 18.1802C85.9984 22.3588 89.3131 27.3196 91.5746 32.7792C93.836 38.2389 95 44.0905 95 50C95 55.9095 93.836 61.7611 91.5746 67.2208C89.3131 72.6804 85.9984 77.6412 81.8198 81.8198C77.6412 85.9984 72.6804 89.3131 67.2208 91.5746C61.7611 93.836 55.9095 95 50 95"
          stroke="#0936D8"
          stroke-width="10"
          stroke-linecap="round"
        />
        <path
          className={styles.innerSpin}
          opacity="0.4"
          d="M49.9993 27.9173C52.8994 27.9173 55.771 28.4885 58.4503 29.5983C61.1295 30.7081 63.564 32.3347 65.6146 34.3854C67.6653 36.436 69.2919 38.8704 70.4017 41.5497C71.5115 44.229 72.0827 47.1006 72.0827 50.0006C72.0827 52.9007 71.5115 55.7723 70.4017 58.4516C69.2919 61.1308 67.6653 63.5653 65.6146 65.6159C63.564 67.6666 61.1295 69.2932 58.4503 70.403C55.771 71.5128 52.8994 72.084 49.9993 72.084"
          stroke="#0936D8"
          stroke-width="10"
          stroke-linecap="round"
        />
      </svg>
      <div className={styles.text}>
        {text}
        <div className={styles.ellipse}>
          <Ellipse /> <Ellipse /> <Ellipse />
        </div>
      </div>
    </div>
  );
}
