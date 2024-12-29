import { slice } from 'lodash';

import DetailImage from '@/app/detail/[type]/DetailImage';
import PropertyInfo from '@/app/detail/[type]/PropertyInfo';
import LocationSection from '@/app/detail/[type]/LocationSection';
import FacilityRules from '@/app/detail/[type]/FacilityRules';
import PropertySummary from '@/app/detail/[type]/PropertySummary';
import Introduction from '@/app/detail/[type]/Introduction';
import DetailSideBar from '@/app/detail/[type]/DetailSideBar';

import usePublishStore from '@/store/usePublishStore';

const DetailPreview = () => {
  const { property, itemTypeSettings } = usePublishStore();
  const type = itemTypeSettings.publishType;

  const firstFiveImages = slice(0, 5, property.images);

  return (
    <div className="bg-[#CCC] rounded-2xl p-2">
      <DetailImage images={firstFiveImages} />
      <div className="flex justify-between mx-4 gap-9">
        <article className="w-[60%] flex flex-col gap-4">
          <PropertyInfo
            title={property.title}
            categoryStr={property.categoryStr}
            room={property.room}
            livingRoom={property.livingRoom}
            bathroom={property.bathroom}
            balcony={property.balcony}
            squareMeters={property.squareMeters}
            floor={property.floor}
            totalFloors={property.totalFloors}
            shape={property.shape}
          />
          <LocationSection location={property.location} geolocation={property.geolocation} />
          {type === 'rent' && (
            <FacilityRules
              landLordOffer={property.landLordOffer}
              equipments={property.equipments}
              modifyRules={property.modifyRules}
              inclusions={property.inclusions}
            />
          )}
          {type === 'buy' && (
            <PropertySummary propertySummary={property.propertySummary} />
          )}
          {property.introduction && <Introduction introduction={property.introduction} />}
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

export default DetailPreview;
