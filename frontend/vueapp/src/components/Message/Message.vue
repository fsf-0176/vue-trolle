<template>
  <transition name="message-fade" v-if="!closed">
    <div :class="['message', 'message-'+type , center?'is-center':'']" :style="{top:offset+'px'}">
      <p class="message-content">提示信息：{{message}}</p>
      <i class="icon icon-close"></i>
    </div>
  </transition>
</template>


<script>
export default {
  name: "Message",
  data() {
    return {
      message: "这是默认信息",
      type: "info",
      center: "",
      offset: 20,
      closed:false,
      duration:1000,
      timer:null,
      onClose:null
    }
  },
  mounted(){
      this.timer = setTimeout(( )=>{
          if(!this.closed){
              this.close();
          }
      },this.duration)
  },
  methods:{
      close(){
          this.closed = !this.closed
          if(typeof this.onClose === 'function'){
            this.onClose()
          }
      }
  }
};
</script>