<template>
  <div class="home-top">
    <h3>人气推荐</h3>
    <div class="content">
      <van-card
        v-for="item in goodsList"
        :key="item.spuId"
        :tag="item.tag"
        :price="item.retail_price"
        :origin-price="item.origin_price"
        :desc="item.skuName"
        :title="item.spuName"
        :thumb="item.mainImg"
        @click="checkDetails(item.spuId)"
      >
      </van-card>
    </div>
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
      goodsList.value = res.data.data.splice(4);
      goodsList.value.forEach((item, index) => {
        item.tag = "Top" + (index + 1);
        item.origin_price = item.price.price;
        item.retail_price = (item.price.price * 0.8).toFixed(2);
      });
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
.home-top {
  h3 {
    font-size: 22px;
    line-height: 30px;
    text-align: center;
    margin: 0.5rem 0;
  }
  .content {
    --van-tag-primary-color: #ff8000;
    --van-card-font-size: 16px;
    --van-card-background: #f9f9f9;
    background: var(--van-card-background);
    :deep(.van-card) {
      margin-top: 0;
      .van-card__title {
        padding: 10px 0 5px;
      }
      .van-card__price-currency {
        font-size: var(--van-card-font-size);
      }
    }
    &::after {
      content: "";
      display: block;
      height: 3rem;
    }
  }
}
</style>
