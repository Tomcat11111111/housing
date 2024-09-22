'use client';

import { Suspense, useEffect, useRef, useState } from 'react';

import Button from '@common/Button/Button';
import CardCarouselBox from '@common/CardCarouselBox/CardCarouselBox';
import Input from '@components/common/Input/Input';
import Tag from '@components/common/Tag/Tag';
import Account from '@components/icon/Account/Account';
import ArrowDropdownUp from '@components/icon/ArrowDropdownUp/ArrowDropdownUp';
import Fire from '@components/icon/Fire/Fire';
import House from '@components/icon/House/House';
import Mail from '@components/icon/Mail/Mail';
import Person from '@components/icon/Person/Person';
import Phone from '@components/icon/Phone/Phone';
import PhoneInTalk from '@components/icon/PhoneInTalk/PhoneInTalk';
import Photo from '@components/icon/Photo/Photo';
import Share from '@components/icon/Share/Share';
import Arrow from '@icon/Arrow/Arrow';
import ArrowDropdownDown from '@icon/ArrowDropdownDown/ArrowDropdownDown';
import BookmarkHollowIcon from '@icon/BookmarkHollowIcon/BookmarkHollowIcon';
import Footer from '@layout/Footer/Footer';
import HeaderWithSearch from '@layout/HeaderWithSearch/HeaderWithSearch';
import { useQuery } from '@tanstack/react-query';
import { getPriceStatusInfo } from '@utils/tools';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

import styles from './Detail.module.scss';

const ORIGIN_OPTION_LIST = [
  { displayName: '租房子', id: 'rent', icon: House },
  { displayName: '買房子', id: 'buy', icon: House },
  { displayName: '新建案', id: 'new', icon: House },
];

