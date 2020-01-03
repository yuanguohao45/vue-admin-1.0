<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="wrap-content">
            <el-select v-model="dataObj.queryParams.categoryId" placeholder="请选择" style="width:100%;" clearable>
              <el-option v-for="item in dataObj.options.info" :key="item.id" :label="item.category_name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker style="width:100%;" v-model="dataObj.dateRange" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable>
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-word">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="dataObj.type" style="width:100%;" @change="type_change" clearable>
              <el-option v-for="item in dataObj.kwOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input style="width:100%;" v-model="dataObj.keyWord" placeholder="请输入内容" clearable></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" style="width: 120px;" :loading="dataObj.btnLoading" @click="searchList">搜索</el-button>
      </el-col>
      <el-col :span="4" align="right">
        <el-button type="danger" style="width: 120px;" :loading="dataObj.btnLoading" @click="handleRow('new')">新增</el-button>
      </el-col>
    </el-row>
    <el-table class="m-t-30" ref="multipleTable" v-loading="dataObj.tableLoading" border :data="dataObj.tableData.info" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" highlight-current-row :header-row-style="dataObj.headerStyle" :cell-style="dataObj.cellStyle">
      <el-table-column type="selection" min-width="55" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="240" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="categoryId" label="类别" :formatter="categoryTounix" min-width="60" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createDate" label="日期" :formatter="datetounixMethods" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="content" label="概况" min-width="60" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" min-width="130" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" :loading="dataObj.btnLoading" @click="handleRow('del',scope.row)">删除</el-button>
          <el-button type="success" size="mini" :loading="dataObj.btnLoading" @click="handleRow('edit',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-t-30">
      <el-button @click="delGroup" :loading="dataObj.btnLoading" plain class="pull-left">批量删除</el-button>
      <el-pagination class="pull-right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="dataObj.queryParams.pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="dataObj.queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataObj.total">
      </el-pagination>
    </div>
    <Dialog :showDialog.sync="dataObj.showDialog" :classObj="dataObj.classObj" @freshList="searchList"></Dialog>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global";
import Dialog from "../Dialog";
import { getCategory, getInfoList, delInfo } from "@/api/news";
import { common } from "@/api/common";
import { datetounixMethods } from "@/utils/timeTounix";
import moment from "moment";

export default {
  name: "InfoList",
  components: { Dialog },
  setup(props, { root }) {
    /**
     *  全局方法
     */
    const { str, confirm } = global();
    const { getInfoCategory } = common(); // category
    /**
     *  data初始化
     */
    const dataObj = reactive({
      options: {
        info: []
      },
      kwOptions: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ],
      tableData: {
        info: []
      },
      multipleSelection: [],
      classObj: { info: [] },
      headerStyle: {
        "font-size": "14px",
        "font-weight": "bold",
        color: "#344a5f"
      },
      cellStyle: { "font-size": "14px" },
      queryParams: {
        categoryId: "",
        startTime: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: 1,
        pageSize: 10
      },
      dateRange: "",
      showDialog: false,
      total: 0,
      tableLoading: false,

      delIds: [],
      type: "id",
      keyWord: ""
    });
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
    watch(
      () => dataObj.dateRange,
      value => {
        if (value && value.length != 0) {
          dataObj.queryParams.startTime = value[0];
          dataObj.queryParams.endTime = value[1];
        } else {
          dataObj.queryParams.startTime = "";
          dataObj.queryParams.endTime = "";
        }
      }
    );
    watch(
      () => dataObj.type,
      value => {
        if (value) {
          dataObj.queryParams[value] = dataObj.keyWord;
          if (value == "id") {
            dataObj.queryParams.title = "";
          } else {
            dataObj.queryParams.id = "";
          }
        } else {
          dataObj.queryParams.title = "";
          dataObj.queryParams.id = "";
        }
      }
    );
    /**
     *  方法
     */
    // 类别切换
    const type_change = val => {
      dataObj.type = val;
      dataObj.keyWord = "";
    };
    // 获取信息列表
    const getInfoData = () => {
      dataObj.queryParams[dataObj.type] = dataObj.keyWord;
      dataObj.tableLoading = true;
      getInfoList(dataObj.queryParams)
        .then(res => {
          dataObj.tableLoading = false;
          if (res.resCode == 0) {
            dataObj.tableData.info = res.data.data;
            dataObj.total = res.data.total;
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {
          dataObj.tableLoading = false;
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
            dataObj.options.info = data;
            dataObj.classObj.info = data;
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
      dataObj.multipleSelection = val;
    };
    const handleRow = (bol, row) => {
      switch (bol) {
        case "new":
          dataObj.showDialog = true;
          break;
        case "edit":
          dataObj.showDialog = true;
          break;
        case "del":
          delMethod(row);
          break;
      }
    };
    const delMethod = row => {
      dataObj.delIds = [];
      dataObj.delIds = Array.of(row.id);
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fnc: delFnc,
        catchFnc: catchFnc,
        data: { id: dataObj.delIds }
      });
    };
    const delGroup = () => {
      dataObj.delIds = [];
      dataObj.delIds = dataObj.multipleSelection.map(item => item.id);
      if (!dataObj.delIds || dataObj.delIds.length == 0) {
        root.$message.error("请至少选择一条数据");
        return false;
      }
      confirm({
        content: "即将删除全部, 是否继续?",
        type: "warning",
        fnc: delFnc,
        catchFnc: catchFnc,
        data: { id: dataObj.delIds }
      });
    };

    const delFnc = id => {
      dataObj.btnLoading = true;
      delInfo({ id: id })
        .then(res => {
          dataObj.btnLoading = false;
          if (res.resCode == 0) {
            root.$message.success(res.message);
            getInfoData();
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {
          dataObj.btnLoading = false;
        });
    };

    const handleSizeChange = val => {
      dataObj.queryParams.pageSize = val;
      handleCurrentChange(1);
    };
    const handleCurrentChange = val => {
      dataObj.queryParams.pageNumber = val;
      getInfoData();
    };

    const categoryTounix = (row, column) => {
      if (!row.categoryId) {
        return "";
      }
      // 不用花括号 可以直接返回   用了得写return
      if (dataObj.options.info && dataObj.options.info.length != 0) {
        let arr = dataObj.options.info.filter(
          item => item.id == row.categoryId
        );
        if (arr && arr.length != 0) {
          return arr[0].category_name;
        } else {
          return "";
        }
      }
    };
    return {
      // data
      dataObj,
      // methods
      delGroup,
      delMethod,
      handleRow,
      searchList,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      type_change,
      // public
      datetounixMethods,
      categoryTounix
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