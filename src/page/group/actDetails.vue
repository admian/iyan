<template>
  <div id="activityDetails">
    <div class="action_top">
      <p class="top_info"><span class="ti1">{{nicksName(activeInfo.nickName)}}</span>正在参与<span class="ti2">《{{activeInfo.dreamName}}》选角</span> </p>
      <p class="top_des"><span class="td1">给ta助力，登顶排行</span><span>剩余时间：<i class="top_time">{{showTime}}</i></span></p>
    </div>
    <div class="user_info clearfix">
      <div class="fl">
        <div class="fl user_pic"><img :src="baseUrl+activeInfo.headUrl"></div>
        <div class="fr"><p class="user_name">{{activeInfo.nickName}}</p><p class="user_good">{{activeInfo.favoriteCount}} Good</p></div>
      </div>
      <div class="fr"><div class="to_focus">关注她</div></div>
    </div>
    <div class="container">
      <div class="share" @click="showShade=true"><div class="fl">分享</div><img src="../../assets/image/share.png"></div>
     <!------------------------------>
      <video :class="activeInfo.videoType==1?'video-s' :'video-h'" :src="activeInfo.videoUrl"
        ref="video_el" @click="palyAudio" loop="loop"  autoplay
        x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline webkit-playsinline>
      </video>
      <img src="../../assets/img/play_music.png" class="play-icon" v-show="pause" @click="palyAudio">

      <div class="actNotice">{{actName(activeInfo.productionName)}}</div><!--'这是我参加《皓镧传》选角活动的作品，请大家多多关照21个字'-->
      <div class="push" @click="show=true"><img src="../../assets/image/push.png"></div>
    </div>
    <div class="brilliant_com" v-if="commentList!==0">
      <p class="brilliant_title">精彩评论</p><p class="slice"></p>
      <div class="brilliant_con">{{comMent(commentList.evaluateBody)}}</div>
      <div class="brilliant_like">{{numLike(commentList.praiseCount)}}</div>
    </div>
    <div class="down"><img src="../../assets/image/down.png"></div>
    <p class="qiTa">其他选手</p>
    <div class="recommended">
      <div class="slider-wrap">
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i,index in list" :key="index" >
            <div class="pic_div">
              <img :src="i.productionCover" @click="changeVideo(i.id)" class="pic">
            </div>
            <div class="recom clearfix">
              <span class="remNo" v-if="i.orders">no.{{sumInt(i.orders)}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <confirm v-model="show"
             title="投票需要在APP上进行"
             confirm-text="立即登录"
             cancel-text="知道了"
             @on-confirm="onConfirm">
      <p style="text-align:center;">每个登陆用户每天有30次以上的投票次数</p>
    </confirm>
    <div class="shade" v-show="showShade" @click="showShade=false">
      <img src="../../assets/image/shou.png" class="shou">
      <p class="shade_txt">点击分享给朋友</p>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {Confirm} from 'vux';
  import {Message} from 'iview';
  function checkTime(i){ //将0-9的数字前面加上0，例1变为01
    if(i<10)
    {
      i = "0" + i;
    }
    return i;
  };
  export default {
    name: "actDetails",
    components: {Message,Confirm},
  data() {
      return {
        commentList: [],
        activeInfo: {},
        list:[],
        pause:false,
        show:false,
        showTime:'',
        showShade:false

      }
    },
    computed: {
      ...mapState([
        'baseUrl',
        'my_userId'
      ]),
      player() {
        return this.$refs.videoPlayer.player
      },

    },
    mounted(){
      //this.dateTime();
      setInterval(this.dateTime,1000)
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      //去小数点
      sumInt(num){
        return parseInt(num);
      },
      onConfirm(){},
      dateTime(){
        let end=this.activeInfo.dreamEndDate;
        let data=new Date().getTime();
        let lastTime = end - data; //计算剩余的毫秒数
        if(lastTime == 0){
          this.showTime='00:00:00';
        }else{
          let days = parseInt(lastTime / 1000 / 60 / 60 / 24  , 10); //计算剩余的天数
          let hours = parseInt(lastTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
          let minutes = parseInt(lastTime / 1000 / 60 % 60, 10);//计算剩余的分钟
          let seconds = parseInt(lastTime / 1000 % 60, 10);//计算剩余的秒数
          days = checkTime(days);
          hours = checkTime(hours);
          minutes = checkTime(minutes);
          seconds = checkTime(seconds);
          this.showTime=days+'天'+' '+hours+':'+minutes+':'+seconds;
        }
      },
      actName(txt) {
        if(txt == null){
          return ' '
        }
        if(txt.length < 21 ){
          return txt
        }
        return txt.slice(0,21) + '...'
      },
      nicksName(txt) {
        if(txt == null){
          return ' '
        }
        if(txt.length < 5 ){
          return txt
        }
        return txt.slice(0,5) + '...'
      },
      comMent(txt) {
        if(txt == null){
          return ' '
        }
        if(txt.length < 49 ){
          return txt
        }
        return txt.slice(0,49) + '...'
      },
      numLike(num){
        if(num == null){
          return  '0'
        }
        if(num<1000){
          return num
        }
        return num/10000+'W'
      },
      changeVideo(id){
        this.$post('/api/offline/common/getProductionInfoById/' + id).then(res => {
          this.activeInfo = res;
          this.pause=false;
          this.$post('/api/offline/common/queryGoodsEvaluatesByProductionId', {productionId: this.activeInfo.id, pageSize: 1, pageNum: 1}).then(res => {
            if(res==''){
              this.commentList=0;
              return
            }
            if(res.list!==''){
              this.commentList=res.list[0];
            }

          })
        })
      },
      palyAudio(){
        if(this.$refs.video_el.paused) {
          this.$refs.video_el.play();
          this.pause=false;
        } else {
          this.$refs.video_el.pause();
          this.pause=true;
        }
      }
    },
      created(){
        this.id = this.$route.query.id;

        /*---------------------------------------*/
        //查询作品详情
        this.$post('/api/offline/common/getProductionInfoById/' + this.id).then(res => {
          this.activeInfo = res;
          this.dateTime();
          //同类视频
          let url = '/api/offline/dream/queryDreamProductionInfoList'
          let data = { dreamId: res.dreamId,pageSize: 20, pageNum: 1};
          this.$post(url, data).then(res => {
            this.list = res.list;
          });
          this.$post('/api/offline/common/queryGoodsEvaluatesByProductionId', {productionId: this.id, pageSize: 1, pageNum: 1}).then(res => {
            if(res==''){
              this.commentList=0;
              return
            }
            if(res.list!==''){
              this.commentList=res.list[0];
            }
            console.log(res);
          });
        });

    },
  }
</script>

<style scoped>
  /*-----------------------------*/
  .action_top{
    width: 100%;
    height: 1.28rem;
    color: #ffffff;
    font-size: .24rem;
    padding-top: .3rem;
    padding-left: .3rem;
    background: url("../../assets/image/top_bg.png") no-repeat center;
    background-size: 100%;
  }
  .top_info{color: #D0D0D0;}
  .ti1{font-size: .3rem;color: #ffffff;}
  .ti2{font-size: .3rem;color: #FECF74;}
  .top_des{margin-top: .14rem;}
  .td1{margin-right: .5rem;}
  .top_time{color: #FECF74;}
  /*------------------------------*/
  .user_info{padding: .5rem .3rem 0;}
  .user_pic{width: .8rem;height: .8rem;}
  .user_pic img{width: 100%;height: 100%;border-radius: 50%;}
  .user_name{padding-left: .14rem;}
  .user_good{padding-left: .14rem;margin-top: .14rem;color: #FECF74;}
  .to_focus{
    width:1.28rem;
    height:.5rem;
    background:#FECF74;
    border-radius:25px;
    text-align: center;
    color: #30214A;
    font-size: .28rem;
    line-height: .5rem;
  }
  .container {width: 100%;height:8.08rem;position: relative;}
  .share{position: absolute;top: .6rem;right: .3rem;font-size: .22rem;}
  .share img{width: .4rem;height: .24rem;margin-left: .1rem;float: left;}
  .actNotice{position: absolute;bottom: .6rem;left: .3rem;font-size: .26rem;}
  .video-h{
    position: absolute;
    top: 1.96rem;
    width: 100%;
    height: 4.24rem;
  }
  .video-s{
    position: absolute;
    top: .4rem;
    left: 1.68rem;
    width: 4.14rem;
    height: 7.36rem;
  }
  .play-icon{position: absolute;width: .4rem;height: .44rem;top: 50%;left: 50%;transform: translate(-50%, -50%);}
  .push{position: absolute;bottom: 1.22rem;right: .58rem;width: 1.38rem;height: 1.38rem;}
  /*---------------------------------------------------------------------------*/
  .brilliant_com{
    position: relative;
  }
  .brilliant_com p{
    display: inline-block;
  }
  .brilliant_title{
    font-size: .2rem;
    color: #FECF74;
    margin:0 .46rem;
  }
  .slice{
    height: 2px;
    width: 5.52rem;
    background: #25183F;
    margin-top: .05rem;
  }
  .brilliant_con{
    padding: .18rem .5rem 0 .3rem;
    font-size: .24rem;
    line-height: .38rem;
  }
  .brilliant_like{
    position: absolute;
    right: .3rem;
    bottom: 0;
    background: url("../../assets/image/like.png") no-repeat;
    background-size: .22rem .2rem;
    padding-left: .25rem;
    color: #5C5170;
    font-size: .2rem;
  }
  /*---------------------------------------------------------------------------*/
  .down{width: 5.86rem;height: .87rem;margin: .7rem .84rem .5rem .8rem;}
  .qiTa{font-size: .22rem; color: #FECF74;padding-left: .44rem;}
  .recommended {margin: .3rem 0 .28rem .3rem;}
  .slider-wrap {overflow-y: hidden;}
  /*去掉滚动条*/
  .slider-wrap::-webkit-scrollbar {display: none;}
  .list-nav {width: max-content;height: max-content;}
  .list-item {width: 1.54rem;height: 1.54rem;margin-right: .1rem;position: relative;border-radius: .05rem;}
  .pic_div{width: 1.54rem;height: 1.54rem;}
  .pic{width: 100%;height: 100%;object-fit: cover;}
  .recom {position: absolute;bottom: .1rem;z-index: 10;border-radius: 5px;padding: .05rem  0;width: 100%;}
  .remNo {
    padding: 0 2px;
    height: .22rem;
    line-height: .22rem;
    background: #FECF74;
    border-radius: .03rem;
    color: #25183F;
    font-size: .18rem;
    margin-left:.14rem;
    z-index: 20;
    text-align: center;
  }

</style>
