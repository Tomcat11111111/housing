'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';
import { slice } from 'ramda';

import useSearchStore from '@/store/useSearchStore';

import Breadcrumb from './Breadcrumb';
import DetailImage from './DetailImage';
import DetailSideBar from './DetailSideBar';
import FacilityRules from './FacilityRules';
import Introduction from './Introduction';
import LocationSection from './LocationSection';
import PropertyInfo from './PropertyInfo';
import PropertySummary from './PropertySummary';
import ToolBar from './ToolBar';

const Main = ({ type, detailData }) => {
  const router = useRouter();

  const { setSearchParams } = useSearchStore();
  const [isBookmarked, setIsBookmarked] = useState(false); //TODO:後續改API

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
    <>
      <nav className="flex justify-between items-cente">
        <Breadcrumb
          type={type}
          city={city}
          district={district}
          categoryStr={categoryStr}
          location={location}
          setSearchParams={setSearchParams}
          router={router}
        />
        <ToolBar
          views={views}
          isBookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
        />
      </nav>
      <div className="h-[400px] my-4">
        <DetailImage images={firstFiveImages} />
      </div>
      <div className="flex justify-between mx-4 gap-9">
        <article className="w-[60%] flex flex-col gap-4">
          <PropertyInfo
            title={title}
            categoryStr={categoryStr}
            room={room}
            livingRoom={livingRoom}
            bathroom={bathroom}
            balcony={balcony}
            squareMeters={squareMeters}
            floor={floor}
            totalFloors={totalFloors}
            shape={shape}
          />
          <LocationSection location={location} geolocation={geolocation} />
          {type === 'rent' && (
            <FacilityRules
              landLordOffer={landLordOffer}
              equipments={equipments}
              modifyRules={modifyRules}
              inclusions={inclusions}
            />
          )}
          {type === 'buy' && (
            <PropertySummary propertySummary={propertySummary} />
          )}
          {introduction && <Introduction introduction={introduction} />}
        </article>
        <DetailSideBar
          price={type === 'buy' ? totalPrice : price}
          unitPrice={unitPrice}
          views={views}
          type={type}
          id={property?.id}
        />
      </div>
    </>
  );
};

export default Main;
