import service from "@/utils/request";
/**
 * 获取用户
 */
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
  });
}
/**
 * 获取角色
 */
/**
 * 登录
 */
/**
 * 注册
 */
