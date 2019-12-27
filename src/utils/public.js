import { MessageBox } from "element-ui";

export default {
  install(Vue, options) {
    Vue.prototype.confirm = function({ content, tip, type, fnc }) {
      // 不用 => 可以避免操作内this指向问题
      MessageBox.confirm(content, tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type || "success",
        center: true
      })
        .then(() => {
          fnc && fnc();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    };
  }
};

// vue插件
