<template>
  <van-tabbar route fixed placeholder border>
    <van-tabbar-item replace :to="{ name: 'home' }" icon="home-o"
      >首页</van-tabbar-item
    >
    <van-tabbar-item replace :to="{ name: 'message' }" icon="chat-o" badge="4"
      >消息</van-tabbar-item
    >
    <van-tabbar-item replace :to="{ name: 'user' }" icon="user-o"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<style scoped>
.van-tabbar-item {
  --van-tabbar-item-active-color: #ff8000;
}
</style>
