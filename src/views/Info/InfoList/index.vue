<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="wrap-content">
            <el-select v-model="type" placeholder="请选择" style="width:100%;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker style="width:100%;" v-model="dateRange" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-word">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="keyWord" style="width:100%;">
              <el-option v-for="item in kwOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input style="width:100%;" v-model="inputValue" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" style="width: 120px;" @click="searchList">搜索</el-button>
      </el-col>
      <el-col :span="4" align="right">
        <el-button type="danger" style="width: 120px;" @click="handleRow('new')">新增</el-button>
      </el-col>
    </el-row>
    <el-table class="m-t-30" ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" highlight-current-row :header-row-style="headerStyle" :cell-style="cellStyle">
      <el-table-column type="selection" min-width="55" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="240" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="category" label="类别" min-width="60" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="date" label="日期" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="user" label="管理员" min-width="60" align="center" show-overflow-tooltip>
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
      <el-pagination class="pull-right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <Dialog :showDialog.sync="showDialog"></Dialog>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import Dialog from "../Dialog";
export default {
  name: "InfoList",
  components: { Dialog },
  setup(props, { root }) {
    /**
     * 属性初始化
     */
    // reactive
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
    const tableData = reactive([
      {
        date: "2016-05-03",
        user: "王小虎",
        title: "上海市普陀区金沙江路 1518 弄",
        category: "ID"
      },
      {
        date: "2016-05-03",
        user: "王小虎",
        title: "上海市普陀区金沙江路 1518 弄",
        category: "ID"
      },
      {
        date: "2016-05-03",
        user: "王小虎",
        title: "上海市普陀区金沙江路 1518 弄",
        category: "ID"
      },
      {
        date: "2016-05-03",
        user: "王小虎",
        title: "上海市普陀区金沙江路 1518 弄",
        category: "ID"
      }
    ]);
    const multipleSelection = reactive([]);
    const headerStyle = reactive({
      "font-size": "14px",
      "font-weight": "bold",
      color: "#344a5f"
    });
    const cellStyle = reactive({ "font-size": "14px" });
    // ref
    const type = ref("");
    const dateRange = ref("");
    const keyWord = ref("ID");
    const inputValue = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const showDialog = ref(false);

    /**
     * 方法
     */
    const searchList = () => {};
    const handleSelectionChange = val => {
      console.log(multipleSelection);
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
      root
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
    };
    const delGroup = () => {
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
    };

    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };
    return {
      options,
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