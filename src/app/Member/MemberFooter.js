'use client';

import Button from '@/components/common/Button/Button';
import SmallArrow from '@/components/icon/SmallArrow/SmallArrow';

import styles from './MemberFooter.module.scss';

const MemberFooter = () => {
  return (
    <footer className={styles.footer} style={{ justifyContent: 'end' }}>
      <Button
        buttonText="下一步"
        isDisabled
        buttonStyle={{
          padding: '8px 16px',
          display: 'flex',
          gap: '8px',
        }}
        textStyle={{
          color: '#FFF',
          fontWeight: 600,
        }}
        iconPosition="right"
        icon={<SmallArrow color="#FFF" size={24} />}
      />
    </footer>
  );
};

export default MemberFooter;
