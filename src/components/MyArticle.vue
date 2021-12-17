<template>
  <a href="www.baidu.com"> {{title}} + {{date}} </a><br/>
</template>

<script>
export default {
  name: "Article",
  props: ['title', 'date']
}
</script>

<style>

</style>