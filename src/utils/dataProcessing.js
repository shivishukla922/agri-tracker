function processData(data) {
  const yearlyData = new Map();
  const cropData = new Map();

  data.forEach(record => {
    const year = record.Year.split(', ')[1];
    const production = record['Crop Production (UOM:t(Tonnes))'] || 0;
    const yieldCrop = record['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0;
    const area = record['Area Under Cultivation (UOM:Ha(Hectares))'] || 0;
    const cropName = record['Crop Name'];

    
    if (!yearlyData.has(year)) {
      yearlyData.set(year, { max: cropName, min: cropName });
    } else {
      const current = yearlyData.get(year);
      if (production > (data.find(item => item['Crop Name'] === current.max)['Crop Production (UOM:t(Tonnes))'] || 0)) {
        current.max = cropName;
      }
      if (production < (data.find(item => item['Crop Name'] === current.min)['Crop Production (UOM:t(Tonnes))'] || 0)) {
        current.min = cropName;
      }
    }

    
    if (!cropData.has(cropName)) {
      cropData.set(cropName, { yieldSum: yieldCrop, areaSum: area, count: 1 });
    } else {
      const current = cropData.get(cropName);
      current.yieldSum += yieldCrop;
      current.areaSum += area;
      current.count += 1;
    }
  });

  const cropAverages = Array.from(cropData.entries()).map(([crop, { yieldSum, areaSum, count }]) => ({
    crop,
    averageYield: +(yieldSum / count).toFixed(3),
    averageArea: +(areaSum / count).toFixed(3),
  }));

  return { yearlyData, cropAverages };
}

export { processData };
