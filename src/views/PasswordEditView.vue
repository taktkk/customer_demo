<script lang="ts" setup >

  //ライブラリのインポート
  import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails

  } from 'amazon-cognito-identity-js'

  // import Header from '../components/Header.vue'
  // import Footer from '../components/Footer.vue'
  import { ref , reactive } from 'vue'


  
     const useremail =ref('')
     const password =ref('')
     

    
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

        const authenticationDetails = new AuthenticationDetails(
          authenticationData
        );

        const userData = {
          Username: useremail.value,
          Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        //ログイン処理
        cognitoUser.authenticateUser(authenticationDetails, {

          newPasswordRequired: function (userAttributes, requiredAttributes) {
              cognitoUser.completeNewPasswordChallenge("Admin@Admin00", {}, this)
          },


          onSuccess: function() {
            const result="/mypage_admin";
            location.assign(result);
          },
          onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
          }
        });
      }
    
  
</script>

<template>
  <div class="login">
    <el-form>
        <el-input type="password" class="password-form" required v-model="password" placeholder="パスワード" />
        <el-input type="password" class="password-form" required v-model="password" placeholder="パスワード（再確認）" />
        <el-input type="number" class="password-form" required v-model="password" placeholder="CODE" />


      <el-button @click.prevent="login" color=#B9A273 class="login-button">更新</el-button>
      </el-form>
  </div>

  
</template>

<style scoped>
.login {
  text-align: center;
  position: absolute;
  width: 280px;
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

.password-form {
  margin: 10px;
}
</style>