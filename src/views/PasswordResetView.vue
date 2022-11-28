<script lang="ts" setup>
//ライブラリのインポート
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

// import Header from '../components/Header.vue'
// import Footer from '../components/Footer.vue'
import { ref, reactive } from "vue";
// import { customerInformationStore } from "../stores/information";
// const information = customerInformationStore();
import { useRouter } from "vue-router";
const router = useRouter();

const useremail = ref("");
const password = ref("");

const passwordsend = () => {
  //cognito設定
  const poolData = {
    UserPoolId: import.meta.env.VITE_APP_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID,
  };
  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: useremail.value,
    Pool: userPool,
  };

  // information.$patch({
  //   email: useremail.value,
  // });

  // information.email = useremail.value;
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        console.log("email verification success");
        resolve(result);
        router.push({ path: "/passwordedit", query: { email: useremail.value } });
        // location.assign("/passwordedit");
      },
      onFailure: (err) => {
        console.log("email verification failed");
        reject(err);
      },
    });
  });
};
</script>

<template>
  <div class="container">
    <div class="login">
      <p class="text">再設定したいメールアドレスを入力してください。</p>
      <el-form>
        <el-input type="email" class="email-form" required v-model="useremail" placeholder="メールアドレス" />
        <el-button @click.prevent="passwordsend" color="#B9A273" class="login-button">パスワード再設定用メール送信</el-button>
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
  width: 400px;
}
.login-button {
  color: white;
  margin: 20px auto;
}
.email-form {
  width: 280px;
  margin: 20px auto;
}

.text {
  height: 24px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  letter-spacing: 0.16px;

  /* Info/Info-100% */

  color: #909399;
  background: #f4f4f5;
  border-radius: 2px;
}
</style>
