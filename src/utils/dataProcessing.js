function processData(data) {
  //create maps to store yearly data and crop data
  const yearlyData = new Map();
  const cropData = new Map();

  // loop through each record in the data
  data.forEach(record => {
    // get information from the record
    const year = record.Year.split(', ')[1];
    const production = record['Crop Production (UOM:t(Tonnes))'] || 0;
    const yieldCrop = record['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0;
    const area = record['Area Under Cultivation (UOM:Ha(Hectares))'] || 0;
    const cropName = record['Crop Name'];

     // Check if the year already exists in the  map
    if (!yearlyData.has(year)) {
       // If it does not exist, initialize it with the current crop name for both max and min production
      yearlyData.set(year, { max: cropName, min: cropName });
    } else {
      // If it exists, update the max and min production crops for that year
      const current = yearlyData.get(year);
      if (production > (data.find(item => item['Crop Name'] === current.max)['Crop Production (UOM:t(Tonnes))'] || 0)) {
        current.max = cropName;
      }
      if (production < (data.find(item => item['Crop Name'] === current.min)['Crop Production (UOM:t(Tonnes))'] || 0)) {
        current.min = cropName;
      }
    }

    // Check if the crop name already exists in the  map
    if (!cropData.has(cropName)) {
       // If not, initialize it with the current yield and area, and set count to 1
      cropData.set(cropName, { yieldSum: yieldCrop, areaSum: area, count: 1 });
    } else {
     
      // if it does exist update sum for each and increment the count
      const current = cropData.get(cropName);
      current.yieldSum += yieldCrop;
      current.areaSum += area;
      current.count += 1;
    }
  });
      // Calculate average yield and area for each crop
  const cropAverages = Array.from(cropData.entries()).map(([crop, { yieldSum, areaSum, count }]) => ({
    crop,
    averageYield: +(yieldSum / count).toFixed(3),// Calculate and round to 3 decimal places
    averageArea: +(areaSum / count).toFixed(3),  // Calculate and round to 3 decimal places
  }));

   // Return the processed data
  return { yearlyData, cropAverages };
}

export { processData };
