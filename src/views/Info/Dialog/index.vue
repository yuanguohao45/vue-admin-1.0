<template>
  <el-dialog class="info-dialog" title="收货地址" width="580px" :visible.sync="dialogFormVisible" @close="handleDialogCancel('form')">
    <el-form :model="form" ref="form" :label-width="formLabelWidth">
      <el-form-item label="分类">
        <el-select v-model="form.category" placeholder="请选择类型" clearable>
          <el-option v-for="item in classObj.info" :key="item.id" :label="item.category_name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" class="m-t-30">
        <el-input v-model="form.title" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="概况" class="m-t-30">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="form.content" autocomplete="off" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancel('form')">取 消</el-button>
      <el-button type="danger" :loading="btnLoading" @click="handleDialogConfirm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
import { addInfo } from "@/api/news";
export default {
  name: "Dialog",
  props: {
    showDialog: Boolean,
    classObj: Object
  },
  setup(props, { root, emit, refs }) {
    /**
     * 属性初始化
     */
    // reactive
    const form = reactive({
      title: "",
      content: "",
      category: ""
    });
    // ref
    const btnLoading = ref(false);
    const dialogFormVisible = ref(false);
    const formLabelWidth = ref("70px");
    /**
     * watch监听
     */
    watch(() => (dialogFormVisible.value = props.showDialog));
    /**
     * 函数方法
     */
    const handleDialogCancel = formName => {
      // $refs[formName].resetFields();
      dialogFormVisible.value = false;
      emit("update:showDialog", false);
    };
    const handleDialogConfirm = formName => {
      // root.$refs[formName].validate(valid => {
      //   if (valid) {
      if (!form.category) {
        root.$message.error("分类不能为空！");
        return false;
      }
      btnLoading.value = true;
      addInfo(form)
        .then(res => {
          btnLoading.value = false;
          if (res.resCode == 0) {
            root.$message.success(res.message);
            handleDialogCancel(formName);
            refs.form.resetFields();
            emit("freshList");
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {
          btnLoading.value = false;
        });
      //   } else {
      //     return false;
      //   }
      // });
    };
    return {
      /**
       * data
       */
      // reactive
      form,
      // ref
      btnLoading,
      formLabelWidth,
      dialogFormVisible,
      /**
       * methods
       */
      handleDialogCancel,
      handleDialogConfirm
    };
  }
};
</script>

<style lang="scss" scoped>
.info-dialog {
  /deep/ .el-dialog__body {
    padding: 30px 20px 0 !important;
  }
}
</style>