export const addMonths = (months, newData, updateAnnualMonths) => {
  let firstMonth = (function(newData) {
    switch (newData) {
      case "1/":
        return 0;
      case "2/":
        return 1;
      case "3/":
        return 2;
      case "4/":
        return 3;
      case "5/":
        return 4;
      case "6/":
        return 5;
      case "7/":
        return 6;
      case "8/":
        return 7;
      case "9/":
        return 8;
      case "10":
        return 9;
      case "11":
        return 10;
      case "12":
        return 11;
      default:
        return 1;
    }
  })(newData[0][0].substr(0, 2));
  let k = 0;
  let newHolder = [];
  for (let i = firstMonth; k <= newData.length - 1; i++) {
    if (months[i] === undefined) {
      i = -1;
    } else {
      newHolder.push(months[i]);
      k++;
    }
  }
  updateAnnualMonths(newHolder);
};

export const monthlyCost = (newData, updateMonthlyCost) => {
  let holder = [];
  newData.map(curr => {
    return holder.push(parseFloat(curr[2].replace(",", "")));
  });
  updateMonthlyCost(holder);
};

export const degreeDaysUpdater = (hdd, degreeDays) => {
  if(hdd && degreeDays){
  hdd.map(curr => {
    return degreeDays.push(curr.hdd);
  });

  return degreeDays;
  } else {
    alert("There was an error loading your information. Please return to the dashboard and reload your information. If this problem persists, please contact your raze ambassador")
  }
};

export const getMonthlyKw = (newData, updateMonthlyKW, updateAnnualKW) => {
  let holder = [];

  newData.map(curr => {
    return holder.push(parseFloat(curr[1].replace(",", "")));
  });
  updateMonthlyKW(holder);
};

export const getAnnualKw = (newData, updateAnnualKW, monthlyKW) => {
  let holder = monthlyKW.slice();
  holder = holder.reduce((a, b) => a + b);
  updateAnnualKW(holder);
};
