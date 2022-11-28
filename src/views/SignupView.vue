<script lang="ts" setup>
//ライブラリのインポート
import { Phone } from "@element-plus/icons-vue";
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from "amazon-cognito-identity-js";

// import Header from '../components/Header.vue'
// import Footer from '../components/Footer.vue'
import { ref, reactive, computed } from "vue";

const checkList = ref(["selected and disabled", "Option A"]);
const radio1 = ref("1");
const radio2 = ref("1");
const radio3 = ref("1");
const input1 = ref("");
const input2 = ref("");

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
  <div class="container">
    <div class="signup">
      <h3>ユーザー情報</h3>
      <el-row>
        <el-col :span="9">
          <el-input type="email" class="email-form w-50 m-2" required v-model="useremail" placeholder="メールアドレス" />
        </el-col>
        <el-col :span="9" style="margin: 0 80px">
          <el-input type="password" class="email-form w-50 m-2" required v-model="password" placeholder="パスワード" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-input type="string" class="email-form w-50 m-2" required v-model="username" placeholder="氏名" />
        </el-col>
        <el-col :span="9" style="margin: 0 80px">
          <el-input type="string" class="email-form w-50 m-2" required v-model="username_kana" placeholder="氏名（カタカナ）" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-input type="string" class="email-form w-50 m-2" required v-model="prefecture" placeholder="都道府県" />
        </el-col>
        <el-col :span="9" style="margin: 0 80px">
          <el-input type="string" class="email-form w-60 m-2" required v-model="phonenumber" placeholder="電話番号" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-input type="string" class="email-form w-50 m-2" required v-model="birthday" placeholder="生年月日" />
        </el-col>
      </el-row>

      <el-row>
        <p>質問事項</p>
        <p>1. 髪や頭皮のお悩みに当てはまるモノにチェックをお願いします</p>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="くせ毛" />
          <el-checkbox label="うねり" />
          <el-checkbox label="白髪" />
          <el-checkbox label="かゆみ" />
          <el-checkbox label="フケ" />
          <el-checkbox label="ハリコシ" />
        </el-checkbox-group>
      </el-row>
      <div>2. お風呂上がりにドライヤーで髪や頭皮を乾かしていますか。</div>

      <div class="flex">
        <el-radio-group v-model="radio1">
          <el-radio label="1" size="large">はい</el-radio>
          <el-radio label="2" size="large">いいえ</el-radio>
        </el-radio-group>
      </div>

      <p>3. 現在薬剤使用の美容メニューをしていますか</p>
      <div class="flex">
        <el-radio-group v-model="radio2">
          <el-radio label="1" size="large">はい</el-radio>
          <el-radio label="2" size="large">いいえ</el-radio>
        </el-radio-group>
      </div>
      <p>4. 「３」ではいの方のみお答えください</p>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="カラー" />
        <el-checkbox label="パーマ" />
        <el-checkbox label="ストレート" />
        <el-checkbox label="その他" />
      </el-checkbox-group>
      <p>5. 今お使いのシャンプーやトリートメントを気に入っていますか</p>
      <div class="flex">
        <el-radio-group v-model="radio3">
          <el-radio label="1" size="large">はい</el-radio>
          <el-radio label="2" size="large">いいえ</el-radio>
        </el-radio-group>
      </div>
      <p>6. 今回オンラインカウンセリングを受けてみようと思った理由をお教えください</p>
      <el-row>
        <el-col :span="12">
          <el-input v-model="input1" placeholder="入力してください" />
        </el-col>
      </el-row>
      <p>7. オンラインカウンセリングで期待する事をお教えください</p>
      <el-row>
        <el-col :span="12">
          <el-input v-model="input2" placeholder="入力してください" />
        </el-col>
      </el-row>
      <el-row>
        <el-button @click.prevent="signup" color="#B9A273" class="login-button">新規登録</el-button>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.signup {
  margin: 0 auto;
  width: 812px;
  height: 756px;
}
.login-button {
  color: white;
  margin: 20px auto;
}
.email-form {
  margin: 10px 20px 10px 0;
}

.demo-input-size {
  justify-content: center;
  display: flex;
}
</style>
