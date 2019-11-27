<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label class="label">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label class="label">密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-show="model=='register'">
          <label class="label">重复密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label class="label">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import service from "@/utils/request";
import { reactive, ref, onMounted, toRefs } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from "@/utils/validate";

export default {
  name: "Login",
  setup(props, context) {
    /* 声明数据 */
    // 验证用户名
    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误！"));
      } else {
        callback();
      }
    };
    // 验证密码
    const validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else if (validatePass(value)) {
        callback(new Error("密码由6~20位的数字+字母组成！"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    const validatePasswords = (rule, value, callback) => {
      // 考虑性能v-show需做特殊处理
      if (model.value == "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    // 验证验证码
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码！"));
      } else if (validateVCode(value)) {
        callback(new Error("验证码格式有误！"));
      } else {
        callback();
      }
    };
    // 这里放置data数据、生命周期、自定义的函数
    const menuTab = reactive([
      { txt: "登录", type: "login", current: true }, // key值id没有可以自动生成
      { txt: "注册", type: "register", current: false }
    ]);
    const model = ref("login");
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUserName, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    // 生命周期
    onMounted(() => {});
    // 函数声明
    const toggleMenu = data => {
      menuTab.forEach(e => {
        e.current = !e.current;
      });
      model.value = data.type;
    };
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    return {
      menuTab,
      model,
      ruleForm,
      rules,

      toggleMenu,
      submitForm
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  .login-wrap {
    width: 330px;
    margin: auto;
    .menu-tab {
      text-align: center;
      li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
        &.current {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .login-form {
    margin-top: 29px;
    .item-form {
      margin-bottom: 13px;
      .label {
        display: block;
        color: #fff;
        margin-bottom: 3px;
      }
    }
    .block {
      display: block;
      width: 100%;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
}
</style>