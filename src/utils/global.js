import { MessageBox } from "element-ui";
import { ref } from "@vue/composition-api";
export function global() {
  const str = ref("");
  const confirm = ({ content, tip, type, fnc, catchFnc, data }) => {
    // 不用 => 可以避免操作内this指向问题
    MessageBox.confirm(content, tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: type || "success",
      center: true
    })
      .then(() => {
        fnc && fnc(data.id);
      })
      .catch(() => {
        catchFnc && catchFnc();
      });
  };
  return {
    str,
    confirm
  };
}
// vue插件
