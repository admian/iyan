<template>
    <div id='index'>
      <div class="choice_top">
        <p class="title">爱演艺，就上你有戏</p>
        <div class="share" @click="showShade=true">分享<img src="../../assets/image/share.png"></div>
      </div>
      <div class="connect">
        <div class="user_info clearfix">
          <img src="../../assets/img/choice/11.jpg" class="user_photo">
          <img src="../../assets/image/focus.png" class="focus">
          <span class="user_name">橘卿</span>
        </div>
        <div class="video-con">
          <video class="video-s" ref="video_el" @click="palyAudio" autoplay
                 src="http://1257904994.vod2.myqcloud.com/dc43b614vodcq1257904994/858db7b95285890783425846538/FIsqCyklIBwA.mp4"
                 loop="loop">
          </video>
          <img src="../../assets/img/play_music.png" class="play-icon" v-show="pause" @click="palyAudio">
          <div class="pro_ll">
            <p align="center"><img src="../../assets/image/like2.png"></p>
            <p class="like_num">76W</p>
            <p align="center"><img src="../../assets/image/leave.png"></p>
            <p>103W</p>
          </div>
          <div class="pro_name">今天这支独舞可以拿去告白哦~</div>
          <div class="act clearfix">
            <div class="act_name">正在参与《后来的我们》</div>
            <div class="act_time">报名截止 2018-10-08</div>
          </div>
        </div>
        <div class="try_btn">我想参加</div>
      </div>
      <div class="footer_banner">
        <Carousel autoplay v-model="value2" loop :autoplay-speed="5000">
          <CarouselItem>
            <div class="demo-carousel">
              <div class="demo_pim"><img src="../../assets/img/choice/11.jpg" class="pim_pic"></div>
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
              <div class="demo_pim"><img src="../../assets/image/logo.png" class="pim_pic"></div>
              <div class="demo_pim demo_user">
                <p class="logo">爱演艺，就上你有戏</p>
              </div>
              <div class="fr">
                <div class="demo_btn">去看看</div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <div class="demo_pim">
                <img src="../../assets/image/1.png" class="pro_pic"><img src="../../assets/image/1.png" class="pro_pic"><img src="../../assets/image/1.png" class="pro_pic">
              </div>
              <div class="demo_pim">
                <p class="demo_des">新剧选角等你来参加</p>
              </div>
              <div class="fr">
                <div class="demo_btn">去看看</div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <div class="demo_pim">
                <img src="../../assets/image/1.png" class="pro_cover">
              </div>
              <div class="demo_pim">
                <p class="demo_tilt">新剧选角等你来参加</p>
                <p class="demo_deds">天族战神墨渊，镇压鬼君苍穹于无妄海，魂飞破散...</p>
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
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "index",
        data() {
            return {
              value2:0,
              pause:false,
              showShade:false
            }
        },
        computed: {
          ...mapState([
              'baseUrl',
              'shareShade'
          ]),
          player() {
            return this.$refs.videoPlayer.player
          }
        },
        methods: {
          ...mapMutations(
              ['SETSTATE']
          ),
          palyAudio(){
            if (this.$refs.video_el.paused) {
              this.$refs.video_el.play();
              this.pause=false;
            } else {
              this.$refs.video_el.pause();
              this.pause=true;
            }
          },
        }
    }
</script>
<style>
  #index .ivu-carousel-dots-inside{}
  #index .ivu-carousel:hover .ivu-carousel-arrow-hover{
    display: none;
  }
  #index .ivu-carousel{
    height: 1.3rem;
  }
