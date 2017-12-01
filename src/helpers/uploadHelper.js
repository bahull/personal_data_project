import axios from "axios";

export const degreeDaysFinderUpload = (file, updateMonthlyDegreeDays) => {
  // console.log(file);
  // let copyOfFile = file;
  // let trashHolder = copyOfFile.splice(0, 1);
  // console.log("degreeDays in helper for history", trashHolder);

  // let startMonth = [];
  // startMonth = copyOfFile[0][0].split(/[/-]/g);

  // let month = parseInt(startMonth[0], 10);
  // let year = parseInt(startMonth[2].substr(2, 2), 10);
  // let total = copyOfFile.length;
  let month = file.month;
  let year = file.year;
  let total = file.total;

  updateMonthlyDegreeDays(month, year, total);
};

export const sendToNodeUpload = file => {
  axios.post("/api/retrieveSavedFile", {
    file
  });
};
