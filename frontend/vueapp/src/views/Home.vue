<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>

    <main>
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <li class="board-item" 
        v-for="(board,index) of boards"
         :key="index"
        >
          <span class="title">{{board.name}}</span>
        </li>
        
        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="创建新看板"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import THeader from '@/components/THeader.vue'
import {mapState} from 'vuex'
export default {
  name:'Home',
  components: {
    THeader,
  },
  computed:{
    ...mapState('board',{
      boards:state=>state.boards
    })
  },
  created () {
    if(this.boards === null){
      this.$store.dispatch('board/getBoards');
    };
  },
}
</script>