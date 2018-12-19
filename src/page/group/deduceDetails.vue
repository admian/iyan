<template>
  <div id="deduceDetails">
    <div class="user_info clearfix">
      <div class="fl">
        <div class="fl user_pic"><img :src="baseUrl+activeInfo.headUrl"></div>
        <div class="fr">
          <p class="user_name">{{activeInfo.nickName}}</p>
          <div class="user_label"><i v-for="i in labelList">{{i.labelsName}}</i></div></div>
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
      <div class="actLabel">{{activeInfo.dreamName}}</div>
      <div class="actNotice">{{actName(activeInfo.productionName)}}</div><!--'这是我参加《皓镧传》选角活动的作品，请大家多多关照21个字'-->
    </div>
    <div class="pro_info">
      <p class="qiTa">人气推荐</p>
      <div class="fr right_info">
      <p><img src="../../assets/img/dream/like.png"></p>
      <p class="like_num">{{numLike(activeInfo.favoriteCount)}}</p>
      <p><img src="../../assets/img/dream/leave.png"></p>
      <p>{{numLike(activeInfo.evaluateCount)}}</p>
      </div>
    </div>

    <div class="recommended">
      <div class="slider-wrap">
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i,index in list" :key="index" >
            <div class="pic_div">
              <img :src="i.productionCover" @click="changeVideo(i.id)" class="pic">
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer_banner">
      <Carousel autoplay v-model="value2" loop>
        <CarouselItem>
          <div class="demo-carousel">
            <div class="demo_pim"><img src="../../assets/img/choice/11.jpg"></div>
            <div class="demo_pim demo_user">
              <p class="p1"><i>我是章鱼不是鱼</i>也在你有戏</p>
              <p class="p2">更多精彩等着你来瞧</p>
            </div>
            <div class="fr">
              <div class="demo_btn">去看看</div>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <div class="demo_pim"><img src="../../assets/image/logo.png"></div>
            <div class="demo_pim demo_user">
              <p class="logo">爱演艺，就上你有戏</p>
            </div>
            <div class="fr">
              <div class="demo_btn">去看看</div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="shade" v-show="showShade" @click="showShade=false">
      <img src="../../assets/image/shou.png" class="shou">
      <p class="shade_txt">点击分享给朋友</p>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {Confirm} from 'vux';

  export default {
    name: "dubDetails",
    components: {Confirm},
    data() {
      return {
        list: [],
        commentList: [],
        activeInfo: {},
        labelList:[],
        show:false,
        pause:false,
        value2:0,
        showShade:false

      }
    },
    computed: {
      ...mapState([
        'baseUrl',
      ]),
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      onConfirm(){},
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
        this.$post('/api/offline/common/getProductionInfoById/'+id).then(res=>{
          this.activeInfo=res;
          this.pause=false;
        })
      },
      palyAudio(){
        if (this.$refs.video_el.paused) {
          this.$refs.video_el.play();
          this.pause=false;
        } else {
          this.$refs.video_el.pause();
          this.pause=true;
        }
      },
    },
      created(){
      this.id = this.$route.query.id;
      /*---------------------------------------*/
        if (this.id) {
          /*-------所有id---包括即兴---------*/
          //查询作品详情
          this.$post('/api/offline/common/getProductionInfoById/' + this.id,).then(res => {
            this.activeInfo = res;
            this.$post('/api/offline/common/queryUserLabels/'+this.activeInfo.userId).then(res=>{
                 console.log(res);
                 this.labelList=res;
            })
            //同类视频
            let url = '/api/offline/entertainment/queryProductionTypeProductionInfoList'
            let data={productionType: res.productionType,pageSize: 50, pageNum: 1};
            if(this.routerType || res.channelId==3){
              url = '/api/offline/impromptu/queryProductionTypeProductionInfoList'
              data={channelId:3}
            }
            this.$post(url, data).then(res => {
              this.list = res.list;
            })

          })
        }
    },

  }
</script>
<style>
  #deduceDetails .ivu-carousel-dots-inside{}
  #deduceDetails .ivu-carousel:hover .ivu-carousel-arrow-hover{
    display: none;
  }
  #deduceDetails .ivu-carousel{
    height: 1.3rem;
  }
</style>
<style scoped>
  .user_info{padding: .5rem .3rem 0;}
  .user_pic{width: .8rem;height: .8rem;}
  .user_pic img{width: 100%;height: 100%;border-radius: 50%;}
  .user_name{padding-left: .14rem;}
  .user_label{padding-left: .14rem;margin-top: .14rem;color: #FECF74;}
  .user_label i{
    background: #1E133F;
    font-size: .2rem;
    color: #FECF74;
    text-align: center;
    padding:.1rem .2rem;
    margin-right: .06rem;
    opacity:0.7;
    border-radius:5px;
  }
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
  .actLabel{
    position: absolute;
    bottom: 1rem;
    left: .3rem;
    z-index: 10;
    background: url("../../assets/img/dream/pushlabel.png") left no-repeat;
    background-size: .18rem;
    font-size: .22rem;
    padding-left: .3rem;
  }
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
  .pro_info p{display: inline-block; font-size: .22rem;}
  .pro_info img{width: .2rem; height: .18rem;}
  .qiTa{color:#FECF74;font-size: .22rem;margin-left: .42rem;}
  .right_info{margin-right: .3rem;}
  .like_num{margin-right: .3rem;}
  /*---------------------------------------------------------------------------*/
  .recommended {margin-top: .3rem;margin-left: .28rem; margin-bottom: .35rem;}
  .slider-wrap {overflow-y: hidden;}
  /*去掉滚动条*/
  .slider-wrap::-webkit-scrollbar {display: none;}
  .list-nav {width: max-content;height: max-content;}
  .list-item {width: 1.54rem;height: 1.55rem;margin-right: .15rem;position: relative;overflow:hidden;}
  .list-item .pic_div{width:1.54rem;height: 1.55rem;}
  .list-item .pic{width: 100%;height: 100%;object-fit: cover;}
  .list-item_imp .pic_div{width: 1.86rem;height: 1.86rem;}
  .list-item_imp .pic{width: 100%;height: 100%;object-fit: cover;}
  /*---------------------------------------------------------------------------*/
  .footer_banner{height: 1.35rem;width: 100%;background: #201041;padding: .2rem .3rem;}
  .demo_pim{float: left;}
  .demo_pim img{width: .96rem;height: .96rem;border-radius: 50%;margin-left: .05rem}
  .demo_user{margin-left: .2rem;}
  .p1{
    font-size: .32rem;
    margin-top: .1rem;
  }
  .p1 i{color: #FECF74;margin-right: .05rem;}
  .p2{
    font-size: .28rem;
    margin-top: .17rem;
    opacity:0.8;
  }
  .logo{
    margin-top: .25rem;
    color:rgba(255,255,255,1);
  }
  .demo_btn{
    width:1.38rem;
    height:.52rem;
    border:.02rem solid rgba(254,207,116,1);
    border-radius:.26rem;
    text-align: center;
    line-height: .52rem;
    font-size: .26rem;
    color: #FECF74;
    margin-top: .3rem;
    margin-right: .05rem;
  }
</style>
