<template>
  <div class="home-new">
    <div class="home-new-title">
      <h3>每周上新</h3>
    </div>
    <ul>
      <li
        v-for="item in goodsList"
        :key="item.spuId"
        @click="checkDetails(item.spuId)"
      >
        <img :src="item.mainImg" alt="" />
        <p>{{ item.spuName }}</p>
        <p><span>￥</span>{{ item.price.price }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
//先在setup中定义
const router = useRouter();
let goodsList = ref([]);
// 获取用户信息
const getGoodsInfo = () => {
  axios
    .get("/src/mock/goodsInfo.json")
    .then((res) => {
      goodsList.value = res.data.data.splice(0, 4);
      console.log(goodsList);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const checkDetails = (id) => {
  router.push({ path: "goodsDetail", query: { id: id } });
};
onMounted(() => {
  getGoodsInfo();
});
</script>
<style lang="less" scoped>
.home-new {
  .home-new-title {
    text-align: center;
    font-size: 16px;
    margin-top: 1.6rem;
    height: 50px;
    h3 {
      width: 50%;
      border-top: 2px solid #ccc;
      padding-top: 8px;
      margin: 0 auto;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1rem 0 0;
    background-color: #f9f9f9;
    li {
      width: 49.5%;
      img {
        width: 100%;
      }
      p {
        text-align: center;
        margin: 0.5rem 0;
        width: 100%;
        white-space: nowrap; //不换行
        overflow: hidden; //超出部分隐藏
        text-overflow: ellipsis; //文本溢出显示省略号
      }
      span {
        color: #ff8000;
        font-size: 12px;
      }
    }
  }
}
</style>
