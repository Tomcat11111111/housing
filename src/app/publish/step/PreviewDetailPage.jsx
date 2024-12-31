import { useEffect, useState } from 'react';

import { slice } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import DetailImage from '@/app/detail/[type]/DetailImage';
import PropertyInfo from '@/app/detail/[type]/PropertyInfo';
import LocationSection from '@/app/detail/[type]/LocationSection';
import FacilityRules from '@/app/detail/[type]/FacilityRules';
import PropertySummary from '@/app/detail/[type]/PropertySummary';
import Introduction from '@/app/detail/[type]/Introduction';
import DetailSideBar from '@/app/detail/[type]/DetailSideBar';

import { getTextFromList, CurrentStatusOptions, ParkingOptions } from '../publishHelper';
import { getDecorLevelsApi, getEquipmentApi, getFurnitureApi, getMaterialsApi, getIncludedInRentApi, getRulesApi } from '../actions';
import usePublishStore from '@/store/usePublishStore';

const PreviewDetailPage = () => {
  const { property, itemTypeSettings, rentalInfo, salesInfo, location } = usePublishStore();
  
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const getCoordinates = async () => {
      if (!location.address) return;
      
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location.address
          )}&key=AIzaSyCudV7XzW3pXqAE-RljZ5JdGkOE8Dd-XQM`
        );
        const data = await response.json();
        
        if (data.results && data.results[0]) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
          // 如果需要，可以更新 store 中的 geolocation
          // updateGeolocation({ lat, lng });
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    getCoordinates();
  }, [location.address]);

    // 提供設備
    const { data: equipmentOptions } = useQuery({
      queryKey: ['getEquipmentApi'],
      queryFn: getEquipmentApi,
    });
    
    // 提供家具
    const { data: furnitureOptions } = useQuery({
      queryKey: ['getFurnitureApi'],
      queryFn: getFurnitureApi,
    });
  
    // 隔間材質
    const { data: materialsOptions } = useQuery({
      queryKey: ['getMaterialsApi'],
      queryFn: getMaterialsApi,
    });
  
        
    // 裝潢程度
    const { data: decorLevelsOptions } = useQuery({
      queryKey: ['getDecorLevelsApi'],
      queryFn: getDecorLevelsApi,
    });
  
    // 租金內含
    const { data: includedInRentOptions } = useQuery({
      queryKey: ['getIncludedInRentApi'],
      queryFn: getIncludedInRentApi,
    });
   
    // 租屋規則
    // const { data: rulesOptions } = useQuery({
    //   queryKey: ['getRulesApi'],
    //   queryFn: getRulesApi,
    // });

  const registeredArea = parseInt(salesInfo.mainBuildingArea) + parseInt(salesInfo.accessoryBuildingArea) + parseInt(salesInfo.publicFacilityArea)  ;
  const legalUsageDisplay = salesInfo.hiddenLegalUsage ? salesInfo.legalUsage.charAt(0) : salesInfo.legalUsage;
  const type = itemTypeSettings.publishType;
  const firstFiveImages = slice(property.images, 0, 5);
  const publicRatio = salesInfo.publicFacilityArea / registeredArea * 100;

  const propertySummary = [
    {
      title: "房屋資料",
      content: [
        {
          subtitle: "現況",
          description: getTextFromList(salesInfo.status, CurrentStatusOptions) || null
        },
        {
          subtitle: "裝潢狀況",
          description: getTextFromList(property.decorLevelId, decorLevelsOptions) || null
        },
        {
          subtitle: "公設比",
          description: publicRatio ? publicRatio + '%' : null
        },
        {
          subtitle: "法定用途",
          description: legalUsageDisplay || null
        },
        {
          subtitle: "管理費",
          description: salesInfo.managementFee ? `${salesInfo.managementFee}元/月` : null
        },
        {
          subtitle: "帶租約",
          description: property.hasLease ? "是" : "否"
        },
        {
          subtitle: "車位",
          description: property.hasParking ? "是" : "否"
        }
      ]
    },
    {
      title: "坪數說明",
      content: [
        {
          subtitle: "建物登記",
          description: registeredArea ? `${registeredArea}坪` : null
        },
        {
          subtitle: "附屬建物",
          description: salesInfo.accessoryBuildingArea ? `${salesInfo.accessoryBuildingArea}坪` : null
        },
        {
          subtitle: "主建物",
          description: salesInfo.mainBuildingArea ? `${salesInfo.mainBuildingArea}坪` : null
        },
        {
          subtitle: "公共設施",
          description: salesInfo.publicFacilityArea ? `${salesInfo.publicFacilityArea}坪` : null
        }
      ]
    }
  ];

  const formatIds = (ids, options = []) => {
    // 篩選出現在 options 中的 offerIds
    return ids
      .filter(id => options.some(option => option.id === id))
      .map(id => {
        const match = options.find(option => option.id === id);
        return match ? match.displayName : null;
      })
      .filter(name => name !== null) // 去掉可能的 null 值
      .join(' | ') || '';  
  };

  const formatGender = (ids) => {
    if(ids.includes(1)) return "不限性別";
    if(ids.includes(2)) return "限男";
    if(ids.includes(3)) return "限女";

    return "";
  }

  const formattedData = {
    landLordOffer: {
      title: "房東提供",
      content: [
        {
          subtitle: "設備",
          description: formatIds(rentalInfo.offerIds, equipmentOptions) || null
        },
        {
          subtitle: "傢俱",
          description: formatIds(rentalInfo.offerIds, furnitureOptions) || null
        }
      ]
    },
    equipments: {
      title: "房屋設備",
      content: [
        {
          subtitle: "隔間",
          description: rentalInfo.materialId ? getTextFromList(rentalInfo.materialId, materialsOptions) : null
        },
        {
          subtitle: "車位",
          description: getTextFromList(rentalInfo.parkingSpace, ParkingOptions) || null
        },
        {
          subtitle: "管理",
          description: rentalInfo?.managementFee ? `${rentalInfo.managementFee}元/月` : null
        }
      ]
    },
    modifyRules: [
      {
        subtitle: "可遷入日",
        description: rentalInfo?.moveInDate || null
      },
      {
        subtitle: "短期租賃",
        description: rentalInfo?.minRentPeriod <= 2 ? "可以" : "不可以"
      },
      {
        subtitle: "裝潢程度",
        description: property.decorLevelId ? getTextFromList(property.decorLevelId, decorLevelsOptions) : null
      },
      {
        subtitle: "押金",
        description: rentalInfo?.depositMonths ? `${rentalInfo.depositMonths}個月` : null
      },
      {
        subtitle: "電費",
        description: rentalInfo?.electricityFee ? `${rentalInfo.electricityFee}元/月` : null
      },
      {
        subtitle: "租期",
        description: rentalInfo?.minRentPeriod ? `${rentalInfo.minRentPeriod}個月` : null
      },
      {
        subtitle: "房東同住",
        description: rentalInfo?.ruleIds.includes(11) ? "是" : "否"
      },
      {
        subtitle: "開伙",
        description: rentalInfo?.ruleIds.includes(7) ? "可以" : "不可以"
      },
      {
        subtitle: "飼養寵物",
        description: rentalInfo?.ruleIds.includes(5) ? "可以" : "不可以"
      },
      {
        subtitle: "性別要求",
        description: formatGender(rentalInfo.ruleIds)
      }
    ],
    inclusions: {
      subtitle: "租金內含",
      description: rentalInfo?.includedInRentIds.length > 0 ? formatIds(rentalInfo.includedInRentIds, includedInRentOptions) : null
    }
  };
  console.log("🚀 ~ PreviewDetailPage ~ formattedData:", formattedData)

  return (
    <div className="bg-[#FFF] rounded-2xl p-2 h-[100%] overflow-hidden relative">
        <div className='h-[100%] z-10 w-full absolute top-0 left-0'></div>
      <div className="h-[400px] my-4">
        <DetailImage images={firstFiveImages} />
      </div>
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
          <LocationSection location={location} geolocation={{coordinates: [
            coordinates.lat,
            coordinates.lng
          ]}} />
          {type === 'rent' && (
            <FacilityRules
              landLordOffer={formattedData.landLordOffer}
              equipments={formattedData.equipments}
              modifyRules={formattedData.modifyRules}
              inclusions={formattedData.inclusions}
            />
          )}
          {type === 'buy' && (
            <PropertySummary propertySummary={propertySummary} />
          )}
          {salesInfo.introduction && <Introduction introduction={salesInfo.introduction} />}
          {rentalInfo.introduction && <Introduction introduction={rentalInfo.introduction} />}
        </article>
        <DetailSideBar
          price={type === 'buy' ? salesInfo?.totalPrice : rentalInfo?.price}
          unitPrice={salesInfo?.totalPrice / property.squareMeters}
          views={property?.views}
          type={type}
          id={property?.id}
        />
      </div>
    </div>
  );
};

export default PreviewDetailPage;
