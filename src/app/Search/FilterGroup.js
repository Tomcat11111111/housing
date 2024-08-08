import styles from './FilterGroup.module.scss';

export default function filterGroup(props) {
  const { title, filterType } = props;

  return (
    <div className={styles.filterGroup}>
      <div className={styles.filterTitle}>{title}</div>
      <div className={styles.filterContent}>
        {props.children && props.children}
      </div>
    </div>
  );
}
