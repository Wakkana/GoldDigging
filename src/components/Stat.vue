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
  display: flex;
  flex: row;
  list-style-type: none;
  overflow: hidden;
  margin-top: 15px;
  margin-bottom: -10px;
  padding: 0;
  align-items: center;
}
li {
  margin-right: 40px;
  font-size: 10px;
}
</style>
