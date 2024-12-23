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
