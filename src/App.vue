<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const logout = () => {
  const poolData = {
    UserPoolId: import.meta.env.VITE_APP_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID,
  };
  const userPool = new CognitoUserPool(poolData);
  userPool.getCurrentUser().signOut();
  console.log("ログアウト成功");
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header"
        ><span class="header-text">Varma Web アプリ</span>
        <div>
          <el-dropdown class="nav-link">
            <span class="el-dropdown-link">
              Varma
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item><RouterLink to="/">Home</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/about">About</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/signin">SignIn</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/signup">Signup</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/passwordreset">Password Reset</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/passwordedit">Password Edit</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/signin" @click.native.prevent="logout">Log Out</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/contact">お問合せ先</RouterLink></el-dropdown-item>
                <el-dropdown-item><RouterLink to="/diagnosis">診断</RouterLink></el-dropdown-item>

              </el-dropdown-menu>

            </template>
          </el-dropdown>
        </div>
      </el-header>
    </el-container>
  </div>

  <div class="common-layout">
    <el-container>
      <el-footer class="footer">Copyright © 2022Varma Inc. All Rights Reserved.</el-footer>
    </el-container>
  </div>

  <RouterView />
</template>

<style scoped>
.header {
  height: 72px;
  background-color: #b9a273;
  font-family: Arial;
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.15000000596046448px;

  display: flex;
  align-items: center;
  letter-spacing: 0.15px;
}
.header-text {
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
}

.nav-link {
  text-align: right;
  color: #ffffff;
}

.footer {
  height: 36px;
  background-color: #909399;
  text-align: center;
  color: #ffffff;
  top: calc(100vh - 108px);
}
</style>
