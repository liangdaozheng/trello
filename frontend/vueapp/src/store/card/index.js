
import * as api from '@/api';

export default {
  namespaced:true,
  state:{
    cards:[]
  },
  getters:{
    getCards:({cards})=>boardListId=>cards.filter(card=>card.boardListId === boardListId)
  },
  mutations:{
    updateCards:(state,datas)=>{
      state.cards=[...state.cards,...datas];
    },
    addList:(state,data)=>{
      state.cards=[...state.cards,data];
    },
    updateList:(state,data)=>{
      state.cards=state.cards.map(list =>{
        if(list.id === data.id){
          return data
        };
        return list
      });
    },
  },
  actions:{
    getCards:async ({commit},boardListId)=>{
      try {
        let rs = await api.getCards(boardListId);
        commit('updateCards',rs.data);
        return rs;
      } catch (error) {
        throw error;
      }
    },
  }
}