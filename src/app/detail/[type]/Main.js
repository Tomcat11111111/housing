'use client';

import { useMemo, useRef, useState } from 'react';

import { BookmarkIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { slice } from 'ramda';

import Button from '@/common/Button/Button';
import Map from '@/common/Map/Map';

import Tag from '@/components/common/Tag/Tag';
import ArrowDropdownUp from '@/components/icon/ArrowDropdownUp/ArrowDropdownUp';
import Share from '@/components/icon/Share/Share';

import useSearchStore from '@/store/useSearchStore';

import ArrowDropdownDown from '@/icon/ArrowDropdownDown/ArrowDropdownDown';

import DetailImage from './DetailImage';
import DetailSideBar from './DetailSideBar';
import styles from './Main.module.scss';

const Main = ({ type, detailData }) => {
  const router = useRouter();

  const { setSearchParams } = useSearchStore();
  const [collapse, setCollapse] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false); //TODO:後續改API

  const textAreaRef = useRef(null);
  const textAreaHeight = useMemo(
    () => textAreaRef.current?.clientHeight,
    [textAreaRef.current]
  );

  const {
    property = {},
    landLordOffer = {},
    price = null,
    totalPrice = null,
    unitPrice = null,
    introduction = '',
    categoryStr = '',
    equipments,
    modifyRules,
    inclusions,
    propertySummary = [],
  } = detailData;

  const displayPrice = useMemo(() => {
    // TODO: 需要用useMemo嗎？
    if (type === 'buy') {
      return totalPrice;
    }
    return price;
  }, [price, totalPrice, type]);

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
    images = [],
  } = property;

  const firstFiveImages = slice(0, 5, images);

  const { city, district, geolocation } = location;

  return (
    <div className={styles.body}>
      <nav className={styles.toolbar}>
        <div className={styles.breadcrumbContainer}>
          <span className={styles.breadcrumb} onClick={() => router.push('/')}>
            首頁
          </span>
          &gt;
          <span
            className={styles.breadcrumb}
            onClick={() => router.push('/Search')}
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
                <Image src="/icon/eye.svg" alt="eye" width={20} height={20} />
              }
              gap="4px"
              iconPosition="left"
            />
            |
            <Tag
              text="10小時內更新"
              icon={
                <Image src="/icon/time.svg" alt="time" width={20} height={20} />
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
              icon={
                isBookmarked ? (
                  <BookmarkIcon fill="#333333" color="#333333" />
                ) : (
                  <BookmarkIcon color="#333333" />
                )
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
              action={() => setIsBookmarked(!isBookmarked)}
            />
          </div>
        </div>
      </nav>
      <DetailImage images={firstFiveImages} />
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
          {type === 'rent' && (
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
          {type === 'buy' && (
            <div className={styles.area}>
              <span className={styles.title}>物件介紹</span>
              <div className={styles.infoArea}>
                {propertySummary.map((info) => (
                  <>
                    <span className={styles.infoType}>{info.title}</span>
                    <div className={styles.singleArea}>
                      {info.content.map((item, index) => {
                        return (
                          <span
                            className={styles.singleInfo}
                            key={`info_${index}`}
                          >
                            <p className={styles.colon}>{item.subtitle}：</p>
                            <p className={styles.info}>{item.description}</p>
                          </span>
                        );
                      })}
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
          {introduction && (
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
          )}
        </article>
        <DetailSideBar
          price={displayPrice}
          unitPrice={unitPrice}
          views={views}
          type={type}
          id={property?.id}
        />
      </div>
    </div>
  );
};

export default Main;
