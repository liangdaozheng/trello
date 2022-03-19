
import * as api from '@/api';

export default {
  namespaced:true,
  state:{
    // null
    lists:[],
  },
  getters:{
    getLists:({lists})=>boardId=>lists.filter(list=>list.boardId === boardId)
  },
  mutations:{
    updateLists:(state,datas)=>{
      state.lists=[...state.lists,...datas];
    },
    addList:(state,datas)=>{
      state.lists=[...state.lists,datas];
    },
  },
  actions:{
    getLists:async ({commit},boardId)=>{
      try {
        let rs = await api.getLists(boardId);
        commit('updateLists',rs.data);
        return rs;
      } catch (error) {
        throw error;
      }
    },
    postList:async ({commit},data)=>{
      try {
        let rs = await api.postList(data);
        commit('addList',rs.data);
        return rs;
      } catch (error) {
        throw error;
      }
    }
  }
}