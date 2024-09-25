import { useEffect, useRef, useState } from 'react';

import styles from './Counter.module.scss';

export default function Counter({ text, Icon, count = 0, setCount }) {
  const [isHovered, setIsHovered] = useState(false);
  const counterRef = useRef();

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const node = counterRef.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [counterRef]);

  return (
    <div
      className={styles.counterContainer}
      ref={counterRef}
      style={{ border: isHovered || count > 0 ? '1px solid #333333' : null }}
    >
      <div
        className={styles.iconContainer}
        style={{ color: isHovered || count > 0 ? '#333333' : null }}
      >
        <Icon
          {...{
            color: isHovered || count > 0 ? '#333333' : '#909090',
            size: '24px',
          }}
        />
        <p>{text}</p>
      </div>
      <div className={styles.counterArea}>
        <button
          className={styles.button}
          onClick={() => {
            if (count === 0) return;

            setCount(count - 1);
          }}
          style={{ opacity: count === 0 ? 0.2 : null }}
        >
          -
        </button>
        <span
          className={styles.counter}
          style={{ color: count > 0 ? '#333333' : '#909090' }}
        >
          {count === 0 ? '--' : count}
        </span>
        <button className={styles.button} onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
