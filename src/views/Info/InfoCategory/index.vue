<template>
  <div class="info-category">
    <el-button type="danger" size="mini" @click="handleCategory('add')">添加一级分类</el-button>
    <hr class="hr-e9e9e9">
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category-wrap">
          <div class="category" v-for="item in categoryList.info" :key="item.id">
            <!-- 一级分类 -->
            <h4>
              <div class="v-line" v-if="item.children && item.children.length!=0" @click="handleSvg(item)">
                <svg-icon :iconClass="showType?'plus':'minus'"></svg-icon>
              </div>
              <svg-icon v-else iconClass="minus"></svg-icon>
              {{item.category_name}}
              <div class="pull-right btn-group">
                <el-button size="mini" type="danger" round @click="handleCategory('edit',item)">编辑</el-button>
                <el-button size="mini" type="success" round @click="handleCategory('subAdd',item)">添加子项</el-button>
                <el-button size="mini" round @click="delCategory(item.id)">删除</el-button>
              </div>
            </h4>
            <!-- 二级分类 -->
            <ul v-show="item.children  && item.children.length!=0 && !showType">
              <li v-for="subItem in item.children" :key="subItem.id">
                {{subItem.category_name}}
                <div class="pull-right btn-group">
                  <el-button size="mini" type="danger" round @click="handleCategory('subEdit',subItem)">编辑</el-button>
                  <el-button size="mini" round @click="delCategory(subItem.id)">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="menu-title">
          一级分类编辑
        </h4>
        <el-form label-width="120px" ref="form" class="form-wrap" :disabled="showForm" :model="formLabelAlign">
          <el-form-item label="一级分类名称" prop="categoryName" v-if="category">
            <el-input class="w410" size="mini" :disabled="showCategory" v-model="formLabelAlign.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称" prop="secCategoryName" v-if="subCategory">
            <el-input class="w410" size="mini" v-model="formLabelAlign.secCategoryName"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="danger" size="mini" @click="submit" :loading="btnLoading">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  AddFirstCategory,
  getCategory,
  deleteCategory,
  editCategory,
  getCategoryAll,
  AddChildrenCategory,
  editChildrenCategory
} from "@/api/news";
import { reactive, ref, onMounted, toRefs } from "@vue/composition-api";
import { global } from "@/utils/global";

