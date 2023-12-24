<template>
    <div class="allTeam">
        <div class="calander">
            <div class="arrow-left" @click="onClickArrow(-1)"></div>

            <div class="date-list">
                <div :class="['date-list-item', {'on': item.date === curDate}] " v-for="item in dateList" :key="item.date" @click="onChangeDate(item.date)">
                    {{ item.week}} <br/> {{item.date.slice(-5)}}
                </div>
            </div>

            <div class="arrow-right" @click="onClickArrow(1)"></div>
            
            <div class="date-picker">
                <el-date-picker v-model="curDate"  type="date" :clearable="false"  
                    value-format="yyyy/MM/dd" 
                    @change="onPickDate()" 
                    popper-class="worldcup-date-picker"
                    default-value="2022-11-21"
                    :picker-options="pickerOptions"
                >
                </el-date-picker>
            </div>
        </div>

        <div class="teamList" v-if="JSON.stringify(gameList) !== '{}' ">
            <div class="list-group"  v-if="gameList.going.length">
                <div class="group-date"> {{curDate.replaceAll('/', '月')+'日'}} {{curDate.week}} </div>
                <div class="group-content">
                    <div class="group-item" v-for="item in gameList.going" :key="item.id">
                        <div class="group-item-inner">
                            <div class="group-left">
                                <img :src="item.homeLogo" alt="homeLogo">
                                <p> {{item.homeName}} </p>
                            </div>
                            <div class="group-center">
                                <div class="group-time">  {{item.matchTime.slice(-8)}}</div>
                                <div > {{item.grouping}} 组 </div>
                                <div class="group-score"> {{item.awayScore}} : {{item.homeScore}} </div>
                                <button :class="['group-status', item.matchState === '0' ? 'notStart' : 'going']"> {{ item.matchState === '0' ? '未开始' : item.realTime }} </button>
                            </div>
                            <div class="group-right">
                                <img :src="item.awayLogo" alt="awayLogo">
                                <p> {{item.awayName}} </p>
                            </div>
                        </div>
                        <button class="btn-handle" @click="enterGame"> {{ item.matchState === '0' ? '提前下手' : '参与竞猜' }} </button>
                    </div>
                </div>
            </div>
            <div class="list-group"  v-if="gameList.end.length">
                <div class="group-date"> 比赛结束 </div>
                <div class="group-content">
                    <div class="group-item" v-for="item in gameList.end" :key="item.id">
                        <div class="group-item-inner">
                            <div class="group-left">
                                <img :src="item.homeLogo" alt="homeLogo">
                                <p> {{item.homeName}} </p>
                            </div>
                            <div class="group-center">
                                <div class="group-time">  {{item.matchTime.slice(-8)}}</div>
                                <div > {{item.grouping}} 组 </div>
                                <div class="group-score"> {{item.awayScore}} : {{item.homeScore}} </div>
                                <button class="group-status end"> 已结束 </button>
                            </div>
                            <div class="group-right">
                                <img :src="item.awayLogo" alt="awayLogo">
                                <p> {{item.awayName}} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Loading v-else-if="isLoading" :showLoading="isLoading" />

        <div v-else class="no-data">           
            <img src="../img/no-data.png" alt="">
            <p>当天暂无比赛</p>     
            <button class="btn-more" @click="enterGame">更多比赛</button>                    
        </div>

    </div>
</template>
<script>
import dayjs from 'dayjs'
import playGameMixin from 'common/mixin/playGameMixin';
import { mapState } from "vuex";

const DATE_START = '2022-11-21';
const DATE_END = '2022-12-18';

