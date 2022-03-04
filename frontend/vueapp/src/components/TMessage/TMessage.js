import Vue from 'vue'
import TMessage from './TMessage.vue'

const TMessageClass=Vue.extend(TMessage);


/**
 * 工厂函数
 * 创建一个TMessage 组件对象
 * 管理TMessage队列
 */
let instances=[];
function Message(data){
  data= data || {};
  if(typeof data === 'string'){
    data={
      message:data
    };
  }
  data.onClose=function(){
    // console.log(111);
    Message.close(instance);
  }
  let instance =new TMessageClass({data});
  instance.$mount();
  document.body.appendChild(instance.$el);
  let offset=data.offset || 20;
  let offsetTop = offset;
  instances.forEach(item=>{
    offsetTop+=item.$el.offsetHeight+offset;
  });
  instance.$el.style.top=offsetTop + 'px';
  instances.push(instance);
}
['info','success','error','warning'].forEach(type=>{
  Message[type]=function (data){
    if(typeof data === 'string'){
      data = {
        message:data
      }
    };
    return Message({
      ...data,
      type
    })
  }
})
Message.close=function(instance){
  let removeHeight = instance.$el.offsetHeight + instance.offset;
  let index = instances.findIndex(item=>item===instance);
  instances = instances.filter(item=>item !== instance);
  for (let i = index; i < instances.length; i++) {
    const element = instances[i];
    element.$el.style.top=parseFloat(element.$el.style.top) - removeHeight + 'px'
  }
}
export default Message;