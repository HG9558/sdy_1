<template>
    <div v-if="isLogin && show" class="friend-recom-dialog" ref="item" style='left:60px;top:220px'>
        <div class="close el-icon-close" @click="show = false"></div>
        <div class="friend-recom_cont" @click="hdclick" @mousedown="hdms($event,1)" @mouseup="hdms($event,2)">
            <img src="./img/friend-recomm.png" alt="">
        </div>
    </div>
</template>
<script> 
import { mapState } from "vuex";

export default {
    name: 'friendRecom',
    data(){
        return {
            show: false
        }
    },
    computed: {
        ...mapState({
            isLogin: (state) => state.user.token
        })
    },
    watch: {
        show : {
            handler: function(val){
                if(val){
                    window.addEventListener('mousemove', this.hdms) 
                } else {
                    window.removeEventListener('mousemove', this.hdms) 
                }
            },  
            immediate: true
        }
    },
    methods: {
        hdms(e, tr) {
            const { style } =  this.$refs.item
            if(tr === 1) {
                this.trr = 1
                this.x = parseInt(style.left) 
                this.y = parseInt(style.top) 
                this.mx = e.clientX
                this.my = e.clientY
            } else if(!tr && this.trr){
                this.mv = 1
                style.left = this.x + e.clientX - this.mx + 'px'
                style.top = this.y + e.clientY - this.my + 'px'
            } else if(tr===2) this.trr = 0
        },
        hdclick() {
            if(this.mv) this.mv = 0
            else this.$router.push('/profile/recommended')
        },
        async getFriendRebate (){
            if(!this.isLogin) return
            const { data } = await this.$http.getFriendRebateInfo(); 
            this.show = data.msg.isShowFriendRebate;
        }
    },
    created(){
        this.getFriendRebate()
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.hdms)
    }
}
</script>
<style lang="scss" scoped>
    .friend-recom-dialog{
        position: fixed;
        z-index: 6;
        height: 140px;
        cursor: pointer;
        .close{
            position: absolute;
            right: -30px;
            top: 0px;
            color:#909090;
            font-size: 24px;
        }
        .friend-recom_cont{
            user-select: none;
            img{
                width: 150px;
                pointer-events: none;
            }
        }
    }
</style>