export default {
    name: 'allteam', 
    mixins: [playGameMixin],
    data() {
        return {
            dateList: [],
            curDate: dayjs().format('YYYY/MM/DD'),
            gameList: {},
            isLoading: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < dayjs(DATE_START) || time.getTime() > dayjs(DATE_END)
                },
            },
        }
    },
    created() {
        if( dayjs() < dayjs(DATE_START) ){
            this.curDate = dayjs(DATE_START).format('YYYY/MM/DD')
        }
    },
    mounted() {
        this.initDateList();
        this.getSecheduleData();
    },
    computed: {
        ...mapState({
            sport: state => state.game.sport,
        })
    },
    methods: { 
        initDateList( startDate = new Date() ) {
            let sDate; 
            if(dayjs(startDate).add(7, 'day') > dayjs(DATE_END) ) {    // 大于结束日期
                sDate = dayjs('2022-12-12')
            } else if(dayjs(startDate) < dayjs(DATE_START) ) {      // 小于开始日期
                sDate = dayjs(DATE_START)
            } else {
                sDate = startDate
            } 

            const maxDay = 7;
            let list = [];
            for (let i = 0; i < maxDay; i++) {
                let newDate = dayjs(sDate).add(i, 'day')
                list.push({
                    date: dayjs(newDate).format('YYYY/MM/DD'),
                    week: this.dayFormat(newDate.day())
                })       
            }
            this.dateList = list;
        },
        changeDateList(val) {
            this.dateList = this.dateList.map(item=>{
                const newDate = val == 1 ? dayjs(item.date).add(1, 'day') : dayjs(item.date).subtract(1, 'day')
                return {
                    date: dayjs(newDate).format('YYYY/MM/DD'),
                    week: this.dayFormat(newDate.day())
                } 
            })
        },
        // 格式化 星期日  return 星期*
        dayFormat(day) {
            const arr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
            return arr[Number(day)]
        },
        onClickArrow(val) {
            const nowDate = dayjs(this.curDate).subtract(-val, 'day')
            if(this.isOutOfDate(nowDate)) return;
            this.curDate = nowDate.format('YYYY/MM/DD');
            let hasCurDate = JSON.stringify(this.dateList).includes(this.curDate)
            !hasCurDate && this.changeDateList(val) 
            this.getSecheduleData()
        },
        onChangeDate(date) {
            if(this.isOutOfDate(date)) return;
            this.curDate = date;
            this.getSecheduleData()
        },
        onPickDate() {
            let hasCurDate = JSON.stringify(this.dateList).includes(this.curDate)
            !hasCurDate && this.initDateList(this.curDate)
            this.getSecheduleData()
        },
        getSecheduleData() {
            this.isLoading = true;
            const params = {
                date: this.curDate.replaceAll('/', '-'),
                leagueId: '75'
            }
            this.$http.getWorldCupSchedule(params).then(res=>{
                this.isLoading = false;
                const { data } = res.data
                const dataArr = Object.values(data).flat()
                this.$forceUpdate();
                this.gameList.going = dataArr.filter(item=> item.matchState != '-1')
                this.gameList.end = dataArr.filter(item=> item.matchState == '-1')
            })
        },
        // 是否超出可选日期
        isOutOfDate(date) {
            const DATE_START = '2022-11-21';
            const DATE_END = '2022-12-18';
            return !!( dayjs(date) < dayjs(DATE_START) || dayjs(date) > dayjs(DATE_END));
        },
        enterGame() {
            const [ gameObj ] = this.sport.filter(i => i.depotCode === 'FBSP')
            this._enterGame(gameObj)
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../css/allTeam.scss';
</style>
<style lang="scss">
    .worldcup-date-picker{
        margin-left: -235px;
        tr td{                    
            &.current span, &:hover span{
                background: #2897FA  !important;
                border-radius: 4px;
                color: #fff !important;
            }
            &.today span{
                color: #fff;
            }
            &.disabled{
                div{
                    background: none;
                }
                opacity: 0.6;
                &:hover{
                    span{
                        background: none !important;
                        color:#aaa !important;
                    }
                }            
            }
        }
        .el-icon-d-arrow-right[aria-label="后一年"]{
            display: none;
        }
        .el-icon-d-arrow-left[aria-label="前一年"]{
            display: none;
        }
        .el-date-picker__header-label{
            pointer-events: none;
        }
    }
</style>