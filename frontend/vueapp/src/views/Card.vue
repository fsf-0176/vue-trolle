<template>
   <!--遮罩层-->
        <div class="window-overlay" style="display: block" v-if="card && list">
            <!--弹出式窗口-->
            <div class="popup">

                <div class="popup-header">
                    <div class="popup-title">
                        <div class="popup-title-icon">
                            <span class="icon icon-card"></span>
                        </div>
                        <div class="popup-title-text">
                            <textarea class="form-field-input" @blur="editCardName" v-model="card.name"></textarea>
                        </div>
                        <div class="popup-title-detail">
                            在列表 {{list.name}} 中
                        </div>
                    </div>
                    <a class="popup-header-close">
                        <i class="icon icon-close" @click="$router.back()"></i>
                    </a>
                </div>

                <div class="popup-content">

                    <!--描述-->
                    <div class="window-module">

                        <div class="title">
                            <div class="title-icon">
                                <span class="icon icon-description"></span>
                            </div>
                            <div class="title-text">
                                <h3>描述</h3>
                                <button class="btn btn-edit">编辑</button>
                            </div>
                        </div>

                        <p class="description">
                            <textarea class="form-field-input" v-model="card.description" @blur="editCardDescription"></textarea>
                        </p>

                    </div>

                    <!--附件-->
                    <div class="window-module">

                        <div class="title">
                            <div class="title-icon">
                                <i class="icon icon-attachment"></i>
                            </div>
                            <div class="title-text">
                                <h3>附件</h3>
                               
                            </div>
                        </div>

                        <ul class="attachments" v-if="Array.isArray(card.attachments)">
                            <li class="attachment" v-for="attachment of card.attachments" :key="attachment.id">
                                <div class="attachment-thumbnail" :style="`background-image: url(${server.staticPath}${attachment.path})`"></div>
                                <p class="attachment-detail">
                                    <span class="attachment-thumbnail-name"><strong>icon_nav_button.png</strong></span>
                                    <span class="attachment-thumbnail-descriptions">
                                    <span class="datetime">2019年12月29日晚上11点04分</span>
                                    <span> - </span>
                                    <u @click="removeAttachment(attachment.id)">删除</u>
                                </span>
                                    <span class="attachment-thumbnail-operation">
                                    <i class="icon icon-card-cover"></i>
                                    <u v-if="attachment.isCover" @click="removeCover(attachment.id)">移除封面</u>
                                    <u v-else @click="setCover(attachment.id)">设为封面</u>
                                </span>
                                </p>
                            </li>
                            <!-- <li class="attachment">
                                <div class="attachment-thumbnail" :style="`background-image: url(${server.staticPath}/public/attachments/logo.png)`"></div>
                                <p class="attachment-detail">
                                    <span class="attachment-thumbnail-name"><strong>icon_nav_button.png</strong></span>
                                    <span class="attachment-thumbnail-descriptions">
                                    <span class="datetime">{{attachment.createdAt|dateTime}}</span>
                                    <span> - </span>
                                    <u>删除</u>
                                </span>
                                    <span class="attachment-thumbnail-operation">
                                    <i class="icon icon-card-cover"></i>
                                    <u>移除封面</u>
                                </span>
                                </p>
                            </li> -->
                        </ul>

                        <div>
                            <button class="btn btn-edit" @click="$refs.attachment.click()">添加附件</button>
                            <input type="file" @change="uploadAttament" ref="attachment" style="display:none">
                        </div>

                    </div>

                    <!--活动-->
                    <div class="window-module">

                        <div class="title">
                            <div class="title-icon">
                                <i class="icon icon-activity"></i>
                            </div>
                            <div class="title-text">
                                <h3>评论</h3>
                            </div>
                        </div>

                        <t-comment :card-id="card.id"></t-comment>
                    </div>

                </div>
            </div>
        </div>
</template>

<script>
import dateTime from "@/filters/dateTime";
import TComment from "@/components/TComment.vue";
export default {
    name:"Card",
    filters:{
        dateTime
    },
    components:{
        TComment
    },
    computed:{
        server(){
            return this.$store.state.server
        },
        card(){
            return this.$store.getters['card/getCard'](this.$route.params.cardId)
        },
        list(){
            return this.$store.getters['list/getList'](this.$route.params.listId)
        }
    },
    methods:{
        editCardName(e){
            let {value,innerHTML} = e.target;
            if(value !== innerHTML) {
                console.log(this.card);
                try {
                    this.$store.dispatch('card/editCard',{
                        id:this.card.id,
                        name:value
                    })
                    this.$message.success('卡片名称修改成功')
                } catch (e) {
                    
                }
            }
        },
        editCardDescription(e){
             let {value,innerHTML} = e.target;
            if(value !== innerHTML) {
                try {
                    this.$store.dispatch('card/editCard',{
                        id:this.card.id,
                        description:value
                    })
                    this.$message.success('卡片简介修改成功')
                } catch (e) {
                    
                }
            }
        },
        // 上传附件
        uploadAttament(){   
            let file = this.$refs.attachment.files[0]
            try {
                this.$store.dispatch('card/uploadAttachment',{
                    boardListCardId:this.card.id,
                    file
                })
                this.$refs.attachment.value = ''
                this.$message.success('上传成功')
            } catch (e) {
                
            }
        },
        // 设置封面
        setCover(id){
             try {
                this.$store.dispatch('card/setCover',{
                    cardId:this.card.id,
                    id
                })
                this.$message.success('封面设置成功')
            } catch (e) {
                
            }
        },
        // 移除封面
        removeCover(id){
        try {
                this.$store.dispatch('card/removeCover',{
                    cardId:this.card.id,
                    id
                })
                this.$message.success('封面移除成功')
            } catch (e) {
                
            }
        },
        // 删除附件
        removeAttachment(id){
        try {
                this.$store.dispatch('card/removeAttachment',{
                    cardId:this.card.id,
                    id
                })
                this.$message.success('附件删除成功')
            } catch (e) {
                
            }
        }
    }
}
</script>