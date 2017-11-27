export const changedArray = function(newData, newArray) {
  let holder = newData.splice(0, 1);
  return newData.map(function(current) {
    return newArray.push(parseFloat(current[1].replace(",", "")));
  });
};

export const commercialPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);

  let otherUses = Math.floor(newArray * 0.36);
  let appliances = Math.floor(newArray * 0.16);
  let hvac = Math.floor(newArray * 0.26);
  let lighting = Math.floor(newArray * 0.2);
  let waterHeating = Math.floor(newArray * 0.02);
  typeHolder.push(appliances, hvac, lighting, waterHeating, otherUses);
};

export const industryPetroleumPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);

  let processHeating = Math.floor(newArray * 0.48);
  let drivePower = Math.floor(newArray * 0.21);
  let chp = Math.floor(newArray * 0.14);
  let boilerUse = Math.floor(newArray * 0.11);
  let other = Math.floor(newArray * 0.04);
  let hvac = Math.floor(newArray * 0.02);
  typeHolder.push(processHeating, drivePower, chp, boilerUse, other, hvac);
};
export const industryChemicalPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);

  let processHeating = Math.floor(newArray * 0.19);
  let drivePower = Math.floor(newArray * 0.2);
  let chp = Math.floor(newArray * 0.24);
  let boileruse = Math.floor(newArray * 0.22);
  let other = Math.floor(newArray * 0.11);
  let hvac = Math.floor(newArray * 0.03);
  typeHolder.push(processHeating, drivePower, chp, boileruse, other, hvac);
};

export const industryPaperPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);

  let processHeating = Math.floor(newArray * 0.15);
  let drivePower = Math.floor(newArray * 0.29);
  let chp = Math.floor(newArray * 0.34);
  let boileruse = Math.floor(newArray * 0.14);
  let other = Math.floor(newArray * 0.05);
  let hvac = Math.floor(newArray * 0.03);
  typeHolder.push(processHeating, drivePower, chp, boileruse, other, hvac);
};

export const industryMetalsPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);

  let processHeating = Math.floor(newArray * 0.56);
  let drivePower = Math.floor(newArray * 0.14);
  let chp = Math.floor(newArray * 0.03);
  let boileruse = Math.floor(newArray * 0.03);
  let other = Math.floor(newArray * 0.06);
  let hvac = Math.floor(newArray * 0.05);
  let electroChem = Math.floor(newArray * 0.13);
  typeHolder.push(
    processHeating,
    drivePower,
    chp,
    boileruse,
    other,
    hvac,
    electroChem
  );
};

export const industryFoodPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);

  let processHeating = Math.floor(newArray * 0.22);
  let drivePower = Math.floor(newArray * 0.13);
  let chp = Math.floor(newArray * 0.13);
  let boileruse = Math.floor(newArray * 0.36);
  let other = Math.floor(newArray * 0.04);
  let hvac = Math.floor(newArray * 0.05);
  let cooling = Math.floor(newArray * 0.07);
  typeHolder.push(
    processHeating,
    drivePower,
    chp,
    boileruse,
    other,
    hvac,
    cooling
  );
};

export const totalAnnualCostCommercial = (
  newData,
  totalCost,
  updateAnnualCost,
  updateAnnualBreakdown
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);

  updateAnnualCost(totalCost);
  let newArray = [];
  let otherUses = Math.floor(totalCost * 0.36);
  let appliances = Math.floor(totalCost * 0.16);
  let hvac = Math.floor(totalCost * 0.26);
  let lighting = Math.floor(totalCost * 0.2);
  let waterHeating = Math.floor(totalCost * 0.02);
  newArray.push(appliances, hvac, lighting, waterHeating, otherUses);
  updateAnnualBreakdown(newArray);
};

