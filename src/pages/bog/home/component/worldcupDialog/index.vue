<template>
    <div v-if="isLogin && show && isEnable" class="worldcup-dialog" ref="item" style='left:75px;top:520px'>
        <div class="close el-icon-close" @click="show = false"></div>
        <div class="worldcup_cont" @click="hdclick" @mousedown="hdms($event,1)" @mouseup="hdms($event,2)">
            <img src="./img/worldcup.png" alt="">
        </div>
    </div>
</template>
<script> 
import { mapState } from "vuex";

export default {
    name: 'worldcup-dialog',
    data(){
        return {
            show: true,
            isEnable: false,
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
          if (!this.isLogin) return
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
            else this.$router.push('/worldcup')
        }, 
        //- 是否展示世界杯入口
        async get_specify_list() {
            const { status, data } = await this.$http.getAppSpecifyList()
            if(status === 200) {
                const [ obj ] = data.data.filter(item => item.key === 'worldCupEnable')
            console.log(obj)
                this.isEnable = obj.value === '1' 
            }
        }
    },
    mounted() {
        this.get_specify_list()
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.hdms)
    }
}
</script>
<style lang="scss" scoped>
    .worldcup-dialog{
        position: fixed;
        z-index: 11;
        height: 140px;
        cursor: pointer;
        .close{
            position: absolute;
            right: -45px;
            top: 0px;
            color:#909090;
            font-size: 24px;
        }
        .worldcup_cont{
            user-select: none;
            img{ 
                width: 123px;
                pointer-events: none;
            }
        }
    }
</style>