<template>
  <div class="main">
    <div class="a">
      <img src="../../assets/svg/404.svg" alt=""/>
      <div class="d1">404</div>
      <div class="d2">Sorry, the page you visited does not exist.</div>
      <router-link to="/">
        <el-button style="margin: 30px 118px" type="primary">返 回 首 页</el-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.main {
  background: #f5f6f7;
}

.a{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-13%, -50%);
}

.main img {
  width: 300px;
  margin: auto;
}

.d1{
  font-size: 25px;
  text-align: center;
  padding-top: 30px;
}

.d2{
  padding-top: 15px;
  font-size: 15px;
  color: #8c939d;
  letter-spacing: 1px;
  text-align: center;
  font-style: oblique;
}
</style>
