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
 *  一级分类添加
 */
export function AddChildrenCategory(data) {
  return serve.request({
    method: "post",
    url: "/news/addChildrenCategory/",
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
 *  获取分类(有子分类)
 */
export function getCategoryAll(data) {
  return serve.request({
    method: "get",
    url: "/news/getCategoryAll/",
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
 *  编辑分类
 */
export function editCategory(data) {
  return serve.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}
/**
 *  编辑子类
 */
export function editChildrenCategory(data) {
  return serve.request({
    method: "post",
    url: "/news/editChildrenCategory/",
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
 *  编辑信息
 */
export function editInfo(data) {
  return serve.request({
    method: "post",
    url: "/news/editInfo/",
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
/**
 *  删除信息
 */
export function delInfo(data) {
  return serve.request({
    method: "delete",
    url: "/news/deleteInfo/",
    data
  });
}
