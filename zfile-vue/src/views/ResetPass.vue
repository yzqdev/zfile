<template>
<div class="reset-pass">
 <article>
   <el-button type="danger" @click="confirmReset">是否重置密码</el-button>
    <p></p>
   <el-card>
     默认账户为:admin
     默认密码为:123456
   </el-card>
 </article>
</div>
</template>

<script setup lang="ts">
 import {resetPassApi} from "../utils/apis";

 async function confirmReset(){
  await resetPassApi()
 }
</script>

<style lang="scss" scoped>
.reset-pass{
  height: 100%;
  display: flex;
  align-items:center;
  justify-content:center;
}
</style>
