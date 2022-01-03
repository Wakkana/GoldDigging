<template>
<ul>
  <li><eye-two-tone />  {{watchs}}</li>
  <li><like-two-tone />  {{thumbups}}</li>
  <li><message-two-tone/>  {{comments}}</li>
</ul>
</template>

<script>
import {EyeTwoTone,LikeTwoTone,MessageTwoTone} from '@ant-design/icons-vue'
export default {
  name:"Stat",
  components: {
    EyeTwoTone,
    LikeTwoTone,
    MessageTwoTone
  },
  props:['watchs', 'thumbups', 'comments'],
  setup(){

  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
li {
  float: left;
  margin-right: 40px;
  font-size: 18px;
}
</style>
