import { slice } from 'lodash';

import DetailImage from '@/app/detail/[type]/DetailImage';

import usePublishStore from '@/store/usePublishStore';

const DetailPreview = () => {
  const { property } = usePublishStore();

  const firstFiveImages = slice(0, 5, property.images);

  return (
    <div className="bg-[#CCC] rounded-2xl p-2">
      <DetailImage images={firstFiveImages} />
    </div>
  );
};

export default DetailPreview;
