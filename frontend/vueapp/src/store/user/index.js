import { register ,login} from "@/api"

export default {
  namespaced:true,
  state: {
    info:null
  },
  mutations: {
    updataUserInfo:(state,data)=>{
      state.info=data;
      localStorage.setItem('user',JSON.stringify(data));
    },
    initUserInfo:state=>{
      try {
        let data=JSON.parse(localStorage.getItem('user'));
        state.info=data;
      } catch (error) {
        
      }
    }
  },
  actions: {
    register:({},data)=>{
      return register(data)
    },
    login:async ({commit},data)=>{
      try {
       let res= await login(data);
       commit('updataUserInfo',{
         id:res.data.id,
         name:res.data.name,
         authorization:res.headers.authorization
       });
       return res;
        
      } catch (error) {
        throw error;
      }
    },
  },
  
}