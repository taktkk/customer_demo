<script lang="ts" setup>
//ライブラリのインポート
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

// import Header from '../components/Header.vue'
// import Footer from '../components/Footer.vue'
import { ref, reactive } from "vue";

const useremail = ref("");
const password = ref("");
const username = ref("");
const username_kana = ref("");
const prefacture = ref("");
const phonenumber = ref("");
const birthday = ref("");

const login = () => {
  //cognito設定
  const poolData = {
    UserPoolId: import.meta.env.VITE_APP_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID,
  };
  const userPool = new CognitoUserPool(poolData);

  //cognitoパラメータ設定
  // const useremail = useremail.value;
  // const password = password.value;

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
    newPasswordRequired: function (userAttributes, requiredAttributes) {
      cognitoUser.completeNewPasswordChallenge("Admin@Admin00", {}, this);
    },

    onSuccess: function () {
      const result = "/mypage_admin";
      location.assign(result);
    },
    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
  });
};
</script>

<template>
  <div class="login">
    <h3>ユーザー情報</h3>
    <el-form>
      <div class="demo-input-size">
        <el-input
          type="email"
          class="email-form w-50 m-2"
          required
          v-model="useremail"
          placeholder="メールアドレス"
        />
        <el-input
          type="password"
          class="email-form w-50 m-2"
          required
          v-model="password"
          placeholder="パスワード"
        />
      </div>
      <div class="demo-input-size">
        <el-input
          type="string"
          class="email-form w-50 m-2"
          required
          v-model="username"
          placeholder="氏名"
        />
        <el-input
          type="password"
          class="email-form w-50 m-2"
          required
          v-model="username_kana"
          placeholder="氏名（カタカナ）"
        />
      </div>
      <div class="demo-input-size">
        <el-input
          type="email"
          class="email-form w-50 m-2"
          required
          v-model="prefacture"
          placeholder="都道府県"
        />
        <el-input
          type="password"
          class="email-form w-60 m-2"
          required
          v-model="phonenumber"
          placeholder="電話番号"
        />
      </div>
      <div class="demo-input-size">
        <el-input
          type="email"
          class="email-form w-50 m-2"
          required
          v-model="birthday"
          placeholder="生年月日"
        />
      </div>
      <el-button @click.prevent="login" color="#B9A273" class="login-button"
        >新規登録</el-button
      >
    </el-form>
  </div>
</template>

<style scoped>
.login {
  margin: 0 auto;
  position: absolute;
  width: 812px;
  height: 40px;
  left: 500px;
  top: 104px;
}
.login-button {
  color: white;
  margin: 20px auto;
}
.email-form {
  margin: 20px auto;
}

.demo-input-size {
  justify-content: center;
  display: flex;
}
</style>
