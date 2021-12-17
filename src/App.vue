<template>
  <main-ref/>
  <sub-ref/>
  <my-list/>
</template>

<script>
import MainRef from './components/MainRef.vue'
import SubRef from './components/SubRef.vue'
import MyList from './components/MyList.vue'


export default {
  name: 'App',
  components: {
    MainRef,
    SubRef,
    MyList
  }
}
</script>

<style>

</style>
