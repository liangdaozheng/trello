<template>
  <div id="board">
    <!--头部-->
    <t-header></t-header>

    <!--正文-->
    <main v-if="board">
      <h2>
        {{board.name}}
        <!-- <span class="btn btn-icon"> 邀请 </span> -->
      </h2>

      <!--面板容器-->
      <div class="board">
        <!--面板列表容器-->
        <t-list
        v-for="list of lists"
        :key="list.id"
        :data="list"
        ></t-list>
        <!--无内容列表容器-->
        <div class="list-wrap no-content" :class="{'list-adding':listAdding}">
          <div class="list-add" @click="showListAdding">
            <span class="icon icon-add"></span>
            <span>添加另一个列表</span>
          </div>

          <div class="list">
            <div class="list-cards">
              <div class="list-card-add-form">
                <input
                  ref="newListName"
                  class="form-field-input"
                  placeholder="为这张卡片添加标题……"
                />
              </div>
            </div>

            <div class="list-footer">
              <div class="list-add-confirm">
                <button class="btn btn-success" @click="addNewList">添加列表</button>
                <span class="icon icon-close" @click="hideListAdding"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!--弹窗，可用于对话框、弹出式菜单等-->
    <!--弹出式菜单-->
    

    <router-view></router-view>
    
  </div>
</template>
<script>
import THeader from '@/components/THeader'
import TList from '@/components/TList'
export default {
  name:'Board',
  components: {
    THeader,
    TList
  },
  data() {
    return {
      listAdding: false
    }
  },
  computed: {
    board() {
      return this.$store.getters['board/getBoard'](Number(this.$route.params.id))
    },
    lists() {
      return this.$store.getters['list/getLists'](Number(this.$route.params.id))
    }
  },
  created () {
    if(!this.board){
      this.$store.dispatch('board/getBoard',this.$route.params.id)
    };
    if(!this.lists.length){
      this.$store.dispatch('list/getLists',this.$route.params.id)
    };
  },
  methods: {
    // 显示添加面板
    showListAdding() {
      this.listAdding=true;
      this.$nextTick(()=>{
        this.$refs.newListName.focus()
      })
    },
    hideListAdding(){
      this.listAdding=false;
    },
    addNewList(){
      var val=this.$refs.newListName.value;
      if(val.trim() === ''){
        this.$refs.newListName.focus();
      }else{
        // console.log(val);
       try {
         let rs= this.$store.dispatch('list/postList',{
           name:val,
           boardId:this.board.id
           });
         this.$message.success('提交成功');
         this.$refs.newListName.value='';
         this.listAdding=true;
       } catch (error) {
         this.$refs.newListName.focus();
       }
      }
    }
  },
}
</script>