import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Button from '@/common/Button/Button';
import CardCarouselBox from '@/common/CardCarouselBox/CardCarouselBox';

import SmallArrow from '@/icon/SmallArrow/SmallArrow';

import styles from './RecommendList.module.scss';

const RecommendList = (props) => {
  const { type, queryKey } = props;

  const getRecommendationsApi = async () => {
    const response = await axios.get(
      `https://jzj-api.zeabur.app/properties/${type === 'rent' ? 'for-rent' : 'for-sale'}?limit=4&offset=0&sort=-views`
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

  const { isSuccess: isRecommendSuccess, data: recommendationsList } = useQuery(
    {
      queryKey: [`getRecommendationsData_${queryKey}`],
      queryFn: getRecommendationsApi,
      select: formatCardData,
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
          action={() => router.push('/recommend')}
        />
      </div>
      <CardCarouselBox cardItemList={recommendationsList} type={type} />
    </div>
  ) : null;
};

export default RecommendList;
