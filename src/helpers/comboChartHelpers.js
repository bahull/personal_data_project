export const addMonths = (months, newData, updateAnnualMonths) => {
  let firstMonth = (function(newData) {
    switch (newData) {
      case "1/":
        return 0;
        break;
      case "2/":
        return 1;
        break;
      case "3/":
        return 2;
        break;
      case "4/":
        return 3;
        break;
      case "5/":
        return 4;
        break;
      case "6/":
        return 5;
        break;
      case "7/":
        return 6;
        break;
      case "8/":
        return 7;
        break;
      case "9/":
        return 8;
        break;
      case "10":
        return 9;
        break;
      case "11":
        return 10;
        break;
      case "12":
        return 11;
        break;
      default:
        return 1;
    }
  })(newData[0][0].substr(0, 2));
  let k = 0;
  let newHolder = [];
  console.log(firstMonth);
  console.log(newData.length);
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
  console.log(holder);
  updateMonthlyCost(holder);
};