export const totalAnnualCostPetroleum = (
  newData,
  totalCost,
  updateAnnualCost,
  updateAnnualBreakdown
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);

  updateAnnualCost(totalCost);
  let newArray = [];
  let processHeating = Math.floor(totalCost * 0.48);
  let drivePower = Math.floor(totalCost * 0.21);
  let chp = Math.floor(totalCost * 0.14);
  let boilerUse = Math.floor(totalCost * 0.11);
  let other = Math.floor(totalCost * 0.04);
  let hvac = Math.floor(totalCost * 0.02);
  newArray.push(processHeating, drivePower, chp, boilerUse, other, hvac);
  updateAnnualBreakdown(newArray);
};

export const totalAnnualCostChemical = (
  newData,
  totalCost,
  updateAnnualCost,
  updateAnnualBreakdown
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);

  updateAnnualCost(totalCost);
  let newArray = [];
  let processHeating = Math.floor(totalCost * 0.19);
  let drivePower = Math.floor(totalCost * 0.2);
  let chp = Math.floor(totalCost * 0.24);
  let boileruse = Math.floor(totalCost * 0.22);
  let other = Math.floor(totalCost * 0.11);
  let hvac = Math.floor(totalCost * 0.03);
  newArray.push(processHeating, drivePower, chp, boileruse, other, hvac);
  updateAnnualBreakdown(newArray);
};

export const totalAnnualCostPaper = (
  newData,
  totalCost,
  updateAnnualCost,
  updateAnnualBreakdown
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);

  updateAnnualCost(totalCost);
  let newArray = [];
  let processHeating = Math.floor(totalCost * 0.15);
  let drivePower = Math.floor(totalCost * 0.29);
  let chp = Math.floor(totalCost * 0.34);
  let boileruse = Math.floor(totalCost * 0.14);
  let other = Math.floor(totalCost * 0.05);
  let hvac = Math.floor(totalCost * 0.03);
  newArray.push(processHeating, drivePower, chp, boileruse, other, hvac);
  updateAnnualBreakdown(newArray);
};

export const totalAnnualCostFood = (
  newData,
  totalCost,
  updateAnnualCost,
  updateAnnualBreakdown
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);

  updateAnnualCost(totalCost);
  let newArray = [];
  let processHeating = Math.floor(totalCost * 0.22);
  let drivePower = Math.floor(totalCost * 0.13);
  let chp = Math.floor(totalCost * 0.13);
  let boileruse = Math.floor(totalCost * 0.36);
  let other = Math.floor(totalCost * 0.04);
  let hvac = Math.floor(totalCost * 0.05);
  let cooling = Math.floor(totalCost * 0.07);
  newArray.push(
    processHeating,
    drivePower,
    chp,
    boileruse,
    other,
    hvac,
    cooling
  );
  updateAnnualBreakdown(newArray);
};

export const totalAnnualCostMetals = (
  newData,
  totalCost,
  updateAnnualCost,
  updateAnnualBreakdown
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);

  updateAnnualCost(totalCost);
  let newArray = [];
  let processHeating = Math.floor(totalCost * 0.56);
  let drivePower = Math.floor(totalCost * 0.14);
  let chp = Math.floor(totalCost * 0.03);
  let boileruse = Math.floor(totalCost * 0.03);
  let other = Math.floor(totalCost * 0.06);
  let hvac = Math.floor(totalCost * 0.05);
  let electroChem = Math.floor(totalCost * 0.13);
  newArray.push(
    processHeating,
    drivePower,
    chp,
    boileruse,
    other,
    hvac,
    electroChem
  );
  updateAnnualBreakdown(newArray);
};

// export const fileSaver = () => {
//   axios.get("/api/get").then(response => {
//     if (!response.data.newFile) {
//     } else {
//       let newArray = [];
//       let newData = response.data.newFile;
//       changedArray(newData, newArray);
//       let newState = Object.assign({}, this.state);
//       newState.chartData.datasets[0].data = newArray;
//       this.setState(newState);
//     }
//   });
// };
