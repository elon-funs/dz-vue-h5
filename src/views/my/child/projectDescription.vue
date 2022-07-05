<template>
  <div class="page">
    <img class="img" v-for="item in 7" :key="item" :src="require(`@/assets/imgs/my/${item}.jpg`)" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.page {
  width: 100%;
}

.img {
  width: 100%;
  height: auto;
}
</style>
