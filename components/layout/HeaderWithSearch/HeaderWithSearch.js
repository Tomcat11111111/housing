import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import BurgerMenu from '@/components/common/BurgerMenu/BurgerMenu';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import GroupTabDropdown from '@/components/common/GroupTabDropdown/GroupTabDropdown';
import Input from '@/components/common/Input/Input';
import Logo from '@/components/common/Logo/Logo';
import SearchIcon from '@/components/icon/SearchIcon/SearchIcon';

import styles from './HeaderWithSearch.module.scss';

const HeaderWithSearch = ({
  headerType = 'default',
  city,
  onCityChange = () => {},
  padding = '0 24px',
  selectedTab,
  onChange,
  input,
  setInput,
  search,
}) => {
  const getCitiesApi = async () => {
    const regionData = [];
    const response = await axios.get(
      'https://jzj-api.zeabur.app/locations/cities'
    );

    response.data.forEach((city) => {
      const regionGroup = regionData.find(
        (region) => region.name === city.region
      );

      if (regionGroup) {
        regionGroup.cities.push(city);
      } else {
        regionData.push({
          name: city.region,
          cities: [city],
        });
      }
    });

    return regionData;
  };

  const { data: citiesOptions } = useQuery({
    queryKey: ['getCitiesApi'],
    queryFn: getCitiesApi,
    initialData: [],
  });

  return (
    <header
      className={styles.header}
      data-header={headerType === 'white' ? 'white' : ''}
      style={{ padding }}
    >
      <div className={styles.iconArea}>
        <Logo size="small" />
        <GroupTabDropdown
          selectedTab={selectedTab}
          onChange={(value) => onChange(value)}
        />
      </div>
      <div className={styles.searchArea}>
        <Dropdown
          isHasNoBorder
          value={city.id}
          dropdownType="city"
          optionList={citiesOptions}
          onChange={(key) => onCityChange(key)}
          displayName={city.displayName}
        />
        <div className={styles.searchInput}>
          <Input
            iconPosition="left"
            placeholder="請輸入地點/街道/社區或其他資訊"
            input={input}
            onChange={(value) => setInput(value)}
          />
        </div>
        <Button
          buttonText="搜尋"
          textStyle={{
            color: '#FFF',
          }}
          buttonStyle={{
            backgroundColor: '#0936D8',
            padding: '16px 22px 16px 16px',
            gap: '8px',
          }}
          icon={<SearchIcon color="#FFFFFF" />}
          iconPosition="left"
          action={search}
        />
      </div>
      <div className={styles.buttonArea}>
        <button className={styles.burger}>
          <BurgerMenu />
        </button>
      </div>
    </header>
  );
};

export default HeaderWithSearch;
