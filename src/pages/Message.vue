<template>
  <van-cell-group v-for="item in lists" :key="item">
    <van-cell
      center
      :icon="item.img"
      :title="item.title"
      :value="item.value"
      :label="item.label"
    />
  </van-cell-group>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
let lists = ref([]);

// 获取用户信息
const getMessageList = () => {
  axios
    .get("/src/mock/messageList.json")
    .then((res) => {
      lists.value = res.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
onMounted(() => {
  getMessageList();
});
</script>
<style lang="less" scoped>
:deep(.van-cell) {
  .van-cell__left-icon {
    width: 40px;
    height: 40px;
    .van-icon__image {
      width: 100%;
      height: 100%;
    }
  }
  .van-cell__title {
    .van-cell__label {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 165px;
    }
  }
}
</style>
