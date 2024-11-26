import Button from '@/components/common/Button/Button';

import Reload from '@/icon/Reload/Reload';

import styles from './NoData.module.scss';

export default function NoData({ func = () => {} }) {
  return (
    <div className={styles.noDataContainer}>
      <svg
        width="133"
        height="117"
        viewBox="0 0 133 117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <g id="Group_2">
            <path
              id="Vector"
              d="M98.8326 73.3333H93.5659L91.6992 71.5333C98.2326 63.9333 102.166 54.0667 102.166 43.3333C102.166 19.4 82.7659 0 58.8326 0C36.0326 0 17.3659 17.6 15.6992 40H29.1659C30.8326 25 43.3659 13.3333 58.8326 13.3333C75.4326 13.3333 88.8326 26.7333 88.8326 43.3333C88.8326 59.9333 75.4326 73.3333 58.8326 73.3333C57.6992 73.3333 56.6326 73.1333 55.4992 73V86.4667C56.6326 86.6 57.6992 86.6667 58.8326 86.6667C69.5659 86.6667 79.4325 82.7333 87.0325 76.2L88.8326 78.0667V83.3333L122.166 116.6L132.099 106.667L98.8326 73.3333Z"
              fill="#909090"
            />
            <path
              id="Vector_2"
              d="M38.6335 52.1328L22.1668 68.5995L5.70013 52.1328L0.966797 56.8661L17.4335 73.3328L0.966797 89.7995L5.70013 94.5328L22.1668 78.0661L38.6335 94.5328L43.3668 89.7995L26.9001 73.3328L43.3668 56.8661L38.6335 52.1328Z"
              fill="#909090"
            />
          </g>
        </g>
      </svg>
      <div className={styles.text}>很抱歉！目前沒有符合的物件</div>
      <Button
        buttonText="重置篩選條件"
        buttonStyle={{
          padding: '8px',
          borderRadius: '8px',
          border: '1px solid #E9E9E9',
          gap: '8px',
          background: '#FFF',
        }}
        icon={<Reload />}
        iconPosition="left"
        action={func}
      />
    </div>
  );
}
