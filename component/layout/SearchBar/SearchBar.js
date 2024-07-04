import Image from 'next/image';
import Button from '../../common/Button/Button';
import Dropdown from '../../common/Dropdown/Dropdown';
import Input from '../../common/Input/Input';
import House from '../../../component/icon/House/House';
import Arrow from '../../../component/icon/Arrow/Arrow';
import Search from '../../../component/icon/Search/Search';
import styles from './SearchBar.module.scss';

const SearchBar = (props) => {
  const { isStickyMode } = props;

  return (
    <div className={styles.search} data-sticky={isStickyMode ? 'sticky' : ''}>
      {isStickyMode ? (
        <div className={styles.stickySearchBar}>
          <Button
            buttonText="買房子"
            textStyle={{ color: '#FFFFFF' }}
            buttonStyle={{
              backgroundColor: '#FF8E26',
              padding: '8px 32px',
              gap: '8px',
            }}
            icon={<House color="#FFFFFF" />}
            iconPosition="left"
          />
          <div className={styles.group}>
            <Dropdown
              isHasBorder={false}
              optionList={[
                { text: '台北市', value: 'taipei' },
                { text: '高雄市', value: 'kaoshiun' },
                { text: '台南市', value: 'tainan' },
                { text: '花蓮市', value: 'hualien' },
              ]}
              value="taipei"
            />
            <div className={styles.searchInput}>
              <Input
                iconPosition="left"
                placeholder="請輸入地點/街道/社區或其他資訊"
              />
            </div>
            <Button
              buttonText="搜尋"
              textStyle={{
                color: '#FFF',
              }}
              buttonStyle={{
                backgroundColor: '#FF8E26',
                padding: '16px 22px 16px 16px',
                gap: '8px',
              }}
              icon={<Search color="#FFFFFF" />}
              iconPosition="left"
            />
          </div>
          <Button
            buttonText="縮小篩選"
            iconPosition="left"
            icon={
              <Image
                src="/housing/icon/setting.svg"
                alt="setting"
                width={24}
                height={24}
              />
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
          />
          <Button
            buttonText="篩選更多"
            iconPosition="right"
            icon={<Arrow />}
            textStyle={{
              color: '#333',
              fontSize: '14px',
              lineHeight: '20px',
            }}
            buttonStyle={{
              border: '1px solid #E9E9E9',
              opacity: 0.6,
              padding: '8px 8px 8px 16px',
              gap: '8px',
            }}
          />
        </div>
      ) : (
        <>
          <div className={styles.searchHeader}>
            <div className={styles.tabArea}>
              <Button
                buttonText="買房子"
                textStyle={{ color: '#FFFFFF' }}
                buttonStyle={{
                  backgroundColor: '#FF8E26',
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#FFFFFF" />}
                iconPosition="left"
              />
              <Button
                buttonText="新建案"
                textStyle={{ color: '#CCCCCC' }}
                buttonStyle={{
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#CCCCCC" />}
                iconPosition="left"
              />
              <Button
                buttonText="租房子"
                textStyle={{ color: '#CCCCCC' }}
                buttonStyle={{
                  padding: '8px 32px',
                  gap: '8px',
                }}
                icon={<House color="#CCCCCC" />}
                iconPosition="left"
              />
            </div>
            <div className={styles.buttonArea}>
              <Button
                buttonText="縮小篩選"
                iconPosition="left"
                icon={
                  <Image
                    src="/housing/icon/setting.svg"
                    alt="setting"
                    width={24}
                    height={24}
                  />
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
              />
              <Button
                buttonText="篩選更多"
                iconPosition="right"
                icon={<Arrow />}
                textStyle={{
                  color: '#333',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                buttonStyle={{
                  border: '1px solid #E9E9E9',
                  opacity: 0.6,
                  padding: '8px 8px 8px 16px',
                  gap: '8px',
                }}
              />
            </div>
          </div>
          <div className={styles.mapFill}></div>
          <div className={styles.searchBar}>
            <Dropdown
              isHasBorder={false}
              optionList={[
                { text: '台北市', value: 'taipei' },
                { text: '高雄市', value: 'kaoshiun' },
                { text: '台南市', value: 'tainan' },
                { text: '花蓮市', value: 'hualien' },
              ]}
              value="taipei"
            />
            <div className={styles.searchInput}>
              <Input
                iconPosition="left"
                placeholder="請輸入地點/街道/社區或其他資訊"
              />
            </div>
            <Button
              buttonText="搜尋"
              textStyle={{
                color: '#FFF',
              }}
              buttonStyle={{
                backgroundColor: '#FF8E26',
                padding: '16px 22px 16px 16px',
                gap: '8px',
              }}
              icon={<Search color="#FFFFFF" />}
              iconPosition="left"
            />
          </div>
          <div className={styles.dropdownBar}>
            <div className={styles.dropdown}>
              <Dropdown isHasBorder placeholder="物件類型" />
            </div>
            <div className={styles.dropdown}>
              <Dropdown isHasBorder placeholder="總售價" />
            </div>
            <div className={styles.dropdown}>
              <Dropdown isHasBorder placeholder="單坪售價" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
