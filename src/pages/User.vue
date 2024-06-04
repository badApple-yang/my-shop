<template>
  <!-- 已登录 -->
  <van-row class="user-info">
    <van-image
      v-if="userInfo.avatar"
      round
      width="100"
      height="100"
      :src="avatar"
    />
    <van-image v-else round width="100" height="100" :src="avatar_default" />
    <view class="user-info-wrapper">
      <span class="user-info-name">{{ userInfo.username }}</span>
      <span class="user-info-id">{{ userInfo.id }}</span>
    </view>
  </van-row>
  <van-row class="user-links">
    <van-col span="6">
      <van-icon name="pending-payment" />
      待付款
    </van-col>
    <van-col span="6">
      <van-icon name="records" :badge="userInfo.isLogin ? '7' : ''" />
      待收货
    </van-col>
    <van-col span="6">
      <van-icon name="tosend" :badge="userInfo.isLogin ? '40' : ''" />
      待评价
    </van-col>
    <van-col span="6">
      <van-icon name="logistics" :badge="userInfo.isLogin ? '1' : ''" />
      退换/售后
    </van-col>
  </van-row>
  <van-cell-group class="user-group my-title">
    <van-cell icon="records" title="全部订单" is-link />
  </van-cell-group>
  <van-cell-group class="my-title">
    <van-cell icon="points" title="我的积分" is-link />
    <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
    <van-cell icon="gift-o" title="我的红包" is-link />
  </van-cell-group>
</template>
<script setup>
import avatar_default from "../assets/images/avatar_default.png";
import avatar from "../assets/images/avatar.jpg";
import axios from "axios";

import { onMounted, ref } from "vue";
let userInfo = ref({});

// 获取用户信息
const getUserInfo = () => {
  axios
    .get("/src/mock/userInfo.json")
    .then((res) => {
      userInfo.value = res.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
onMounted(() => {
  getUserInfo();
});
</script>
<style lang="less" scoped>
.user-info {
  padding: 15px;
  background: url(../assets/images/user_head_bg.png) no-repeat;
  background-size: 100%;
}
.user-info button {
  margin: 40px 0 0 10px;
}
.user-info-wrapper {
  padding: 0px 0 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}
.user-info-name {
  display: inline-block;
  color: #fff;
  font-size: 20px;
}
.user-info-id {
  display: inline-block;
  color: #fff;
  font-size: 16px;
}
:deep(.van-badge--top-right) {
  top: 4px;
  right: 35px;
  transform: translate(50%, -50%);
}
.user {
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
