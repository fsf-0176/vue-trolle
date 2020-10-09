<template>
  <div class="popup-container">
    <div @click="open">
      <slot></slot>
    </div>
    <div class="popup" v-show="isShow" ref="popup">
      <div class="popup-header">
        <span class="popup-title">{{title}}</span>
        <a class="popup-header-close" @click="close" ref="colse">
          <i class="icon icon-close"></i>
        </a>
      </div>

      <div class="popup-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TPopup",
  data() {
    return {
      isShow: false,
    };
  },
  props:{
	  title:{
		  type:String,
		  default:'菜单'
	  }
  },
  methods: {
    open() {
      this.isShow = !this.isShow;
	  let $popup = this.$refs.popup;
	  window.addEventListener('click',this.close)
      this.$nextTick(() => {
		let left = 0;
        $popup.style.left = left + "px";
        let $popupRect = $popup.getBoundingClientRect();
        if ($popupRect.right > window.innerWidth) {
          left = -$popupRect.width + this.$el.offsetWidth;
        }
        $popup.style.left = left + "px";
	  });
	  this.$emit('open')
    },
    close(e) {
		if(!e || e.path.includes(this.$refs.colse) || !e.path.includes(this.$el) ){
			this.isShow = false;
			this.$emit('close');
			window.removeEventListener('click',this.colse)
		};
    },
  },
};
</script>