export default {
  name: "InfoCategory",
  setup(props, { root, refs }) {
    /**
     *  global
     */
    const { confirm } = global();
    /**
     *  data
     */
    // ref
    const showType = ref(true);
    const category = ref(true);
    const showCategory = ref(false);
    const subCategory = ref(true);
    const btnLoading = ref(false);
    const showForm = ref(true);
    const btnType = ref("");
    const parentId = ref("");
    // reactive
    const formLabelAlign = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    // 注意不要直接reactive一个数组。。。用json转化一下
    const categoryList = reactive({
      info: []
    });
    /**
     *  mounted
     */
    onMounted(() => {
      getCategoryList();
    });
    /**
     *  methods
     */
    // 确定
    const submit = () => {
      if (
        !formLabelAlign.categoryName &&
        (btnType.value === "add" || btnType.value === "edit")
      ) {
        root.$message.warning("一级分类名称不能为空");
        return false;
      }
      if (
        !formLabelAlign.secCategoryName &&
        (btnType.value === "subAdd" || btnType.value === "subEdit")
      ) {
        root.$message.warning("二级分类名称不能为空");
        return false;
      }
      switch (btnType.value) {
        case "add":
          addForm(
            AddFirstCategory({
              categoryName: formLabelAlign.categoryName,
              parentId: row.id
            })
          );
          break;
        case "subAdd":
          addForm(
            AddChildrenCategory({
              categoryName: formLabelAlign.secCategoryName,
              parentId: parentId.value
            })
          );
          break;
        case "edit":
          addForm(
            editCategory({
              categoryName: formLabelAlign.categoryName,
              id: formLabelAlign.categoryId
            })
          );
          break;
        case "subEdit":
          addForm(
            editChildrenCategory({
              categoryName: formLabelAlign.secCategoryName,
              parentId: parentId.value
            })
          );
          break;
      }
    };
    const addForm = fnc => {
      btnLoading.value = true;
      fnc
        .then(res => {
          btnLoading.value = false;
          if (res.resCode == 0) {
            root.$message.success(res.message);
            btnType.value === "subAdd" || btnType.value === "subEdit"
              ? (formLabelAlign.secCategoryName = "")
              : refs.form.resetFields();
            getCategoryList();
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {
          btnLoading.value = false;
        });
    };
    // 获取分类
    const getCategoryList = () => {
      getCategoryAll({})
        .then(res => {
          if (res.resCode == 0) {
            categoryList.info = res.data;
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {});
    };
    // 删除
    const delCategory = id => {
      confirm({
        content: "此操作将永久删除该分类, 是否继续?",
        type: "warning",
        fnc: queryDelFnc,
        catchFnc,
        data: { id }
      });
    };
    // 删除接口
    const queryDelFnc = id => {
      deleteCategory({ categoryId: id })
        .then(res => {
          if (res.resCode == 0) {
            root.$message.success(res.message);
            getCategoryList();
            return;
          }
          root.$message.error(res.message);
        })
        .catch(err => {});
    };
    const catchFnc = () => {
      root.$message.info("已取消删除");
    };
    // 子项添加
    const handleCategory = (type, row) => {
      refs.form.resetFields();
      btnType.value = type;
      if (type !== "subEdit") {
        category.value = true;
        subCategory.value = false;
        if (type === "edit" || type === "subAdd") {
          formLabelAlign.categoryName = row.category_name;
          formLabelAlign.categoryId = row.id;
        }
        if (type === "subAdd") {
          category.value = true;
          showCategory.value = true;
          subCategory.value = true;
        }
      } else {
        formLabelAlign.categoryName = row.category_name;
        category.value = true;
        showCategory.value = true;
        subCategory.value = true;
      }
      parentId.value = row.id;
      showForm.value = false;
    };
    const handleSvg = row => {
      showType.value = !showType.value;
    };

    return {
      // ref
      showType,
      parentId,
      showCategory,
      btnType,
      showForm,
      category,
      subCategory,
      btnLoading,
      // reactive
      formLabelAlign,
      categoryList,
      // methods
      catchFnc,
      submit,
      delCategory,
      handleCategory,
      getCategoryList,
      handleSvg
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.info-category {
  .hr-e9e9e9 {
    width: calc(100% + 60px);
    margin: 30px 0;
    margin-left: -30px;
    border: none;
    border-bottom: 1px solid #e9e9e9;
  }
  .category-wrap {
    div:first-child {
      &:before {
        top: 20px;
      }
    }
    div:last-child {
      &:before {
        bottom: 21px;
      }
    }
  }
  .category {
    line-height: 44px;
    position: relative;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      left: 22px;
      top: 0;
      bottom: 0;
      width: 32px;
      border-left: 1px dotted #000;
    }
    h4 {
      padding-left: 40px;
    }
    svg {
      position: absolute;
      left: 15px;
      top: 15px;
      background-color: #fff;
      font-size: 17px;
    }
    li {
      position: relative;
      margin-left: 22px;
      padding-left: 38px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 22px;
        width: 32px;
        border-bottom: 1px dotted #000;
      }
    }
    li,
    h4 {
      @include webkit(transition, all 0.5s ease 0s);
      &:hover {
        background-color: #f3f3f3;
        .btn-group {
          display: block;
        }
      }
    }
    .btn-group {
      display: none;
      position: absolute;
      z-index: 2;
      right: 11px;
      top: -1px;
      button {
        font-size: 12px;
      }
    }
  }
  .menu-title {
    line-height: 44px;
    padding-left: 22px;
    background-color: #f5f5f5;
  }
  .form-wrap {
    width: 410px;
    margin-top: 26px;
  }
}
</style>