<script lang="ts" setup>
//ライブラリのインポート
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

// import Header from '../components/Header.vue'
// import Footer from '../components/Footer.vue'
import { ref, reactive } from "vue";

const useremail = ref("");
const password = ref("");

const login = () => {
  //cognito設定
  const poolData = {
    UserPoolId: import.meta.env.VITE_APP_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID,
  };
  const userPool = new CognitoUserPool(poolData);

  const authenticationData = {
    Username: useremail.value,
    Password: password.value,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: useremail.value,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  //ログイン処理
  cognitoUser.authenticateUser(authenticationDetails, {
    // newPasswordRequired: function (userAttributes, requiredAttributes) {
    //     cognitoUser.completeNewPasswordChallenge("Admin@Admin00", {}, this)
    // },

    onSuccess: function () {
      const result = "/mypage";
      location.assign(result);
    },
    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
  });
};
</script>

<template>
  <div class="container">
    <div class="login">
      <h3>顧客ログイン</h3>
      <el-form>
        <el-input type="email" class="email-form" required v-model="useremail" placeholder="メールアドレス" />
        <el-input type="password" class="password-form" required v-model="password" placeholder="パスワード" />
        <el-button @click.prevent="login" color="#B9A273" class="login-button">ログイン</el-button>
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
</style>
