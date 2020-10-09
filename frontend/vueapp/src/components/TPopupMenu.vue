<template>
  <ul class="popup-menu-list">
    <li 
        :class="{separator:item.separator}"
        v-for="(item, index) of items" 
        :key="index"
        @click="command(item.command)"
        >
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TPopupMenu",
  props: {
    items: {
      type: Array,
      default() {
        // {name:'',command:'logout',separator:true}
        return [];
      },
    },
  },
  methods:{
      command(command){
          this.$emit('command',command)
      }
  }
};
</script>