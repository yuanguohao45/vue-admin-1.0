<template>
  <div>
    <el-row :gutter="20">
      <el-form :inline="true" :model="formInline">
        <el-col :span="4">
          <el-form-item label="类型：">
            <el-select v-model="type" placeholder="请选择" style="width:120px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期：">
            <el-date-picker v-model="dateRange" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="关键字：">
            <el-select v-model="keyWord" style="width:80px;">
              <el-option v-for="item in kwOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "InfoList",
  setup(props, context) {
    const options = reactive([
      {
        value: "1",
        label: "国际信息"
      },
      {
        value: "2",
        label: "国内信息"
      },
      {
        value: "3",
        label: "行业信息"
      }
    ]);
    const kwOptions = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    const type = ref("");
    const dateRange = ref("");
    const keyWord = ref("");
    const inputValue = ref("");
    return {
      options,
      kwOptions,
      type,
      dateRange,
      keyWord,
      inputValue
    };
  }
};
</script>

<style lang="scss" scoped>
.bgc {
  background-color: #fff;
}
</style>