</style>
<style scoped>
  .shade{
    background:rgba(19,12,33,.7);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .shou{
    width: .89rem;
    height: .99rem;
    position: absolute;
    top: .3rem;
    right: .9rem;
  }
  .shade_txt{
    position: absolute;
    top: 1.44rem;
    right: .9rem;
    font-size: .24rem;
  }
  .choice_top{
    width:100%;
    height:.88rem;
    background:rgba(43,3,86,1);
    position: relative;
  }
  .title{
    text-align: center;
    line-height: .88rem;
    font-size: .36rem;
  }
  .share{
    position: absolute;
    top: .3rem;
    right: .3rem;
    font-size: .22rem;
     width: 1rem;
  }
  .share img{
    width: .4rem;
    height: .24rem;
    float: right;
  }
  /*======================================================*/
  .connect{
    height: 11rem;
    background:linear-gradient(0deg,rgba(19,12,33,1),rgba(26,17,45,1));
    position: relative;
    margin: auto;
    padding: .74rem .3rem 0 .3rem;

  }
  .video-con{
    background: #1F1B28;
    width: 6.9rem;
    height: 9.27rem;
    border-radius: .05rem;
  }
  .video-s{
    width: 5.2rem;
    height: 9.27rem;
    margin: 0 .85rem;
  }
  .play-icon{position: absolute;width: .4rem;height: .44rem;top: 50%;left: 50%;transform: translate(-50%, -50%);}
  .pro_ll{
    position: absolute;
    right: .46rem;
    bottom: 3.34rem;
    font-size: .22rem;
    text-align: center;
  }
  .pro_ll p{text-align: center;margin-top: .12rem;}
  .pro_ll img{
    width: .2rem;
    height: .18rem;
    margin: auto;
  }
  .like_num{
    margin-bottom: .28rem;
  }
  .user_info{
    position: absolute;
    top:.68rem;
    left:.8rem;
    left:.6rem;
    width: 1.6rem;
    z-index: 10;
  }
  .user_photo{
    width: .92rem;
    height: .92rem;
    border:.04rem solid rgba(12, 12, 12, 0.4);
    border-radius:50%;
    float: left;
  }
  .user_name{
    float: right;
    margin-top: .35rem;
    font-size: .28rem;
    color: #ffffff;
  }
  .focus{
    width: .34rem;
    height: .34rem;
    position: absolute;
    top: .6rem;
    left: .6rem;
  }
  .pro_name{
    position: absolute;
    bottom: 1.9rem;
    left: .64rem;
    font-size: .28rem;
  }
  .act{
    position: absolute;
    z-index: 10;
    left: .66rem;
    bottom: 1.5rem;
  }
  .act_name{
    float: left;
    font-size: .3rem;
  }
  .act_time{
    float: left;
    margin-left: .4rem;
    font-size: .2rem;
    margin-top: .1rem;
  }
  .try_btn{
    width:2rem;
    height:.64rem;
    border-radius:.32rem;
    background:linear-gradient(-65deg,rgba(79,51,255,1),rgba(162,72,255,1));
    line-height: .64rem;
    text-align: center;
    font-size: .3rem;
    position: absolute;
    left: 2.45rem;
    bottom:.7rem;
  }
  /*--------------------------------------------------------------------*/
  .footer_banner{height: 1.35rem;width: 100%;background: #201041;padding: .2rem .3rem;position: fixed;bottom: .05rem;}
  .demo_pim{float: left;}
  .pim_pic{width: .96rem;height: .96rem;border-radius: 50%;margin-left: .05rem}
  .pro_pic{
    width: .76rem;
    height: .95rem;
    float: left;
    margin-right: .05rem;
  }
  .demo_user{margin-left: .2rem;}
  .p1{font-size: .32rem;margin-top: .1rem;}
  .p1 i{color: #FECF74;margin-right: .05rem;}
  .p2{
    font-size: .28rem;
    margin-top: .17rem;
    opacity:0.8;
  }
  .demo_des{
    font-size: .28rem;
    margin-top: .3rem;
    margin-left: .1rem;
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
  .pro_cover{
    width:1rem;
    height:1rem;
    border-radius:5px;
    margin-right: .3rem;
  }
  .demo_tilt{
    color: #FECF74;
    font-size: .26rem;
  }
  .demo_deds{
    margin-top: .12rem;
    font-size: .22rem;
    color: #ffffff;
    width: 3.5rem;
  }
</style>

