<template>
  <a-list
    header="稍后再看"
    class="watch-later"
    :loading="loading"
    item-layout="horizontal"
    :rowKey="(item, index)=>index"
    :data-source="articles"
  >
    <template #loadMore>
      <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingmore" />
        <a-button v-else @click="loadMore()">loading more</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a>edit</a>
          <a>more</a>
        </template>
        <a-list-item-meta
          description="??"
        >
          <template #title>
            <a href="https://www.antdv.com/" class="later-title">{{ item.article_info.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import { inject, onBeforeMount, ref } from 'vue';

export default({
  setup() {
    let info = inject('info');
    let articles = ref([]);
    let curr = ref(0);
    let loading = ref(false);
    let loadingmore = ref(false);
    onBeforeMount(()=> {
      console.log(info.watchlater.length)
      for (let i = 0; i < min(10, info.watchlater.length); i++) {
        articles.value.push(info.watchlater[i]);
        curr.value++;
      }
    }) 
    function min(a, b) {
      return a > b ? b : a;
    }
    function loadMore() {
      loadingmore = true;
      for (let i = curr.value; i < min(10, info.watchlater.length); i++) {
        articles.value.push(info.watchlater[i]);
        curr.value++;
      }
      if (curr.value === info.watchlater.length) {
        loading = false;
      }
      loadingmore = false;
      console.log(articles.value);
    }
    return {
      articles,
      loading,
      loadingmore,
      loadMore,
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
