import moment from "moment";

export function timeTounix() {
  const datetounixMethods = (row, column) => {
    let date = row[column.property];
    if (date == undefined) {
      return "";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  };
  return {
    datetounixMethods
  };
}
