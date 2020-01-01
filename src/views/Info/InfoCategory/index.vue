<template>
  <div class="info-category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr-e9e9e9">
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category-wrap">
          <div class="category" v-for="item in categoryList.info" :key="item.id">
            <h4>
              <svg-icon iconClass="minus"></svg-icon>
              {{item.category_name}}
              <div class="pull-right btn-group">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" type="success" round>添加子项</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul v-if="item.children">
              <li v-for="subItem in item.children" :key="subItem.id">
                {{subItem.category_name}}
                <div class="pull-right btn-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
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
        <el-form label-width="120px" ref="form" class="form-wrap" :model="formLabelAlign">
          <el-form-item label="一级分类名称" prop="categoryName" v-if="category">
            <el-input class="w410" v-model="formLabelAlign.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称" prop="secCategoryName" v-if="subCategory">
            <el-input class="w410" v-model="formLabelAlign.secCategoryName"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="danger" @click="submit" :loading="btnLoading">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AddFirstCategory, getCategory } from "@/api/news";
import { reactive, ref, onMounted, toRefs } from "@vue/composition-api";
export default {
  name: "InfoCategory",
  setup(props, { root, refs }) {
    /**
     *  data
     */
    // ref
    const category = ref(true);
    const subCategory = ref(true);
    const btnLoading = ref(false);
    // reactive
    const formLabelAlign = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    // 注意不要直接reactive一个数组。。。用json转化一下
    const categoryList = reactive({
      info: [
        {
          id: "12",
          category_name: "国际信息",
          children: [
            { id: "12_1", category_name: "国际信息_叙利亚局势" },
            { id: "12_2", category_name: "国际信息_叙利亚局势" },
            { id: "12_3", category_name: "国际信息_叙利亚局势" }
          ]
        },
        {
          id: "13",
          category_name: "国内信息",
          children: [
            { id: "13_1", category_name: "国内信息_二十大召开" },
            { id: "13_2", category_name: "国内信息_二十大召开" },
            { id: "13_3", category_name: "国内信息_二十大召开" }
          ]
        }
      ]
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
    // 添加一级分类
    const addFirst = () => {
      category.value = true;
      subCategory.value = false;
    };
    // 确定
    const submit = () => {
      if (!formLabelAlign.categoryName) {
        root.$message.warning("名称不能为空");
        return false;
      }
      btnLoading.value = true;
      AddFirstCategory({ categoryName: formLabelAlign.categoryName })
        .then(res => {
          btnLoading.value = false;
          if (res.data.resCode == 0) {
            root.$message.success(res.data.message);
            getCategoryList();
            // push---节约资源
            // categoryList.info.push(res.data.data);
            return;
          }
          root.$message.error(res.data.message);
          // refs.form.resetFields();
          formLabelAlign = {};
        })
        .catch(err => {
          btnLoading.value = false;
        });
    };
    // 获取分类
    const getCategoryList = () => {
      getCategory({})
        .then(res => {
          if (res.data.resCode == 0) {
            categoryList.info = res.data.data.data;
            return;
          }
          root.$message.error(res.data.message);
        })
        .catch(err => {});
    };
    return {
      // ref
      category,
      subCategory,
      btnLoading,
      // reactive
      formLabelAlign,
      categoryList,
      // methods
      submit,
      addFirst,
      getCategoryList
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