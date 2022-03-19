
import {getBoards,} from '@/api';

export default {
  namespaced:true,
  state:{
    // null
    boards:null,
  },
  mutations:{
    updateBoards:(state,data)=>{
      state.boards=data;
    }
  },
  actions:{
    getBoards:async ({commit})=>{
      try {
        let rs = await getBoards();
        commit('updateBoards',rs.data)
        return rs
      } catch (error) {
        throw error;
      }
    } 
  }
}