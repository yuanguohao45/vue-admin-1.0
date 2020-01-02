import serve from "@/utils/request";
/**
 *  一级分类添加
 */
export function AddFirstCategory(data) {
  return serve.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}
/**
 *  获取分类
 */
export function getCategory(data) {
  return serve.request({
    method: "get",
    url: "/news/getCategory/",
    data
  });
}
/**
 *  删除分类
 */
export function deleteCategory(data) {
  return serve.request({
    method: "delete",
    url: "/news/deleteCategory/",
    data
  });
}
/**
 *  删除分类
 */
export function editCategory(data) {
  return serve.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}
/**
 *  新增信息
 */
export function addInfo(data) {
  return serve.request({
    method: "post",
    url: "/news/add/",
    data
  });
}
/**
 *  信息列表
 */
export function getInfoList(data) {
  return serve.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}
