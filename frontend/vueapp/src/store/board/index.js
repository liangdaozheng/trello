
import * as api from '@/api';

export default {
  namespaced:true,
  state:{
    // null
    boards:null,
  },
  mutations:{
    updateBoards:(state,data)=>{
      state.boards=data;
    },
    addBoard:(state,data)=>{
      if(state.boards === null){
        state.boards = [];
      };
      state.boards = [...state.boards,data];
    }
  },
  actions:{
    getBoards:async ({commit})=>{
      try {
        let rs = await api.getBoards();
        commit('updateBoards',rs.data)
        return rs
      } catch (error) {
        throw error;
      }
    },
    postBoard: async  ({commit},data)=>{
      try {
        let rs = await api.postBoard(data);
        commit('addBoard',rs.data);
        return rs
      } catch (error) {
        throw error;
      }
    }
  }
}