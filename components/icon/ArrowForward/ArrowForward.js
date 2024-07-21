import Image from 'next/image';
import styles from './ArrowForward.module.scss';

const ArrowForward = () => {
  return (
    <div className={styles.arrowSquareBox}>
      <Image
        src="/housing/icon/arrow_forward.svg"
        alt="arrow_forward"
        width={24}
        height={24}
      />
    </div>
  );
};

export default ArrowForward;
