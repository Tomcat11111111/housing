const checkStepData = (step, data) => {
  const { itemTypeSettings, infoSettings, advancedInfoSettings } = data;

  if (step === 0) {
    return (
      !!itemTypeSettings.publishType &&
      !!itemTypeSettings.itemType &&
      !!itemTypeSettings.category
    );
  }

  if (step === 1) {
    return (
      infoSettings.title &&
      infoSettings.cityId &&
      infoSettings.districtId &&
      infoSettings.address
    );
  }

  if (step === 2) {
    return true;
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
//   salesInfo: {
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
