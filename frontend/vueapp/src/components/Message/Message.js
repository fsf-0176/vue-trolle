import Vue from "vue";
import Message from './Message.vue'


const MessageClass = Vue.extend(Message)

/**
 * 
 * 工厂函数
 * 创建一个message组件对象
 * 管理message组件对象队列
 * 
 */
let instances = []
function msg (data){
   
    data = data || {}

    if(typeof data === 'string'){
        data = {
            message:data
        }
    }

    data.onClose = function(){
        msg.close(instance)
    }

    let instance = new MessageClass({
        data
    })
    
    instance.$mount();
    document.body.appendChild(instance.$el)
    let offset = data.offset || 20;
    let offsetTop = offset
    instances.forEach (item=>{
        offsetTop += item.$el.offsetHeight + offset
    })
    instance.$el.style.top = offsetTop + 'px'
    instances.push(instance)
}
['info','success','error','warning'].forEach(type=>{
    msg[type] = function(data){
        if(typeof data === 'string'){
            data = {
                message:data
            }
        }
        data.type = type
        return  msg(data)
    }  
})
 

msg.close = function(instance){
    /**
     * 
     * 获取当前这个instance的高度
     * 把这个instance后面的所有实例的top高度减去这个高度，在减去偏移
     * 
     */
    let removeHeight = instance.$el.offsetHeight + instance.offset;
    let index = instances.findIndex(item=>item===instance);
    instances = instances.filter(item=>item !== instance)

    for (let i = index; i < instances.length; i++) {
        instances[i].$el.style.top = parseFloat(instances[i].$el.style.top) - removeHeight + 'px'
        
    }

}

export default msg;