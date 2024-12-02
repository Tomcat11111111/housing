import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/common/Button/Button';
import CardCarouselBox from '@/common/CardCarouselBox/CardCarouselBox';

import SmallArrow from '@/icon/SmallArrow/SmallArrow';

import styles from './RecommendList.module.scss';

const RecommendList = (props) => {
  const { type, queryKey } = props;

  const router = useRouter();

  const getRecommendationsApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/${type === 'rent' ? 'for-rent' : 'for-sale'}?limit=5&offset=0&sort=-views`
    );
    return response.data;
  };

  const formatCardData = (response) => {
    const { data = [] } = response;
    const formatData = data.map((item) => {
      return {
        ...item.property,
        price: item.price,
        totalPrice: item.totalPrice,
        unitPrice: item.unitPrice,
      };
    });

    return formatData;
  };

  const tempMockData = [
    {
      title: '加州風格獨棟別墅',
      url: '/image/金智傑房屋網 image 0.png',
      price: 85000,
    },
    {
      title: '溫馨北歐風小公寓',
      url: '/image/金智傑房屋網 image 1.png',
      price: 50000,
    },
    {
      title: '近明星學區套房',
      url: '/image/金智傑房屋網 image 2.png',
      price: 9000,
    },
    {
      title: '市中心豪華樓中樓',
      url: '/image/金智傑房屋網 image 3.png',
      price: 25000,
    },
    {
      title: '豪華信義公寓式管理',
      url: '/image/金智傑房屋網 image 4.png',
      price: 12000,
    },
  ];

  const tempFormatCardData = (response) => {
    const { data = [] } = response;
    const formatData = data.map((item, index) => {
      return {
        ...item.property,
        price: tempMockData[index].price,
        title: tempMockData[index].title,
        images: [{ url: tempMockData[index].url }],
      };
    });

    return formatData;
  };

  const { isSuccess: isRecommendSuccess, data: recommendationsList } = useQuery(
    {
      queryKey: [`getRecommendationsData_${queryKey}`],
      queryFn: getRecommendationsApi,
      select: type === 'rent' ? tempFormatCardData : formatCardData,
    }
  );

  return isRecommendSuccess ? (
    <div className={styles.recommendArea}>
      <div className={styles.recommendTitle}>
        <span>熱門{type === 'rent' ? '出租' : '出售'}物件</span>
        <Button
          buttonText="瀏覽更多"
          buttonType="transparent"
          iconPosition="right"
          icon={<SmallArrow />}
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
          action={() => router.push('/Search')}
        />
      </div>
      <CardCarouselBox cardItemList={recommendationsList} type={type} />
    </div>
  ) : null;
};

export default RecommendList;
