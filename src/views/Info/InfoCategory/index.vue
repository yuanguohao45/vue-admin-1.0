<template>
  <div id="info-category">
    <el-button type="danger">添加一级分类</el-button>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <h4>
                <svg-icon iconClass="minus" className=""></svg-icon>新闻
                <div class="btn-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="primary" round>添加子集</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
            <div class="category">
              <h4>
                <svg-icon iconClass="minus" className=""></svg-icon>新闻
                <div class="btn-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="primary" round>添加子集</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="btn-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">
            一级分类编辑
          </h4>
          <el-form label-width="80px" :model="formLabelAlign">
            <el-form-item label="名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "InfoCategory",
  setup(props, context) {
    /**
     *  data
     */
    const formLabelAlign = reactive({
      name: "",
      region: ""
    });

    return {
      formLabelAlign
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#info-category {
  .category-wrap {
    .category:first-child {
      &:before {
        top: 20px;
      }
    }
    .category:last-child {
      &:before {
        bottom: 21px;
      }
    }
    .category {
      position: relative;
      line-height: 44px;
      cursor: pointer;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 22px;
        bottom: 0;
        border-left: 1px dotted #000;
      }
      h4 {
        position: relative;
        padding-left: 40px;
        svg {
          position: absolute;
          left: 15px;
          top: 15px;
          font-size: 17px;
          background-color: #fff;
        }
      }
      .btn-group {
        display: none;
        position: absolute;
        z-index: 2;
        top: -1px;
        right: 11px;
        button {
          font-size: 12px;
        }
      }
      li {
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &:before {
          content: "";
          position: absolute;
          top: 22px;
          left: 0;
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
    }
  }
  .menu-title {
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
  }
}
</style>