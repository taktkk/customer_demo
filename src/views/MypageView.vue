<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { ref } from "vue";

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};
</script>

<template>
  <el-row :gutter="20">
    <el-col :offset="1" :span="6.5"><p style="background-color: #f4f4f5">決済がまだの場合はこちらで行ってください。</p></el-col>
    <el-col :span="5" :offset="10"><el-button color="#B9A273" class="login-button">ユーザー編集</el-button></el-col>
  </el-row>

  <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="2021/08/01【重要】新型コロナウイルス感染 予防対策への取組みについて" name="1">
        <div>日頃より当店をご愛顧いただき、誠にありがとうございます。</div>
        <div>
          髪質改善専門ヘアサロン
          varma（ヴェルマ）では、日頃からサロン内の衛生管理を徹底しておりますが、昨今の新型コロナウイルスの感染拡大に伴い、お客様の安心・安全のため、感染症予防対策や衛生管理をより一層強化しております。予防対策として下記の取り組みを実施していることをお知らせいたします。
        </div>
      </el-collapse-item>
      <el-collapse-item title="2022/04/01【重要】新型コロナウイルス感染 予防対策への取組みについて" name="2">
        <div>日頃より当店をご愛顧いただき、誠にありがとうございます。</div>
        <div>
          髪質改善専門ヘアサロン
          varma（ヴェルマ）では、日頃からサロン内の衛生管理を徹底しておりますが、昨今の新型コロナウイルスの感染拡大に伴い、お客様の安心・安全のため、感染症予防対策や衛生管理をより一層強化しております。予防対策として下記の取り組みを実施していることをお知らせいたします。
        </div>
      </el-collapse-item>
      <el-collapse-item title="2021/12/01【重要】新型コロナウイルス感染 予防対策への取組みについて" name="3">
        <div>日頃より当店をご愛顧いただき、誠にありがとうございます。</div>
        <div>
          髪質改善専門ヘアサロン
          varma（ヴェルマ）では、日頃からサロン内の衛生管理を徹底しておりますが、昨今の新型コロナウイルスの感染拡大に伴い、お客様の安心・安全のため、感染症予防対策や衛生管理をより一層強化しております。予防対策として下記の取り組みを実施していることをお知らせいたします。
        </div>
      </el-collapse-item>
      <el-collapse-item title="2021/08/01【重要】新型コロナウイルス感染 予防対策への取組みについて" name="4">
        <div>日頃より当店をご愛顧いただき、誠にありがとうございます。</div>
        <div>
          髪質改善専門ヘアサロン
          varma（ヴェルマ）では、日頃からサロン内の衛生管理を徹底しておりますが、昨今の新型コロナウイルスの感染拡大に伴い、お客様の安心・安全のため、感染症予防対策や衛生管理をより一層強化しております。予防対策として下記の取り組みを実施していることをお知らせいたします。
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.login-button {
  color: white;
}
.demo-collapse {
  width: 600px;
  margin: 30px auto;
}
</style>
