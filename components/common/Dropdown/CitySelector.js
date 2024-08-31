import styles from './CitySelector.module.scss';

const CitySelector = ({
  value,
  onChange,
  setIsDropdownOpen,
  citiesOptions = [],
}) => {
  return (
    <div className={styles.citySelector}>
      {citiesOptions?.map((region) => {
        return (
          <div key={`${region.name}_region`}>
            <div className={styles.region}>{region.name}</div>
            <div className={styles.cityBox}>
              {region.cities.map((city) => {
                return (
                  <span
                    key={`${city.displayName}_city`}
                    className={styles.city}
                    data-active={value === city.id ? 'active' : ''}
                    onClick={() => {
                      onChange(city);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {city.displayName}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CitySelector;
