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
  <div class="login">
    <h3>再設定したいメールアドレスを入力してください。</h3>
    <el-form>
      <el-input type="email" class="email-form" required v-model="useremail" placeholder="メールアドレス" />
      <el-button @click.prevent="passwordsend" color="#B9A273" class="login-button">パスワード再設定用メール送信</el-button>
    </el-form>
  </div>
</template>

<style scoped>
.login {
  text-align: center;
  position: absolute;
  width: 400px;
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
</style>
