import Image from 'next/image';
import styles from './Arrow.module.scss';

const Arrow = () => {
  return (
    <div className={styles.arrow}>
      <Image src="/icon/arrow.svg" alt="arrow" width={12} height={12} />
    </div>
  );
};

export default Arrow;
