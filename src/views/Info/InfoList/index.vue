<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="wrap-content">
            <el-select v-model="queryParams.categoryId" placeholder="请选择" style="width:100%;" clearable>
              <el-option v-for="item in options.info" :key="item.id" :label="item.category_name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker style="width:100%;" v-model="dateRange" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']" clearable>
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-word">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="queryParams.id" style="width:100%;" clearable>
              <el-option v-for="item in kwOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input style="width:100%;" v-model="queryParams.title" placeholder="请输入内容" clearable></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" style="width: 120px;" @click="searchList">搜索</el-button>
      </el-col>
      <el-col :span="4" align="right">
        <el-button type="danger" style="width: 120px;" @click="handleRow('new')">新增</el-button>
      </el-col>
    </el-row>
    <el-table class="m-t-30" ref="multipleTable" v-loading="tableLoading" border :data="tableData.info" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" highlight-current-row :header-row-style="headerStyle" :cell-style="cellStyle">
      <el-table-column type="selection" min-width="55" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="240" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="categoryId" label="类别" min-width="60" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createDate" label="日期" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="content" label="概况" min-width="60" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" min-width="130" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleRow('del',scope.row)">删除</el-button>
          <el-button type="success" size="mini" @click="handleRow('edit',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-t-30">
      <el-button @click="delGroup" plain class="pull-left">批量删除</el-button>
      <el-pagination class="pull-right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <Dialog :showDialog.sync="showDialog" :classObj="classObj" @freshList="searchList"></Dialog>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global";
import Dialog from "../Dialog";
import { getCategory, getInfoList } from "@/api/news";
import { common } from "@/api/common";

export default {
  name: "InfoList",
  components: { Dialog },
  setup(props, { root }) {
    /**
     * 属性初始化
     */
    const { str, confirm } = global();
    const { getInfoCategory } = common(); // category
    // watch(() => {
    //   console.log(str.value);
    // });
    // reactive
    const options = reactive({
      info: [
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
      ]
    });
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
    const tableData = reactive({
      info: []
    });
    const multipleSelection = reactive([]);
    const classObj = reactive({ info: [] });
    const headerStyle = reactive({
      "font-size": "14px",
      "font-weight": "bold",
      color: "#344a5f"
    });
    const cellStyle = reactive({ "font-size": "14px" });
    const queryParams = reactive({
      categoryId: "",
      startTime: "",
      endTime: "",
      title: "",
      id: "",
      pageNumber: 1,
      pageSize: 10
    });
    // ref
    const type = ref("");
    const dateRange = ref("");
    const keyWord = ref("ID");
    const inputValue = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const showDialog = ref(false);
    const total = ref(0);
    const tableLoading = ref(false);
    /**
     *  mounted
     */
    onMounted(() => {
      // getInfoCategory(options, catchFnc); // 全局方法文件
      getCategoryList();
      searchList();
    });
    /**
     *  监听
     */
    // watch(
    //   () => category.item,
    //   value => {
    //     options.info = value;
    //   }
    // );
    /**
     * 方法
     */
    // 获取信息列表
    const getInfoData = () => {
      tableLoading.value = true;
      getInfoList(queryParams)
        .then(res => {
          tableLoading.value = false;
          if (res.resCode == 0) {
            tableData.info = res.data.data;
            total.value = res.data.total;
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {
          tableLoading.value = false;
        });
    };
    // 错误捕获
    const catchFnc = err => {
      root.$message.error(err);
    };
    // 获取分类
    const getCategoryList = () => {
      // vuex
      root.$store
        .dispatch("code/classification")
        .then(res => {
          let data = res.data.data;
          if (res.resCode == 0) {
            options.info = data;
            classObj.info = data;
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {});
      // getCategory({})
      //   .then(res => {
      //     if (res.resCode == 0) {
      //       options.info = res.data.data;
      //       return;
      //     }
      //     root.$message.error(res.message);
      //   })
      //   .catch(err => {});
    };
    const searchList = () => {
      getInfoData();
    };
    const handleSelectionChange = val => {
      multipleSelection.value = val;
    };
    const handleRow = (bol, row) => {
      switch (bol) {
        case "new":
          showDialog.value = true;
          break;
        case "edit":
          showDialog.value = true;
          break;
        case "del":
          delMethod(row);
          break;
      }
    };
    const delMethod = row => {
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告"
      });
    };
    const delGroup = () => {
      confirm({
        content: "即将删除全部, 是否继续?",
        type: "warning",
        fnc: delFnc
      });
    };

    const delFnc = () => {
      alert(1);
    };

    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };
    return {
      options,
      classObj,
      kwOptions,
      type,
      dateRange,
      keyWord,
      inputValue,
      tableData,
      multipleSelection,
      delGroup,
      handleRow,
      handleSizeChange,
      handleCurrentChange,
      pageSize,
      currentPage,
      headerStyle,
      cellStyle,
      showDialog,
      tableLoading,
      total,
      queryParams,

      searchList,
      handleSelectionChange,
      delMethod
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-word {
    @include labelDom(right, 99, 40);
  }
}
</style>