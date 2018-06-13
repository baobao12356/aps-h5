<style lang="scss"  rel="stylesheet/scss" scoped>
  .ww {
    width: 100%;
  }
  body {
    padding: 0;
    margin-top: 60px;

    background:#fff;
    font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
  }
  .login-module {
  }
  .login-title {
    text-align: left;
    height: 50px;
    margin: 50px 15%;
    border-bottom: 1px solid #e4e4e4;
    font-size: 0;
    color: #666;

    img {
      height: 50px;
      vertical-align: middle;
      display: inline-block;
    }
    span {
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
      display: inline-block;
      font-size: 16px;
    }
  }
  .divider {
    margin: 0 10px;
    color: #e4e4e4;
  }

  .login-body {
    margin: 0 18%;
    padding: 0 20px;
  }
  .login-ad-wrap {
    height: 100%;
    padding: 10px;
    text-align: center;
    background: #fafafa;

    p {
      margin: 0;
      line-height: 18px;
      font-size: 12px;
      color: #aaa;
    }
  }
  .login-ad {
    width: 60%;
    margin: 6% 0;
    border-radius: 4px;
  }
  .login-select {
    position: absolute;
    left: -60%;
    width: 50%;
    min-width: 100px;
    text-overflow: ellipsis;
  }
</style>
<template>

  <div id="app" class="login-module">
    <div class="login-title">
      <img src="../../assets/img/logo.png">
      <span class="divider">|</span>
      <span>登录</span>
    </div>
    <div class="login-body">
      <el-row :gutter="60">
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="100px">
            <el-form-item label="手机号码" label-width="50%" prop="phone">
              <el-select class="login-select" v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input style="z-index: 5" type="text" v-model.number="loginForm.phone" :maxlength="11" placeholder="注册时填写的手机号" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
              <el-input type="password" v-model="loginForm.password" :maxlength="20" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model.number="loginForm.code" :maxlength="4" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <div style="margin-bottom: 10px;text-align: left">
              <el-checkbox label="三天内自动登录"></el-checkbox>
              <el-button style="float: right;padding: 0;line-height:23px;" type="text">忘记密码？</el-button>
            </div>
            <el-button class="ww" type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button style="float: right;padding: 0;margin-top:10px;line-height:23px;" type="text">免费注册，轻松开店</el-button>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" class="login-ad-wrap">
          <img class="login-ad" width="100%" src="../../assets/img/login-ad.jpg">
          <p>下载手机客户端</p>
          <p>随时随地管理你的店铺</p>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
<script>

  export default {
    name: 'login',
    data() {

        var validatePhone = (rule, value, callback) => {
          if (!value) {
            callback(new Error('账号不能为空'));
          }
          if (!/^\d{11}$/.test(value)) {
            callback(new Error('请填写注册时的手机号'));
          } else {
            callback();
          }
        };
        var validatePassword = (rule, value, callback) => {
          if (!value) {
            callback(new Error('密码不能为空'));
          } else {
            callback();
          }
        };
        var validateCode = (rule, value, callback) => {
          if (!value) {
            callback(new Error('验证码不能为空'));
          } else {
            callback();
          }
        };

        return {
            value: 86,
            options: [{
                value: 86,
                label: '中国 +86'
            }, {
              value: 54,
              label: '阿根廷 +54'
            }, {
              value: 353,
              label: '爱尔兰 +353'
            }, {
              value: 61,
              label: '澳大利亚 +61'
            }],
            loginForm: {
                phone: '',
                password: '',
                code: ''
            },
            rules: {
                phone: [
                  { validator: validatePhone, trigger: 'blur' }
                ],
                password: [
                  { validator: validatePassword, trigger: 'blur' }
                ],
                code: [
                  { validator: validateCode, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/qrcode');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>
