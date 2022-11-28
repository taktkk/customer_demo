<script lang="ts" setup>
//ライブラリのインポート
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

// import Header from '../components/Header.vue'
// import Footer from '../components/Footer.vue'
import { ref, reactive } from "vue";
// import { customerInformationStore } from '../stores/information';
// const information = customerInformationStore();
import { useRoute } from "vue-router";
const route = useRoute();

const code = ref("");
const password = ref("");

const passwordreset = () => {
  //cognito設定
  const poolData = {
    UserPoolId: import.meta.env.VITE_APP_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID,
  };
  const userPool = new CognitoUserPool(poolData);
  const useremail = String(route.query.email);
  const userData = {
    Username: useremail,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmPassword(code.value, password.value, {
    onSuccess: function () {
      console.log("password reset success");
      console.log(route.query.email);
      location.assign("/signin");
    },
    onFailure: function () {
      console.log("password reset failed");
    },
  });
};
</script>

<template>
  <div class="container">
    <div class="login">
      <el-form>
        <el-input type="password" id="new_password" class="password-form" required v-model="password" placeholder="パスワード" />
        <el-input type="password" id="new_password" class="password-form" required v-model="password" placeholder="パスワード（再確認）" />
        <el-input id="code" class="password-form" required v-model="code" placeholder="CODE" />

        <el-button @click.prevent="passwordreset" color="#B9A273" class="login-button">更新</el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.login {
  margin: 20px auto;
  text-align: center;
  width: 280px;
}
.login-button {
  color: white;
  margin: 20px auto;
}
.email-form {
  margin: 20px auto;
}

.password-form {
  margin: 10px;
}
</style>
