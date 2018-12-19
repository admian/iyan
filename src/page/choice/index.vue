<template>
   <div id="comments">
     <div class="choice_top">
       <p class="title">爱演艺，就上你有戏</p>
       <div class="share" @click="showShade=true">分享<img src="../../assets/image/share.png"></div>
     </div>

     <div class="connect">
             <div class="stack-wrapper">
               <ul class="stack">
                 <li class="stack-item" v-for="(item, index) in pages"
                     :style="[transformIndex(index),transform(index)]"
                     @touchmove.stop.capture.prevent="touchmove"
                     @touchstart.capture="touchstart"
                     @touchend.capture="touchend"
                     @touchcancel.stop.capture.prevent="touchend"
                     @mousedown.capture="touchstart"
                     @mouseup.capture="touchend"
                     @mousemove.stop.capture.prevent="touchmove"
                     @mouseout.stop.capture.prevent="touchend"
                     @webkit-transition-end="onTransitionEnd(index)"
                     @transitionend="onTransitionEnd(index)"
                 >
                   <div class="user_info clearfix">
                     <img :src="baseUrl+item.headUrl" class="user_photo">
                     <img src="../../assets/image/focus.png" class="focus">
                     <span class="user_name">{{item.nickName}}</span>
                   </div>
                   <div class="video-con">
                     <video :class="item.videoType==0 ? 'video-h':'video-s'" :autoPlay="index == 0"
                            :src="item.videoUrl"
                            loop="loop">
                     </video>
                     <!--autoplay-->
                     <img src="../../assets/img/play_music.png" class="play-icon" v-show="pause">
                     <div class="pro_ll">
                       <p align="center"><img src="../../assets/image/like2.png"></p>
                       <p class="like_num">{{item.favoriteCount}}</p>
                       <p align="center"><img src="../../assets/image/leave.png"></p>
                       <p>{{item.evaluateCount}}</p>
                     </div>
                     <div class="pro_name">{{item.productionName}}</div>
                     <div class="act clearfix" v-if="item.dreamName">
                       <div class="act_name">正在参与《{{item.dreamName}}》</div>
                       <div class="act_time">报名截止 {{dataTime(item.dreamEndDate)}}</div>
                     </div>
                   </div>
                   <div class="try_btn">我想参加</div>
                 </li>
               </ul>
             </div>
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
  import detectPrefixes from '../../utils/detect-prefixes.js'
  import {mapMutations, mapState} from 'vuex'
    export default {
        name: "index", //精选
      data() {
        return {
          value2:0,
          pause:false,
          showShade:false,
          pages:[],
          basicdata: {
            start: {},
            end: {}
          },
          temporaryData: {
            prefixes: detectPrefixes(),
            offsetY: '',
            poswidth: 0,
            posheight: 0,
            lastPosWidth: '',
            lastPosHeight: '',
            lastZindex: '',
            rotate: 0,
            lastRotate: 0,
            visible:  3,
            tracking: false,
            animation: false,
            currentPage:  0, //this.stackinit.currentPage ||
            opacity: 1,
            lastOpacity: 0,
            swipe: false,
            zIndex: 10,
            //videoIndex:0
          }
        }
      },
      mounted(){
        // 绑定事件
       /* this.$on('next', () => {
          this.next()
        })
        this.$on('prev', () => {
          this.prev()
        })*/
        document.addEventListener('touchmove', (e) => {
          e.preventDefault()
        })
         //let that= this
           //setTimeout
       /* setTimeout(function () {
           that.$post('/api/offline/card/cardInfoList').then(res=>{
             that.pages.push(...res);
           })*/
         /* that.pages=[
              {userp:require('../../assets/img/choice/11.jpg'),name:'章鱼的心',like:'20W',leave:'100W',des:'今天这支舞可以拿去告白',act:'后来的我们',time:'2018-10-20',videoimg:require('../../assets/img/choice/q.png')},
              {userp:require('../../assets/img/choice/11.jpg'),name:'章鱼的心',like:'20W',leave:'100W',des:'今天这支舞可以拿去告白',act:'后来的我们',time:'2018-10-20',videoimg:require('../../assets/img/choice/qq.png')},
              {videoimg:require('../../assets/img/choice/q.png')},
              {videoimg:require('../../assets/img/choice/qq.png')},
              {videoimg:require('../../assets/img/choice/q.png')},
              {videoimg:require('../../assets/img/choice/qq.png')},
              {videoimg:require('../../assets/img/choice/q.png')}
            ]*/
        // },1000)
      },
      computed: {
        ...mapState([
          'baseUrl',
          'shareShade'
        ]),
        player() {
          return this.$refs.videoPlayer.player
        },
        // 划出面积比例
        offsetRatio () {
          let width = this.$el.offsetWidth
          let height = this.$el.offsetHeight
          let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
          let offsetHeight = height - Math.abs(this.temporaryData.posheight)
          let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
          return ratio > 1 ? 1 : ratio
        },
        // 划出宽度比例
        offsetWidthRatio () {
          let width = this.$el.offsetWidth
          let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
          let ratio = 1 - offsetWidth / width || 0
          return ratio
        },
      },
      methods:{
        ...mapMutations(
          ['SETSTATE']
        ),
        dataTime(time){
          let d = new Date(time);
          let times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          return times;
        },
        palyAudio(i){
          let elm = document.querySelectorAll('video');
          elm[i].pause();
          elm[i+1].play();


/*          if (elm[i].paused) {
            elm[i].play();
            this.pause=false;
          } else {
            elm[i].pause();
            this.pause=true;
          }*/
        },
        touchstart (e) {
          if (this.temporaryData.tracking) {
            return
          }
          // 是否为touch
          if (e.type === 'touchstart') {
            if (e.touches.length > 1) {
              this.temporaryData.tracking = false
              return
            } else {
              // 记录起始位置
              this.basicdata.start.t = new Date().getTime()
              this.basicdata.start.x = e.targetTouches[0].clientX
              this.basicdata.start.y = e.targetTouches[0].clientY
              this.basicdata.end.x = e.targetTouches[0].clientX
              this.basicdata.end.y = e.targetTouches[0].clientY
              // offsetY在touch事件中没有，只能自己计算
              this.temporaryData.offsetY = e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop
            }
            // pc操作
          } else {
            this.basicdata.start.t = new Date().getTime()
            this.basicdata.start.x = e.clientX
            this.basicdata.start.y = e.clientY
            this.basicdata.end.x = e.clientX
            this.basicdata.end.y = e.clientY
            this.temporaryData.offsetY = e.offsetY
          }
          this.temporaryData.tracking = true
          this.temporaryData.animation = false
        },
        touchmove (e) {
          // 记录滑动位置
          if (this.temporaryData.tracking && !this.temporaryData.animation) {
            if (e.type === 'touchmove') {
              e.preventDefault()
              this.basicdata.end.x = e.targetTouches[0].clientX
              this.basicdata.end.y = e.targetTouches[0].clientY
            } else {
              e.preventDefault()
              this.basicdata.end.x = e.clientX
              this.basicdata.end.y = e.clientY
            }
            // 计算滑动值
            this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
            this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
            let rotateDirection = this.rotateDirection()
            let angleRatio = this.angleRatio()
            this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
          }
        },
        touchend (e) {
          this.temporaryData.tracking = false
          this.temporaryData.animation = true
          // 滑动结束，触发判断
          // 判断划出面积是否大于0.4
          if (this.offsetRatio >= 0.4) {
            // 计算划出后最终位置
            let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
            this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
            this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
            this.temporaryData.opacity = 0
            this.temporaryData.swipe = true
            this.nextTick()
            // 不满足条件则滑入
          } else {
            this.temporaryData.poswidth = 0
            this.temporaryData.posheight = 0
            this.temporaryData.swipe = false
            this.temporaryData.rotate = 0
          }
        },
        nextTick () {
          // 记录最终滑动距离
          this.temporaryData.lastPosWidth = this.temporaryData.poswidth
          this.temporaryData.lastPosHeight = this.temporaryData.posheight
          this.temporaryData.lastRotate = this.temporaryData.rotate
          this.temporaryData.lastZindex = 20
          // 循环currentPage
          this.temporaryData.currentPage = this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage + 1
          // currentPage切换，整体dom进行变化，把第一层滑动置最低
          // console.log( 'a')

          this.$nextTick(() => {
            this.temporaryData.poswidth = 0
            this.temporaryData.posheight = 0
            this.temporaryData.opacity = 1
            this.temporaryData.rotate = 0
          })
        },
        onTransitionEnd (index) {
          let lastPage = this.temporaryData.currentPage === 0 ? this.pages.length - 1 : this.temporaryData.currentPage - 1
          //console.log('last'+lastPage)
          // dom发生变化正在执行的动画滑动序列已经变为上一层
          if (this.temporaryData.swipe && index === lastPage) {
            //this.videoIndex = index;
            //console.log(index);
            if(index<3){
              this.$post('/api/offline/card/cardInfoList').then(res=>{
                this.pages.push(...res);
              })
              //console.log(this.pages);
            }
            if(index==38){
              alert('请下载应用');
              return;
            }
            this.palyAudio(index);
            this.temporaryData.animation = true;
            this.temporaryData.lastPosWidth = 0;
            this.temporaryData.lastPosHeight = 0;
            this.temporaryData.lastOpacity = 0;
            this.temporaryData.lastRotate = 0;
            this.temporaryData.swipe = false;
            this.temporaryData.lastZindex = -1;

          }

        },
       /* prev () {
          this.temporaryData.tracking = false
          this.temporaryData.animation = true
          // 计算划出后最终位置
          let width = this.$el.offsetWidth
          this.temporaryData.poswidth = -width
          this.temporaryData.posheight = 0
          this.temporaryData.opacity = 0
          this.temporaryData.rotate = '-3'
          this.temporaryData.swipe = true
          this.nextTick()
        },
        next () {
          this.temporaryData.tracking = false
          this.temporaryData.animation = true
          // 计算划出后最终位置
          let width = this.$el.offsetWidth
          this.temporaryData.poswidth = width
          this.temporaryData.posheight = 0
          this.temporaryData.opacity = 0
          this.temporaryData.rotate = '3'
          this.temporaryData.swipe = true
          this.nextTick()
        },*/
        rotateDirection () {
          if (this.temporaryData.poswidth <= 0) {
            return -1
          } else {
            return 1
          }
        },
        angleRatio () {
          let height = this.$el.offsetHeight
          let offsetY = this.temporaryData.offsetY
          let ratio = -1 * (2 * offsetY / height - 1)
          return ratio || 0
        },
        inStack (index, currentPage) {
          let stack = []
          let visible = this.temporaryData.visible
          let length = this.pages.length
          for (let i = 0; i < visible; i++) {
            if (currentPage + i < length) {
              stack.push(currentPage + i)
            } else {
              stack.push(currentPage + i - length)
            }
          }
          return stack.indexOf(index) >= 0
        },
        // 非首页样式切换
        transform (index) {
          let currentPage = this.temporaryData.currentPage
          let length = this.pages.length
          let lastPage = currentPage === 0 ? this.pages.length - 1 : currentPage - 1
          let style = {}
          let visible = this.temporaryData.visible
          if (index === this.temporaryData.currentPage) {
            return
          }
          if (this.inStack(index, currentPage)) {
            let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length
            style['opacity'] = '1'
            style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex - this.offsetRatio) + 'px' + ')'
            style['zIndex'] = visible - perIndex
            if (!this.temporaryData.tracking) {
              style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
              style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
            }
          } else if (index === lastPage) {
            style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.lastRotate + 'deg)'
            style['opacity'] = this.temporaryData.lastOpacity
            style['zIndex'] = this.temporaryData.lastZindex
            style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
            style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
          } else {
            style['zIndex'] = '-1'
            style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
          }
          return style
        },
        // 首页样式切换
        transformIndex (index) {

          if (index === this.temporaryData.currentPage) {
            let style = {}
            style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
            style['opacity'] = this.temporaryData.opacity
            style['zIndex'] = 10
            if (this.temporaryData.animation) {
              style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
              style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
            }
            return style
          }
        }
      },
      created(){
         this.$post('/api/offline/card/cardInfoList').then(res=>{
            this.pages=res;
         })

      }
    }
