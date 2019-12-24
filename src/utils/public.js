export default {
  install(Vue, options) {
    Vue.prototype.confirm = funciton() {
      root
      .$confirm("即将删除全部, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
        center: true
      })
      .then(() => {
        root.$message({ 
          type: "success",
          message: "删除成功!"
        });
      })
      .catch(() => {
        root.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    }
  }
}

// vue插件