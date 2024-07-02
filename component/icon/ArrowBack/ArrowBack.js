import Image from 'next/image';
import styles from './ArrowBack.module.scss';

const ArrowBack = () => {
  return (
    <div className={styles.arrowSquareBox}>
      <Image
        src="/housing/icon/arrow_back.svg"
        alt="arrow_back"
        width={24}
        height={24}
      />
    </div>
  );
};

export default ArrowBack;
