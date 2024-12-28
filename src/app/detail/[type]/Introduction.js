import { useMemo, useRef, useState } from 'react';

import ArrowDropdownUp from '@/components/icon/ArrowDropdownUp/ArrowDropdownUp';

import ArrowDropdownDown from '@/icon/ArrowDropdownDown/ArrowDropdownDown';

import styles from './Main.module.scss';

const Introduction = ({ introduction }) => {
  const [collapse, setCollapse] = useState(true);
  const textAreaRef = useRef(null);

  const textAreaHeight = useMemo(
    () => textAreaRef.current?.clientHeight,
    [textAreaRef.current]
  );

  if (!introduction) return null;

  return (
    <div className={styles.area}>
      <span className={styles.title}>屋況介紹</span>
      <p
        className={styles.describe}
        data-collapse={textAreaHeight && collapse ? 'collapse' : ''}
        dangerouslySetInnerHTML={{ __html: introduction }}
        ref={textAreaRef}
      />
      {textAreaHeight > 400 && (
        <div
          style={{ position: 'relative' }}
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? (
            <div className={styles.collapseBtn}>
              <p>查看全部</p>
              <ArrowDropdownDown color="#909090" />
            </div>
          ) : (
            <div className={styles.collapseBtn}>
              <p>收起介紹</p>
              <ArrowDropdownUp color="#909090" />
            </div>
          )}
          {collapse && <div className={styles.cover} />}
        </div>
      )}
    </div>
  );
};

export default Introduction;
