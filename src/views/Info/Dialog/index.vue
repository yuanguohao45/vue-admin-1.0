<template>
  <el-dialog class="info-dialog" title="收货地址" width="580px" :visible.sync="dialogFormVisible" @close="handleDialogCancel('form')">
    <el-form :model="form" ref="form" :label-width="formLabelWidth">
      <el-form-item label="类型">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" class="m-t-30">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况" class="m-t-30">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="form.resource" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancel('form')">取 消</el-button>
      <el-button type="danger" @click="handleDialogConfirm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "Dialog",
  props: {
    showDialog: Boolean
  },
  setup(props, { emit, refs }) {
    /**
     * 属性初始化
     */
    // reactive
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    // ref
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
      handleDialogCancel(formName);
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