</script>

<style>
  #comments .ivu-tabs-bar{
    border-style: none;
  }
  #comments .ivu-tabs-nav{
    padding-top: .28rem;
    padding-left:2.49rem;
  }
  #comments .ivu-tabs{
    color: #fff;
    font-size: .34rem;
  }
  #comments .ivu-tabs-nav .ivu-tabs-tab-active{
    color: #fff;
    font-size: .4rem;
  }
  #comments .ivu-tabs-ink-bar{
    display: none;
  }
  #comments .ivu-carousel-dots-inside{
    bottom: 0.05rem;
  }
  #comments .ivu-carousel:hover .ivu-carousel-arrow-hover{
    display: none;
  }
  #comments .ivu-carousel{
    height: 1.3rem;
  }
</style>
<style scoped>
  .stack {
    /*width: 100%;
    height: 100%;*/
    width: 6.9rem;
    height: 9.5rem;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 1000px;
    -webkit-perspective-origin: 50% 150%;
    margin: 0;
    padding: 0;
  }
  .stack-item{
    background: #2C1E4A;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
    position: absolute;
    opacity: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
  }
  .stack-wrapper{
    position: relative;
    z-index: 9;
    width: 7rem;
    height:10.1rem;
    padding: 0;
    list-style: none;
    pointer-events: none;
  }
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
  .video-h{
    width: 100%;
    height: 4.3rem;
    margin-top: 2rem;
    z-index: 2000;
  }
  .video-s{
    width: 5.2rem;
    height: 9.27rem;
    margin: 0 .85rem;
    z-index: 2000;
  }
  .play-icon{
    position: absolute;
    width: .4rem;
    height: .44rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pro_ll{
    position: absolute;
    right: .46rem;
    bottom: 3.4rem;
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
    top:.05rem;
    left:.8rem;
    left:.6rem;
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
    float: left;
    margin-top: .35rem;
    font-size: .28rem;
    color: #ffffff;
    margin-left: .1rem;
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
    bottom: 1.7rem;
    left: .64rem;
    font-size: .28rem;
  }
  .act{
    position: absolute;
    z-index: 10;
    left: .66rem;
    bottom: .9rem;
  }
  .act_name{
    float: left;
    font-size: .3rem;
  }
  .act_time{
    float: right;
    margin-left: .1rem;
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
    bottom:.3rem;
  }
  /*--------------------------------------------------------------------*/
  .footer_banner{height: 1.35rem;width: 100%;background: #201041;padding: .2rem .3rem;position: fixed;bottom: .05rem;z-index: 2000;}
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
