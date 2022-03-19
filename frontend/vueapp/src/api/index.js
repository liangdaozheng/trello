import axios from "axios";
import TMessage from '@/components/TMessage/TMessage.js'
import board from "../store/board";
axios.defaults.baseURL=process.env.VUE_APP_SERVER_API_PATH;

axios.interceptors.request.use(configs=>{
  try {
    let data = JSON.parse(localStorage.getItem('user'));
    if(data.authorization){
      configs.headers.common.authorization=data.authorization;
    };
  } catch (error) {
    
  }
  return configs;
});
axios.interceptors.response.use(response=>{
  return response;
},error=>{
  let {message,errorDatails} = error.response.data;
  if(errorDatails){
    message += ' : ' + errorDatails;
  }
  TMessage.error(message);
  throw error;
})
// 注册
export const register= data=>{
  return axios({
    method:"post",
    url:'/user/register',
    data,
  })
};
// 登录
export const login= data=>{
  return axios({
    method:"post",
    url:'/user/login',
    data,
  })
};

// 面板
export const getBoards = () =>{
  return axios({
    method:"get",
    url:'/board',
  })
}
export const postBoard = (data) =>{
  return axios({
    method:"post",
    url:'/board',
    data,
  })
}
export const getBoard = (id)=>{
  return axios({
    method:"get",
    url:'/board/'+id,
  })
}
// 获取列表
 export const getLists= (boardId)=>{
  return axios({
    method:"get",
    url:'/list',
    params:{
      boardId
    }
  })
 }
//  添加一个新列表
export const postList = (data) =>{
  return axios({
    method:"post",
    url:'/list',
    data,
  })
}
