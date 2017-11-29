import axios from "axios";

export const degreeDaysFinder = (file, updateMonthlyDegreeDays) => {
  let copyOfFile = file;
  // let trashHolder = copyOfFile.splice(0, 1);
  // console.log("degreeDays in helper for history", trashHolder);

  let startMonth = [];
  startMonth = copyOfFile[0][0].split(/[/-]/g);

  let month = parseInt(startMonth[0], 10);
  let year = parseInt(startMonth[2].substr(2, 2), 10);
  let total = copyOfFile.length;

  updateMonthlyDegreeDays(month, 15, total);
};

export const sendToNode = file => {
  axios.post("/api/retrieveSavedFile", {
    file
  });
};
