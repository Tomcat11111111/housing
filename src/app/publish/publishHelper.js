const checkStepData = (step, data) => {
  switch (step) {
    case 0:
      return data.title && data.description && data.price;
    case 1:
      return data.city && data.district && data.address;
    case 2:
      return data.features && data.shapes && data.decorLevel;
    case 3:
      return true;
    default:
      return false;
  }
};

// const MockSaleData = {
//   property: {
//     title: '中正區臨沂街巷內溫馨小宅（含坡平車位)',
//     age: 8,
//     squareMeters: 52,
//     floor: 1,
//     totalFloors: 17,
//     room: 0,
//     livingRoom: 0,
//     bathroom: 0,
//     balcony: 0,
//     views: 0,
//     shapeId: 2,
//     decorLevelId: 4,
//     images: [
//       'https://jzj-storage.zeabur.app/uploads/67bab49a-f821-4a14-a5ac-29319675354f',
//     ],
//     status: 'draft',
//   },
//   saleInfo: {
//     category: 'residential',
//     totalPrice: 88888888,
//     unitPrice: 1720100,
//     direction: 'southwest_to_northeast',
//     source: 'platform',
//     parkingSpace: 'planar',
//     ownership: 42,
//     surroundingIds: [],
//   },
//   location: {
//     cityId: 1,
//     districtId: 1,
//     address: '台北市中正區臨沂街',
//   },
// };

// const MockRentData = {
//   property: {
//     title: '忠孝國小學區旁近華山',
//     age: 25,
//     squareMeters: 5,
//     floor: 5,
//     totalFloors: 8,
//     room: 1,
//     livingRoom: 1,
//     bathroom: 1,
//     balcony: 1,
//     type: 'rental',
//     views: 120,
//     shapeId: 2,
//     decorLevelId: 1,
//   },
//   rentalInfo: {
//     category: 'private_study',
//     price: 87000,
//     type: 'room_to_share',
//     featureIds: [1],
//     includedInRentIds: [3],
//     offerIds: [4],
//     ruleIds: [3, 4],
//     materialId: 1,
//     introduction: '<p>測試介紹</p>',
//   },
//   location: {
//     cityId: 1,
//     districtId: 1,
//     address: '台北市中正區臨沂街',
//   },
// };

export const formatPropertyData = (data) => {
  const { itemTypeSettings, infoSettings, advancedInfoSettings } = data;
  console.log('🚀 ~ formatPropertyData ~ itemTypeSettings:', itemTypeSettings);

  return {
    property: {
      title: infoSettings.title,
      age: infoSettings.age,
      squareMeters: infoSettings.squareMeters,
      floor: infoSettings.floor,
      totalFloors: infoSettings.totalFloors,
      room: infoSettings.room,
      livingRoom: infoSettings.livingRoom,
      bathroom: infoSettings.bathroom,
      balcony: infoSettings.balcony,
      views: 0,
      shapeId: advancedInfoSettings.shapeId,
      decorLevelId: advancedInfoSettings.decorLevelId,
      status: 'draft',
    },
    [itemTypeSettings.publishType === 'buy' ? 'saleInfo' : 'rentalInfo']: {
      ...infoSettings,
      ...advancedInfoSettings,
    },
    location: {
      cityId: infoSettings.cityId,
      districtId: infoSettings.districtId,
      address: infoSettings.address,
    },
  };
};
