
import * as api from '@/api';

export default {
  namespaced:true,
  state:{
    // null
    lists:[],
  },
  getters:{
    getLists:({lists})=>boardId=>lists.filter(list=>list.boardId === boardId),
    getList:({lists})=>listId=>lists.find(list=>list.id === listId)
  },
  mutations:{
    updateLists:(state,datas)=>{
      state.lists=[...state.lists,...datas];
    },
    addList:(state,data)=>{
      state.lists=[...state.lists,data];
    },
    updateList:(state,data)=>{
      state.lists=state.lists.map(list =>{
        if(list.id === data.id){
          return {...list,...data}
        };
        return list
      });
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
    },
    editList: async ({commit},data)=>{
      try {
        let rs = await api.putList(data);
        // console.log(rs.data);
        commit('updateList',data);
        return rs;
      } catch (error) {
        throw error;
      }
    },
  }
}