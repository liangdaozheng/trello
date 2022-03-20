<template>
  <div class="comment-pagination">
    <div class="pagination">
      <span v-if="firstShowPage > 1" @click="goToPage(1)">首页</span>
      <span v-if="page > 1" @click="goToPage(page - 1)">上一页</span>
      <span v-if="page - showpagesNumber > 0" @click="goToPage(page - showpagesNumber)">...</span>
      <span v-for="showPage of showPages" :key="showPage" :class="{'current-page':showPage === page}" @click="goToPage(showPage)">{{showPage}}</span>
      <span v-if="(page + showpagesNumber) < pages" @click="goToPage(page + showpagesNumber)">...</span>
      <span v-if="showPages[showPages.length - 1] != page" @click="goToPage(page + 1)">下一页</span>
      <span v-if="showPages[showPages.length - 1] > page" @click="goToPage(pages)">尾页</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'TPagination',
  props: {
    pages: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      showpagesNumber: 5
    }
  },
  computed: {
    showPages() {
      let showpagesNumber = this.showpagesNumber;
      let s = this.page;
      let e = this.page;
      let arr = [this.page];
      let p = showpagesNumber - 1;
      while(p > 0){
        if(p > 0 && s > 1){
          arr.unshift(--s);
          p--;
        };
        if(p > 0 && e < this.pages){
          arr.push(++e);
          p--;
        };
        if(s <= 1 && e >= this.pages) break;
      };
      return arr;

    },
    firstShowPage(){
      return this.showPages[0]
    },
    lastShowPage(){
      return this.showPages[this.showPages.length -1]
    }
  },
  methods: {
    goToPage(n) {
      n = Math.max(1, n);
      n = Math.min(this.pages, n);

      if (n !== this.page) {
          this.$emit('changePage', n);
      }
    }
  }

}
</script>