<template>
  <a-list
    header="稍后再看"
    class="watch-later"
    item-layout="horizontal"
    :rowKey="(item, index)=>index"
    :data-source="articles"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a @click="remove(item.article_id)">删除</a>
        </template>
        <a-list-item-meta>
          <template #title>
            <router-link :to="`/articles/${item.article_id}`" class="later-title">{{ item.article_info.title }}</router-link>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import { inject, watch,  ref } from 'vue';

export default({
  setup() {
    let info = inject('info');
    let articles = ref([]);
    watch(()=>info.watchlater.length, ()=> {
      articles.value.length = 0;
      articles.value.push(...info.watchlater)
    })

    function remove(val) {
      for (let i = 0; i < info.watchlater.length; i++) {
        if (info.watchlater[i].article_id == val) {
          info.watchlater.splice(i, 1);
        }
      }
      for (let i = 0; i < articles.value.length; i++) {
        if (articles.value[i].article_id == val) {
          articles.value.splice(i, 1);
        }
      }
    }
    return {
      articles,
      remove,
    };
  },
});
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}

.ant-list-split  {
  text-align: center;
  font-size: 10px;
}

.later-title {
  font-size: 10px;
}
.ant-list-item-meta {
  padding: 10px;
}
.ant-list-split {
  height: 2%;
}
</style>
