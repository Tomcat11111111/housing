import { BookmarkIcon } from 'lucide-react';
import Image from 'next/image';

import Button from '@/common/Button/Button';

import Tag from '@/components/common/Tag/Tag';
import Share from '@/components/icon/Share/Share';

import styles from './Main.module.scss';

const ToolBar = ({ views, isBookmarked, setIsBookmarked }) => {
  return (
    <div className={styles.tool}>
      <div className={styles.browse}>
        <Tag
          text={`${views}人瀏覽`}
          icon={<Image src="/icon/eye.svg" alt="eye" width={20} height={20} />}
          gap="4px"
          iconPosition="left"
        />
        |
        <Tag
          text="10小時內更新"
          icon={
            <Image src="/icon/time.svg" alt="time" width={20} height={20} />
          }
          gap="4px"
          iconPosition="left"
        />
      </div>
      <div className={styles.btn}>
        <Button
          buttonText="分享"
          buttonType="transparent"
          iconPosition="left"
          icon={<Share />}
          textStyle={{
            color: '#333',
            fontSize: '14px',
            lineHeight: '20px',
          }}
          buttonStyle={{
            border: '1px solid #E9E9E9',
            opacity: 0.6,
            padding: '8px 16px 8px 16px',
            gap: '8px',
          }}
        />
        <Button
          buttonText="收藏"
          buttonType="transparent"
          iconPosition="left"
          icon={
            isBookmarked ? (
              <BookmarkIcon fill="#333333" color="#333333" />
            ) : (
              <BookmarkIcon color="#333333" />
            )
          }
          textStyle={{
            color: '#333',
            fontSize: '14px',
            lineHeight: '20px',
          }}
          buttonStyle={{
            border: '1px solid #E9E9E9',
            opacity: 0.6,
            padding: '8px 16px 8px 16px',
            gap: '8px',
          }}
          action={() => setIsBookmarked(!isBookmarked)}
        />
      </div>
    </div>
  );
};

export default ToolBar;
