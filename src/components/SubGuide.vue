<template>
  <a-anchor class="anchor" :offsetTop="200"> 
    <a-anchor-link href="#article-section" title="文章" />
    <a-anchor-link href="#comment-section" title="评论" />
  </a-anchor>
</template>




<script>
export default {
  name:"SubGuide",
}
</script>

<style scoped>
.anchor {
  padding-top: 20%;
  margin-left: -20px;
  order: 0;
  flex: 1 2 10%;
}

.ant-anchor-wrapper {
  color: rgba(0,0,0,0.1);
}
</style>