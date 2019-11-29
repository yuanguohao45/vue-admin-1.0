<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label class="label" for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label class="label" for="password">密码</label>
          <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-show="tonixObj.model=='register'">
          <label class="label" for="passwords">重复密码</label>
          <el-input id="passwords" type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label class="label" for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" :disabled="tonixObj.showCodeBtn" @click="getSms">{{tonixObj.showCodeBtnText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :disabled="tonixObj.showBtn" @click="submitForm('ruleForm')" class="login-btn block">{{tonixObj.model=='login'?'登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 加密： base64,md5,sha1
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login";
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
    /**
     * attrs:(...) == this.$attrs
     * emit:(...) == this.$emit
     * listeners:(...) == this.$listeners
     * parent:(...) == this.parent
     * refs:(...) == this.refs
     * root:(...) == this
     * slots:(...) = {}
     */
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
      if (tonixObj.model == "login") {
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
    const tonixObj = reactive({
      model: "login",
      showBtn: true,
      showCodeBtn: false,
      showCodeBtnText: "获取验证码"
    });
    const timer = ref(null);
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
    // 函数声明---尽量功能独立，低耦合，抽象实体并进行封装
    /**
     * 切换模块
     */
    const toggleMenu = data => {
      menuTab.forEach(e => {
        e.current = !e.current;
      });
      tonixObj.model = data.type;
      resetFormData();
    };
    /**
     * 清除表单数据
     */
    const resetFormData = () => {
      context.refs.ruleForm.resetFields();
      clearCountDown();
    };
    /**
     * 更新按钮状态
     */
    const updateBtnStatus = params => {
      tonixObj.showCodeBtnText = params.text;
      tonixObj.showCodeBtn = params.status;
    };
    /**
     * 提交表单
     */
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        let json = {
          model: tonixObj.model,
          ...ruleForm
        };
        json.password = sha1(json.password);
        let btnMethod = tonixObj.model === "login" ? Login : Register;
        if (valid) {
          btnMethod(json)
            .then(res => {
              context.root.$message.success(res.message);
              btnMethod === "register" && toggleMenu(menuTab[0]);
              resetFormData();
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    };
    /**
     * 获取验证码
     */
    const getSms = () => {
      if (!ruleForm.username) {
        context.root.$message.error("请输入用户名");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        context.root.$message.error("邮箱格式不正确");
        return false;
      }
      let json = {
        username: ruleForm.username,
        model: tonixObj.model
      };
      updateBtnStatus({ status: true, text: "发送中" });
      GetSms(json)
        .then(res => {
          context.root.$message.success(res.message);
          tonixObj.showBtn = false;
          coutDown(60);
        })
        .catch(err => {});
    };
    /**
     * 定时器
     */
    const coutDown = number => {
      timer.value && clearInterval(timer.value);
      let time = number;
      timer.value = setInterval(() => {
        --time;
        if (time === 0) {
          clearInterval(timer.value);
          updateBtnStatus({ status: false, text: "再次获取" });
        } else {
          tonixObj.showCodeBtnText = `倒计时${time}秒`;
        }
      }, 1000);
    };

    /**
     * 清除定时器
     */
    const clearCountDown = () => {
      updateBtnStatus({ status: false, text: "获取验证码" });
      clearInterval(timer.value);
    };

    return {
      menuTab,
      ruleForm,
      rules,
      tonixObj,

      toggleMenu,
      submitForm,
      getSms
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  // display: flex;
  // align-items: center;
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

<!--
密码加密：
1、在前端预先加密一次
登录的密码：123456（普通字符串）
经过加密后：sha1('123456') == '541216ad5s4f5ds1f5asd4f65asd4' （加密后的字符串）


2、后台加密
接收到字符串：'541216ad5s4f5ds1f5asd4f65asd4'
后台再次加密：md5('541216ad5s4f5ds1f5asd4f65asd4') == '8f9qwersd3g165y4d1sf3s1f6aew4'（最终的加密后的密码）
最终新的字符串写入数据库：8f9qwersd3g165y4d1sf3s1f6aew4


3、登录
用户名与加密后的密码进行匹配，成功则登录，失败则提示
-->