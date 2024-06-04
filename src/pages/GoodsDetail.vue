<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in goods.album" :key="item.id">
        <img :src="item.img" height="414" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell>
        <template #title>
          <span class="goods-top">新品</span>
          <div class="goods-price">
            <span class="small">￥</span>
            {{ goods.retail_price }}
            <!-- <span class="spec">{{ goods.spec }}</span> -->
          </div>
          <div class="goods-title">
            <span class="small"> {{ goods.spuName }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell class="goods-express">
        <template #title>
          <van-col span="10">运费：10</van-col>
          <van-col span="14">剩余：{{ goods.stock }}</van-col>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <template #title>
          <span class="van-cell-text">发货 北京</span>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <span class="van-cell-text">保障 坏单包赔·假一赔四·极速退款</span>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <span class="van-cell-text">参数 品牌：手机 价格：1000-8000</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="goods-cell-title">—— 宝贝详情 ——</div>
    <div class="goods-description">
      <div class="">
        {{ goods.marketingText }}
      </div>
      <div class="">
        {{ goods.skuName }}
      </div>
    </div>
    <!-- 底部按钮-->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" />
      <van-action-bar-button type="warning" text="加入购物车" />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>
<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const route = useRoute();
let goodsList = ref([]);
let goodsId = null;
const goods = ref({});
const props = defineProps({
  id: String,
});
// 获取用户信息
const getGoodsInfo = () => {
  axios
    .get("/src/mock/goodsInfo.json")
    .then((res) => {
      goodsList.value = res.data.data;
      goodsList.value.forEach((item) => {
        if (item.spuId == goodsId) {
          item.origin_price = item.price.price;
          item.retail_price = (item.price.price * 0.8).toFixed(2);
          item["album"] = [];
          item["album"].push({
            id: 1,
            img: item.mainImg,
          });
          item.stock = Math.floor(Math.random() * 20);
          goods.value = item;
          console.log(goods.value);
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
onMounted(async () => {
  goodsId = await route.query.id;
  await getGoodsInfo();
});
</script>

<style lang="less" scoped>
.goods {
  text-align: center;
  padding-bottom: 50px;
  .goods-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  .goods-top {
    display: block;
    width: 30px;
    padding: 0 5px;
    border-radius: 10px;
    color: #fff;
    background-color: #f44;
  }
  .goods-title {
    text-align: left;
    .small {
      font-size: 14px;
    }
  }
  .goods-price {
    color: #f44;
    text-align: left;
    font-size: 20px;
    .small {
      font-size: 12px;
    }
    .spec {
      font-size: 12px;
      color: #999;
    }
  }
  .goods-cell-title {
    padding: 20px 0;
  }
  .goods-description {
    width: 95%;
    margin: 0 auto;
    // padding-bottom: 20px;
    font-size: 14px;
    text-align: left;
    :deep(img) {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
    :deep(.van-col) {
      float: left;
    }
    :deep(.van-col--14) {
      width: 58%;
    }
  }
  .goods-cell-group {
    :deep(.van-cell__title span) {
      float: left;
    }
  }
  :deep(.van-cell:after) {
    border: none;
  }
}
.goods-not-found {
  padding-top: 48px;
  text-align: center;
  font-size: 28px;
}
</style>
