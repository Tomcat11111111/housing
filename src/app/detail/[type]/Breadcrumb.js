import styles from './Main.module.scss';

const Breadcrumb = ({
  type,
  city,
  district,
  categoryStr,
  location,
  setSearchParams,
  router,
}) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <span className={styles.breadcrumb} onClick={() => router.push('/')}>
        首頁
      </span>
      &gt;
      <span
        className={styles.breadcrumb}
        onClick={() => router.push('/search')}
      >
        {type === 'rent' ? '租房' : '買房'}
      </span>
      &gt;
      <span
        className={styles.breadcrumb}
        onClick={() => {
          setSearchParams({
            cityIds: city?.id,
            city: {
              id: city?.id,
              displayName: city?.displayName,
            },
          });
          router.push('/search');
        }}
      >
        {city?.displayName}
      </span>
      &gt;
      <span
        className={styles.breadcrumb}
        onClick={() => {
          setSearchParams({
            districtIds: district?.id,
            cityIds: city?.id,
            city: {
              id: city?.id,
              displayName: city?.displayName,
            },
          });
          router.push('/search');
        }}
      >
        {district?.displayName}
      </span>
      &gt;
      {categoryStr && (
        <>
          <span className={styles.breadcrumb}>{categoryStr}</span>&gt;
        </>
      )}
      <span className={styles.address}>{location?.address}</span>
    </div>
  );
};

export default Breadcrumb;
