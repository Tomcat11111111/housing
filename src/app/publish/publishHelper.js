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
  const { property, saleInfo, location } = data;

  return {
    property: {
      title: property.title,
      age: property.age,
      squareMeters: property.squareMeters,
      floor: property.floor,
      totalFloors: property.totalFloors,
      room: property.room,
      livingRoom: property.livingRoom,
      bathroom: property.bathroom,
      balcony: property.balcony,
      type: property.type,
      views: property.views || 0,
      shapeId: property.shapeId,
      decorLevelId: property.decorLevelId,
      contactName: property.contactName || '',
      contactNumber: property.contactNumber || '',
      contactEmail: property.contactEmail || '',
      landline: property.landline || '',
      hasElevator: property.hasElevator || false,
      hasParking: property.hasParking || false,
      images: property.images || [],
      status: property.status || 'draft',
    },
    saleInfo: {
      totalPrice: saleInfo.totalPrice,
      parkingSpace: saleInfo.parkingSpace,
      direction: saleInfo.direction,
      source: saleInfo.source || 'platform',
      surroundingIds: saleInfo.surroundingIds || [],
      category: saleInfo.category,
      status: saleInfo.status,
      publicFacilityRatio: saleInfo.publicFacilityRatio || 0,
      legalUsage: saleInfo.legalUsage || '',
      hiddenLegalUsage: saleInfo.hiddenLegalUsage || false,
      managementFee: saleInfo.managementFee || 0,
      leaseStatus: saleInfo.leaseStatus || '',
      mainBuildingArea: saleInfo.mainBuildingArea || 0,
      accessoryBuildingArea: saleInfo.accessoryBuildingArea || 0,
      publicFacilityArea: saleInfo.publicFacilityArea || 0,
      introduction: saleInfo.introduction || '',
    },
    location: {
      cityId: location.cityId,
      districtId: location.districtId,
      address: location.address,
      street: location.street || '',
      alley: location.alley || '',
      lane: location.lane || '',
      number: location.number || '',
      floor: location.floor || '',
      room: location.room || '',
    },
  };
};
