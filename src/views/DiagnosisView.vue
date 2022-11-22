<script setup lang="ts">
import { ref } from "vue";
const input = ref("");
</script>

<template>
  <ul>
    <li>
      <h1>Varma担当者</h1>
      <p class="date">2022/07/16 10:00</p>
      <p class="text">
        担当のXXです。 この度オンライン診断の申し込みありがとうございます。 診断にあたり、決済が必要となりますのでマイページから決済を行ってください。
        決済が完了しましたら改めてご連絡の程よろしくお願いします。
      </p>
    </li>
  </ul>

  <div class="form">
    <el-row>
      <el-col :span="4">
        <el-button class="button-round" color="#B9A273" >+</el-button>
      </el-col>
      <el-col :span="12">
        <el-input v-model="input" placeholder="入力してください" />
      </el-col>
      <el-col :span="6">
        <el-button class="button" color="#B9A273">送信</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
h1 {
  font-family: Arial;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
}
.date {
  font-family: Arial;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
  color: #909399;
}
ul {
  list-style: none;
}

.text {
  font-family: Arial;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
}
.button {
  color: white;
  margin-left: 20px;
}
.button-round {
  color: white;
  margin-left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.form {
  margin: 20px;
}
</style>
