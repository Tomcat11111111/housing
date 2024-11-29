'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { filter, find, map, propEq } from 'ramda';

import Button from '@/common/Button/Button';
import Map from '@/common/Map/Map';

import Tag from '@/components/common/Tag/Tag';
import ArrowDropdownUp from '@/components/icon/ArrowDropdownUp/ArrowDropdownUp';
import Share from '@/components/icon/Share/Share';
import Loading from '@/components/layout/Loading/Loading';

import useSearchStore from '@/store/useSearchStore';

import ArrowDropdownDown from '@/icon/ArrowDropdownDown/ArrowDropdownDown';
import BookmarkHollowIcon from '@/icon/BookmarkHollowIcon/BookmarkHollowIcon';

import DetailImage from './DetailImage';
import DetailSideBar from './DetailSideBar';
import styles from './Main.module.scss';

const Main = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { selectedTab, setSearchParams } = useSearchStore();
  const [propertyId, setPropertyId] = useState('');
  const [collapse, setCollapse] = useState(true);
  const textAreaRef = useRef(null);

  useEffect(() => {
    setPropertyId(searchParams.get('id'));
  }, [searchParams]);

  const textAreaHeight = useMemo(
    () => textAreaRef.current?.clientHeight,
    [textAreaRef.current]
  );

  const getDetailApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/${selectedTab === 'rent' ? 'for-rent' : 'for-sale'}/${propertyId}`
    );
    return response.data;
  };

  const { isSuccess, data: rentDetailData } = useQuery({
    queryKey: ['detail'],
    queryFn: getDetailApi,
    select: (response) => {
      const { property = {}, rentalOffersAndRules } = response;
      let modifyRules = [];

      const [landLordOffer, equipments, rules = {}] = rentalOffersAndRules;
      const { content = [] } = rules;

      const tempRules =
        content.length > 0
          ? filter((rule) => rule?.subtitle !== '租金內含', content)
          : [];

      const inclusions =
        content.length > 0 ? find(propEq('租金內含', 'subtitle'))(content) : '';

      if (tempRules.length > 0) {
        modifyRules = map((rule) => {
          if (rule?.subtitle === '可遷入日') {
            const date = dayjs(rule.description);

            if (date.get('year')) {
              rule.description =
                date.get('year') +
                '年' +
                (date.get('month') + 1) +
                '月' +
                date.get('date') +
                '日';
            }
          }

          return rule;
        })(tempRules);
      }

      return {
        ...response,
        landLordOffer,
        property,
        modifyRules,
        inclusions,
        equipments,
      };
    },
    enabled: !!propertyId,
  });

  if (!isSuccess)
    return (
      <div className={styles.loadingContainer}>
        <Loading text="資料讀取中" />
      </div>
    );

  const {
    property = {},
    landLordOffer = {},
    price = '',
    introduction = '',
    categoryStr = '',
    equipments,
    modifyRules,
    inclusions,
  } = rentDetailData;

  const {
    location = {},
    views,
    title,
    room,
    livingRoom,
    bathroom,
    balcony,
    squareMeters,
    floor,
    totalFloors,
    shape = {},
  } = property;

  const { city, district, geolocation } = location;

  return (
    <div className={styles.body}>
      <nav className={styles.toolbar}>
        <div className={styles.breadcrumbContainer}>
          <span
            className={styles.breadcrumb}
            onClick={() => {
              router.push('/');
            }}
          >
            首頁
          </span>
          &gt;
          <span
            className={styles.breadcrumb}
            onClick={() => router.push('/Search')}
          >
            {selectedTab === 'rent' ? '租房' : '買房'}
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
              router.push('/Search');
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
              router.push('/Search');
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
        <div className={styles.tool}>
          <div className={styles.browse}>
            <Tag
              text={`${views}人瀏覽`}
              icon={
                <Image
                  src="/housing/icon/eye.svg"
                  alt="eye"
                  width={20}
                  height={20}
                />
              }
              gap="4px"
              iconPosition="left"
            />
            |
            <Tag
              text="10小時內更新"
              icon={
                <Image
                  src="/housing/icon/time.svg"
                  alt="time"
                  width={20}
                  height={20}
                />
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
              icon={<BookmarkHollowIcon color="#333333" />}
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
          </div>
        </div>
      </nav>
      <DetailImage />
      <div className={styles.detail}>
        <article className={styles.detailContent}>
          <div className={styles.titleArea}>
            <span className={styles.title}>{title}</span>
            {/* // TODO: Tag區域後續補上 */}
            {/* 
              <div className={styles.tags}>
                <Tag
                  text="含車位"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#0936D8"
                  padding="4px 8px"
                />
                <Tag
                  text="有陽台"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#0936D8"
                  padding="4px 8px"
                />
                <Tag
                  text="低公設"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#0936D8"
                  padding="4px 8px"
                />
                <Tag
                  text="明星學區"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#0936D8"
                  padding="4px 8px"
                />
              </div> */}
            <div className={styles.propertyInfo}>
              <div className={styles.propertyInfoGroup}>
                <span className={styles.typeName}>類型</span>
                <span className={styles.type}>{categoryStr}</span>
              </div>
              <div className={styles.propertyInfoGroup}>
                <span className={styles.typeName}>格局</span>
                <span className={styles.type}>
                  {room} 房 / {livingRoom} 廳 / {bathroom} 衛 / {balcony} 陽台
                </span>
              </div>
              <div className={styles.propertyInfoGroup}>
                <span className={styles.typeName}>坪數</span>
                <span className={styles.type}>{squareMeters} 坪</span>
              </div>
              <div className={styles.propertyInfoGroup}>
                <span className={styles.typeName}>樓層</span>
                <span className={styles.type}>
                  {floor}F / {totalFloors}F
                </span>
              </div>
              <div className={styles.propertyInfoGroup}>
                <span className={styles.typeName}>型態</span>
                <span className={styles.type}>{shape.displayName}</span>
              </div>
            </div>
          </div>
          <div className={styles.area}>
            <span className={styles.title}>位置＆周邊</span>
            <span className={styles.address}>
              <p className={styles.colon}>地址：</p>
              {location?.address}
            </span>
            {geolocation?.coordinates.length > 0 && (
              <div className={styles.mapFill}>
                <Map coordinates={geolocation?.coordinates} />
              </div>
            )}
          </div>
          {selectedTab === 'rent' && (
            <div className={styles.area}>
              <span className={styles.title}>設備＆規則</span>
              <div className={styles.infoArea}>
                <span className={styles.infoType}>{landLordOffer.title}</span>
                {landLordOffer.content.map((offer, index) => {
                  return (
                    <div key={`offer_${index}`} className={styles.infoGroup}>
                      <p className={styles.colon}>{offer.subtitle}：</p>
                      <p className={styles.info}>{offer.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.infoArea}>
                <span className={styles.infoType}>房屋設備</span>
                {equipments?.content.map((item) => {
                  return (
                    <div className={styles.infoGroup} key={item?.subtitle}>
                      <p className={styles.colon}>{item?.subtitle}：</p>
                      <p className={styles.info}>{item?.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.infoArea}>
                <span className={styles.infoType}>租屋規則</span>
                <div className={styles.singleArea}>
                  {modifyRules.map((rule, index) => {
                    return (
                      <span className={styles.singleInfo} key={`rule_${index}`}>
                        <p className={styles.colon}>{rule.subtitle}：</p>
                        <p className={styles.info}>{rule.description}</p>
                      </span>
                    );
                  })}
                </div>
                <div className={styles.infoGroup}>
                  <p className={styles.colon}>{inclusions?.subtitle}：</p>
                  <p className={styles.info}>{inclusions?.description}</p>
                </div>
              </div>
            </div>
          )}
          {selectedTab === 'buy' && (
            <div className={styles.area}>
              <span className={styles.title}>物件介紹</span>
              <div className={styles.infoArea}>
                <span className={styles.infoType}>房屋資料</span>
                <div style={{ display: 'flex' }}>
                  <div className={styles.singleArea}>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>現況：</p>
                      <p className={styles.info}>自住中</p>
                    </span>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>裝潢程度：</p>
                      <p className={styles.info}>中檔裝潢</p>
                    </span>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>公設比：</p>
                      <p className={styles.info}>27%</p>
                    </span>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>法定用途：</p>
                      <p className={styles.info}>住家用</p>
                    </span>
                  </div>
                  <div className={styles.singleArea}>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>管理費：</p>
                      <p className={styles.info}>3799元/月</p>
                    </span>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>帶租約：</p>
                      <p className={styles.info}>否</p>
                    </span>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>車位：</p>
                      <p className={styles.info}>否</p>
                    </span>
                  </div>
                </div>
                <span className={styles.infoType}>坪數說明</span>
                <div style={{ display: 'flex' }}>
                  <div className={styles.singleArea}>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>建物登記：</p>
                      <p className={styles.info}>15.51坪</p>
                    </span>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>附屬建物：</p>
                      <p className={styles.info}>1.51坪</p>
                    </span>
                  </div>
                  <div className={styles.singleArea}>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>主建物：</p>
                      <p className={styles.info}>7.28坪</p>
                    </span>
                    <span className={styles.singleInfo}>
                      <p className={styles.colon}>公共設施：</p>
                      <p className={styles.info}>6.72坪</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={styles.area}>
            <span className={styles.title}>屋況介紹</span>
            <p
              className={styles.describe}
              data-collapse={textAreaHeight && collapse ? 'collapse' : ''}
              dangerouslySetInnerHTML={{ __html: introduction }}
              ref={textAreaRef}
            ></p>
            {textAreaHeight > 400 && (
              <div
                style={{ position: 'relative' }}
                onClick={() => {
                  setCollapse(!collapse);
                }}
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
                {collapse && <div className={styles.cover}></div>}
              </div>
            )}
          </div>
        </article>
        <DetailSideBar price={price} views={views} />
      </div>
    </div>
  );
};

export default Main;