export default function Detail() {
  const searchParams = useSearchParams();

  const [propertyId, setPropertyId] = useState('');
  const [cityId, setCityId] = useState({ id: 1, displayName: '台北市' });
  const [selectedTab, setSelectedTab] = useState('rent');
  const [contactSwitch, setContactSwitch] = useState('book');
  const [collapse, setCollapse] = useState(true);
  const [gender, setGender] = useState('male');

  const getDetailApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/${selectedTab === 'rent' ? 'for-rent' : 'for-sale'}/${propertyId}`
    );
    return response.data;
  };

  const { data: rentDetailData } = useQuery({
    queryKey: ['detail'],
    queryFn: getDetailApi,
    enabled: !!propertyId,
    initialData: { property: {} },
  });
  const {
    property,
    inclusions = [],
    material = {},
    offers = [],
    price,
  } = rentDetailData;
  console.log('🚀 ~ Detail ~ rentDetailData:', rentDetailData);
  console.log('🚀 ~ Detail ~ property:', property);
  const {
    location,
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

  useEffect(() => {
    setPropertyId(searchParams.get('id'));
  }, [searchParams]);
  const priceStatusInfo = getPriceStatusInfo(25000, 15000);

  const getRecommendationsApi = async () => {
    const response = await axios.get(
      'https://jzj-api.zeabur.app/properties/for-rent?limit=4&offset=0&sort=-views' // 先寫租的
    );
    return response.data;
  };

  const formatCardData = (reponse) => {
    const { data = [] } = reponse;
    const formatData = data.map((item) => ({
      ...item.property,
      price: item.price,
    }));

    return formatData;
  };

  const { data: recommendationsList } = useQuery({
    queryKey: ['getRecommendationsData'],
    queryFn: getRecommendationsApi,
    select: formatCardData,
    initialData: [],
  });

  const mapRef = useRef(null);

  const initMap = () => {
    const TWlocation = { lat: 25.033, lng: 121.5654 };

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 25.033, lng: 121.5654 },
      zoom: 10,
    });

    const markerTW = new google.maps.Marker({
      position: TWlocation,
      map: map,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && mapRef.current) {
      initMap();
    }
  });

  const describeText = `🏠地址：大安區通化街171巷XX號4樓
🏠建物型態：公寓 
🏠坪數：15
🏠格局：2房1廳1衛1陽台 
🏠租金：28000 
🏠電：5元/度
🏠租金含:水費及網路 
❌禁寵 
🍀有電磁爐流理台 
🍀獨立洗衣機
🍀陽台可曬 
🍀全室氣密窗 
🚇信義安和站 
❌🍀🚇🏠
--------------------------------------------------
🔥同心不動產專員邱先生 
🔥加LINE截圖詢問會比較快唷 
👉租屋專線:☎️0905258257 
👉LINE: @418hqlrk
---------------------------------------------------
🔥秒殺物件
✨釋出稀少
✨把握機會👍🔥專業把關✨挑選屋況✨住的安心👍💥成交時會酌收一次性服務費💥🔥天氣好壞都誠地為您服務🔥`;

  return (
    <Suspense>
      <div className={styles.header}>
        <HeaderWithSearch
          headerType="white"
          city={cityId}
          onCityChange={(value) => setCityId(value)}
          padding="0 172px"
          selectedTab={selectedTab}
          tabOptions={ORIGIN_OPTION_LIST}
          onChange={(value) => setSelectedTab(value)}
        />
      </div>
      <div className={styles.body}>
        <nav className={styles.toolbar}>
          <div className={styles.breadcrumbContainer}>
            <span className={styles.breadcrumb}>首頁</span>&gt;
            <span className={styles.breadcrumb}>租房</span>&gt;
            <span className={styles.breadcrumb}>台北市</span>&gt;
            <span className={styles.breadcrumb}>大安區</span>&gt;
            <span className={styles.breadcrumb}>整層住家</span>&gt;
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
                icon={<BookmarkHollowIcon />}
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
        <figure className={styles.imgArea}>
          <div style={{ position: 'relative', width: '50%', height: '400px' }}>
            <Image
              style={{
                borderRadius: '16px 0 0 16px',
              }}
              src="/housing/image/金智傑房屋網 image 7.png"
              alt={1}
              fill
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <div
                style={{ position: 'relative', width: '50%', height: '196px' }}
              >
                <Image
                  src="/housing/image/金智傑房屋網 image 8.png"
                  alt={1}
                  fill
                />
              </div>
              <div
                style={{ position: 'relative', width: '50%', height: '196px' }}
              >
                <Image
                  style={{
                    borderRadius: '0 16px 16px 0',
                  }}
                  src="/housing/image/金智傑房屋網 image 9.png"
                  alt={1}
                  fill
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{ position: 'relative', width: '50%', height: '196px' }}
              >
                <Image
                  src="/housing/image/金智傑房屋網 image 10.png"
                  alt={1}
                  fill
                />
              </div>
              <div
                style={{ position: 'relative', width: '50%', height: '196px' }}
              >
                <Image
                  style={{
                    borderRadius: '0 16px 16px 0',
                  }}
                  src="/housing/image/金智傑房屋網 image 11.png"
                  alt={1}
                  fill
                />
              </div>
            </div>
          </div>
          <div className={styles.imgCount}>
            <Button
              buttonText="53+"
              textStyle={{
                color: '#FFF',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
              }}
              buttonStyle={{
                borderRadius: '8px',
                opacity: 0.8,
                background: '#333',
                padding: '16px',
                gap: '8px',
              }}
              icon={<Photo />}
              iconPosition="left"
            />
          </div>
        </figure>
        <div className={styles.detail}>
          <article className={styles.detailContent}>
            <div className={styles.titleArea}>
              <span className={styles.title}>{title}</span>
              {/* Tag區域 看後續資料怎麼給
              <div className={styles.tags}>
                <Tag
                  text="含車位"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#FF8E26"
                  padding="4px 8px"
                />
                <Tag
                  text="有陽台"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#FF8E26"
                  padding="4px 8px"
                />
                <Tag
                  text="低公設"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#FF8E26"
                  padding="4px 8px"
                />
                <Tag
                  text="明星學區"
                  textStyle={{
                    color: '#FFFFFF',
                  }}
                  tagColor="#FF8E26"
                  padding="4px 8px"
                />
              </div> */}
              <div className={styles.propertyInfo}>
                <div className={styles.propertyInfoGroup}>
                  <span className={styles.typeName}>類型</span>
                  <span className={styles.type}>套房（待補上）</span>
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
              <div ref={mapRef} className={styles.mapFill} id="map"></div>
            </div>
            {selectedTab === 'rent' && (
              <div className={styles.area}>
                <span className={styles.title}>設備＆規則</span>
                <div className={styles.infoArea}>
                  <span className={styles.infoType}>房東提供</span>
                  <div className={styles.infoGroup}>
                    <p className={styles.colon}>設備：</p>
                    {offers.map((offer, index) => {
                      return (
                        <p key={`offer_${index}`} className={styles.info}>
                          {offer.displayName}
                        </p>
                      );
                    })}
                  </div>
                  <div className={styles.infoGroup}>
                    <p className={styles.colon}>傢俱：</p>
                    {/* {offers.map((offer, index) => {
                      return (
                        <p key={`offer_${index}`} className={styles.info}>
                          {offer.displayName}
                        </p>
                      );
                    })} */}
                  </div>
                </div>
                <div className={styles.infoArea}>
                  <span className={styles.infoType}>房屋設備</span>
                  <div className={styles.infoGroup}>
                    <p className={styles.colon}>隔間：</p>
                    <p className={styles.info}>{material.displayName}</p>
                  </div>
                  <div className={styles.infoGroup}>
                    <p className={styles.colon}>車位：</p>
                    <p className={styles.info}>機械式車位</p>
                  </div>
                  <div className={styles.infoGroup}>
                    <p className={styles.colon}>管理：</p>
                    <p className={styles.info}>管理員(警衛)</p>
                    <p className={styles.info}>$1200/月</p>
                  </div>
                </div>
                <div className={styles.infoArea}>
                  <span className={styles.infoType}>租屋規則</span>
                  <div style={{ display: 'flex' }}>
                    <div className={styles.singleArea}>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>可遷入日：</p>
                        <p className={styles.info}>2024年01月15日</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>短期租賃：</p>
                        <p className={styles.info}>不可以</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>裝潢程度：</p>
                        <p className={styles.info}>中檔裝潢</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>押金：</p>
                        <p className={styles.info}>兩個月租金</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>電費：</p>
                        <p className={styles.info}>5元/度</p>
                      </span>
                    </div>
                    <div className={styles.singleArea}>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>租期：</p>
                        <p className={styles.info}>1年</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>房東同住：</p>
                        <p className={styles.info}>否</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>開火：</p>
                        <p className={styles.info}>中檔裝潢</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>飼養寵物：</p>
                        <p className={styles.info}>兩個月租金</p>
                      </span>
                      <span className={styles.singleInfo}>
                        <p className={styles.colon}>性別要求：</p>
                        <p className={styles.info}>性別不限</p>
                      </span>
                    </div>
                  </div>
                  <div className={styles.infoGroup}>
                    <p className={styles.colon}>租金內含：</p>
                    {inclusions.map((include, index) => {
                      return (
                        <p key={`include_${index}`} className={styles.info}>
                          {include.displayName}
                        </p>
                      );
                    })}
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
                data-collapse={collapse ? 'collapse' : ''}
              >
                {describeText}
              </p>
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
            </div>
          </article>
          <div className={styles.detailSideBar}>
            {price && (
              <div className={styles.price}>
                {price && <span>{price.toLocaleString()}/月</span>}
                <Tag
                  text={priceStatusInfo?.text}
                  textStyle={{
                    color: '#F6F6F6',
                  }}
                  tagColor={priceStatusInfo?.color}
                  iconPosition="right"
                  icon={priceStatusInfo?.icon}
                  padding="8px 16px"
                  gap="4px"
                />
              </div>
            )}
            <div className={styles.contact}>
              <div className={styles.switchContainer}>
                <div
                  className={styles.switch}
                  onClick={() => {
                    setContactSwitch('book');
                  }}
                  data-selected={contactSwitch === 'book' ? 'selected' : ''}
                >
                  預約看房
                </div>
                <div
                  className={styles.switch}
                  onClick={() => {
                    setContactSwitch('phone');
                  }}
                  data-selected={contactSwitch === 'phone' ? 'selected' : ''}
                >
                  立即回電
                </div>
              </div>
              {contactSwitch === 'book' && (
                <div className={styles.book}>
                  <div className={styles.inputContainer}>
                    <div className={styles.genderButton}>
                      <Button
                        buttonText="先生"
                        buttonStyle={{
                          padding: '8px 16px',
                          background: gender === 'male' ? '#FF8E26' : '',
                        }}
                        textStyle={{
                          color: gender === 'male' ? '#FFF' : '#CCC',
                        }}
                        action={() => setGender('male')}
                      />
                      <Button
                        buttonText="小姐"
                        buttonStyle={{
                          padding: '8px 16px',
                          background: gender === 'female' ? '#FF8E26' : '',
                        }}
                        textStyle={{
                          color: gender === 'female' ? '#FFF' : '#CCC',
                        }}
                        action={() => setGender('female')}
                      />
                    </div>
                    <Input
                      placeholder="如何稱呼"
                      icon={<Person />}
                      iconPosition="left"
                      inputWidth="120px"
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Input
                      placeholder="聯絡電話"
                      icon={<Phone />}
                      iconPosition="left"
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Input
                      placeholder="聯絡信箱"
                      icon={<Mail />}
                      iconPosition="left"
                    />
                  </div>
                  <p className={styles.reminder}>
                    當您送出預約資訊即代表您同意<a>拓樸相關條例</a>
                    ，並允許賣家與您聯繫
                  </p>
                </div>
              )}
              {contactSwitch === 'phone' && (
                <div className={styles.phone}>
                  <Account size={80} />
                  <span>王小明 先生</span>
                </div>
              )}
              <Button
                buttonText={
                  contactSwitch === 'phone' ? '0937-059-940' : '立即預約'
                }
                buttonStyle={{
                  borderRadius: '8px',
                  background: '#FF8E26',
                  padding:
                    contactSwitch === 'book' ? '16px 128px' : '16px 84px',
                  gap: '8px',
                }}
                textStyle={{
                  color: '#FFF',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '24px',
                }}
                iconPosition={contactSwitch === 'phone' ? 'left' : ''}
                icon={<PhoneInTalk />}
              />
            </div>
            <div className={styles.view}>
              <Fire />
              <span>此物件十分搶手</span>
              312人瀏覽
            </div>
          </div>
        </div>
      </div>
      <div className={styles.recommendBox}>
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>熱門物件</span>
            <Button
              buttonText="瀏覽更多"
              buttonType="transparent"
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
          <CardCarouselBox cardItemList={recommendationsList} />
        </div>
        <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>
            <span>熱門物件</span>
            <Button
              buttonText="瀏覽更多"
              buttonType="transparent"
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
          <CardCarouselBox cardItemList={recommendationsList} />
        </div>
      </div>
      <Footer />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCudV7XzW3pXqAE-RljZ5JdGkOE8Dd-XQM&callback=initMap`}
        strategy="beforeInteractive"
      />
    </Suspense>
  );
}
