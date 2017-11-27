import axios from "axios";

export const changedArray = function(newData, newArray) {
  console.log(newData, newArray);
  let holder = newData.splice(0, 1);
  return newData.map(function(current) {
    return newArray.push(parseFloat(current[1].replace(",", "")));
  });
};

export const commercialPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);
  console.log("newArray: ", newArray);
  let otherUses = Math.floor(newArray * 0.36);
  let appliances = Math.floor(newArray * 0.16);
  let hvac = Math.floor(newArray * 0.26);
  let lighting = Math.floor(newArray * 0.2);
  let waterHeating = Math.floor(newArray * 0.02);
  typeHolder.push(appliances, hvac, lighting, waterHeating, otherUses);
};

export const industryPetroleumPercentage = (newArray, typeHolder) => {
  newArray = newArray.reduce((a, b) => a + b);
  console.log("newArray: ", newArray);
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
  console.log("newArray: ", newArray);
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
  console.log("newArray: ", newArray);
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
  console.log("newArray: ", newArray);
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
  console.log("newArray: ", newArray);
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
  updateAnnualBreakdownCommercial
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);
  console.log("total: ", totalCost);
  updateAnnualCost(totalCost);
  let newArray = [];
  let otherUses = Math.floor(totalCost * 0.36);
  let appliances = Math.floor(totalCost * 0.16);
  let hvac = Math.floor(totalCost * 0.26);
  let lighting = Math.floor(totalCost * 0.2);
  let waterHeating = Math.floor(totalCost * 0.02);
  newArray.push(appliances, hvac, lighting, waterHeating, otherUses);
  updateAnnualBreakdownCommercial(newArray);
};
export const totalAnnualCostPetroleum = (
  newData,
  totalCost,
  updateAnnualCost,
  updateAnnualBreakdownCommercial
) => {
  let holder = newData.splice(0, 1);
  newData.map(current => {
    return totalCost.push(parseFloat(current[2].replace(",", "")));
  });

  totalCost = totalCost.reduce((curr, accu) => curr + accu);
  console.log("total: ", totalCost);
  updateAnnualCost(totalCost);
  let newArray = [];
  let processHeating = Math.floor(newArray * 0.48);
  let drivePower = Math.floor(newArray * 0.21);
  let chp = Math.floor(newArray * 0.14);
  let boilerUse = Math.floor(newArray * 0.11);
  let other = Math.floor(newArray * 0.04);
  let hvac = Math.floor(newArray * 0.02);
  newArray.push(processHeating, drivePower, chp, boilerUse, other, hvac);
  updateAnnualBreakdownCommercial(newArray);
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
