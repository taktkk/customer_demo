<script lang="ts" setup>
//ライブラリのインポート
import { Phone } from "@element-plus/icons-vue";
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from "amazon-cognito-identity-js";

// import Header from '../components/Header.vue'
// import Footer from '../components/Footer.vue'
import { ref, reactive, computed } from "vue";

const useremail = ref("");
const password = ref("");
const username = ref("");
const username_kana = ref("");
const prefecture = ref("");
const phonenumber = ref();
const birthday = ref("");

const tel = computed(() => "+81" + phonenumber.value);

const signup = () => {
  //cognito設定
  const poolData = {
    UserPoolId: import.meta.env.VITE_APP_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID,
  };
  const userPool = new CognitoUserPool(poolData);

  const name = { Name: "name", Value: username.value };
  const email = { Name: "email", Value: useremail.value };
  // const Password = { Name: 'password', Value: password.value }
  const Username_kana = { Name: "custom:kana_name", Value: username_kana.value };
  const Prefecture = { Name: "address", Value: prefecture.value };
  const Phonenumber = { Name: "phone_number", Value: tel.value };
  const Birthday = { Name: "birthdate", Value: birthday.value };

  const attributeList = [];
  attributeList.push(new CognitoUserAttribute(name));
  attributeList.push(new CognitoUserAttribute(email));
  // attributeList.push(new CognitoUserAttribute(Password))
  attributeList.push(new CognitoUserAttribute(Username_kana));
  attributeList.push(new CognitoUserAttribute(Prefecture));
  attributeList.push(new CognitoUserAttribute(Phonenumber));
  attributeList.push(new CognitoUserAttribute(Birthday));

  return new Promise((resolve, reject) => {
    userPool.signUp(username.value, password.value, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        location.assign("/signin");
      }
    });
  });
};
</script>

<template>
  <div class="signup">
    <h3>ユーザー情報</h3>
    <el-form>
      <div class="demo-input-size">
        <el-input type="email" class="email-form w-50 m-2" required v-model="useremail" placeholder="メールアドレス" />
        <el-input type="password" class="email-form w-50 m-2" required v-model="password" placeholder="パスワード" />
      </div>
      <div class="demo-input-size">
        <el-input type="string" class="email-form w-50 m-2" required v-model="username" placeholder="氏名" />
        <el-input type="string" class="email-form w-50 m-2" required v-model="username_kana" placeholder="氏名（カタカナ）" />
      </div>
      <div class="demo-input-size">
        <el-input type="string" class="email-form w-50 m-2" required v-model="prefecture" placeholder="都道府県" />
        <el-input type="string" class="email-form w-60 m-2" required v-model="phonenumber" placeholder="電話番号" />
      </div>
      <div class="demo-input-size">
        <el-input type="string" class="email-form w-50 m-2" required v-model="birthday" placeholder="生年月日" />
      </div>
      <el-button @click.prevent="signup" color="#B9A273" class="login-button">新規登録</el-button>
    </el-form>
  </div>
</template>

<style scoped>
.signup {
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
