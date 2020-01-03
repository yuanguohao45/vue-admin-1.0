import moment from "moment";

export function datetounixMethods(row, column) {
  let date = Number(row[column.property]);
  if (date == undefined) {
    return "";
  }
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}
