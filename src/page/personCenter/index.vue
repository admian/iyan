<template>
  <div id="personCenter">
      <div class="user clearfix">
        <div>
          <img :src="baseUrl+useList.headUrl" class="fl">
        </div>
        <div class="focus-r">
          <div class="focus" :class="useList.isAttention ?'focus-yes': 'focus-no'">
            下载APP关注TA
          </div>
        </div>
      </div>
      <div class="nick ">
        <div class="clearfix">
        <span class="title fl">{{useList.nickName}}</span>
        <img class="sex_ico fl" v-if="useList.sex!==null" :class="useList.sex==0 ?'boy' : 'girl'" :src="useList.sex==0 ? require('../../assets/img/self/boy_sex.png') :require('../../assets/img/self/girl_sex.png')"/>
        </div>
        <p class="tip">{{ useList.remark}}</p>
      </div>

      <ul class="tag clearfix">
        <li class="fl tag_item" v-for="i in useList.userLabelsList">{{i.labelsName}}</li>
      </ul>
    <div class="numbers clearfix">
        <span class="num fl">{{mberList.attentionCount}}</span>
        <span class="fl">关注</span>
      <i class="fl ico"> / </i>
        <span class="num fl">{{mberList.fansCount}}</span>
        <span class="fl">粉丝</span>
      <i class="fl ico"> / </i>
        <span class="num fl">{{mberList.favoriteCount}}</span>
        <span class="fl">获赞</span>
      <i class="fl ico"> / </i>
        <span class="num fl">{{mberList.storyCount}}</span>
        <span class="fl">故事</span>
    </div>

    <Collapse class="sel_tab" v-model="valname">
      <Panel name="1">
        艺术取向
        <ul slot="content" class="sel_list">
          <li v-for="k in useList.userArtsList">{{k.name}}：{{k.context}}</li>
        </ul>
      </Panel>
    </Collapse>
     <!--个人资料-->
    <div class="divider"></div>
    <div class="works">

      <tab class="tabs"
           :line-width="2"
           custom-bar-width=".25rem">
        <tab-item :selected="num===1" @on-item-click="onItemClick(1)">{{produtionNum}} 作品</tab-item>
        <tab-item :selected="num===2" @on-item-click="onItemClick(2)">{{honnerNum}} 荣誉</tab-item>
      </tab>
      <div>
          <div class="container" v-show="key==1">
            <div class="no-connect" v-if="!allProdution.length">
              <div>
                <p align="center">主人还很害羞，晚点再来看看</p>
              </div>
            </div><!--作品为空时end-->

            <div class="waterfall" v-else>
              <div v-for="(item,index) in allProdution" :key="index">
                <router-link :to="'/prodution?id='+item.id" >
                  <div class="item"  :class="item.videoType==1 ? 'lg':''">

                    <img v-lazy="item.productionCover" class="pic">

                    <div class="user-info isLike clearfix" v-if="!item.dreamId">
                      <span class="fr">{{item.favoriteCount ? item.favoriteCount: 0}}</span>
                      <img class="ico-like fr" :src="item.isFavorite ? require('../../assets/img/self/dz_sel.png'): require('../../assets/img/self/dz.png')"/>
                    </div>
                    <div class="user-info clearfix" v-if="item.dreamId">
                      <i class="ico fl"></i>
                      <span class="fl">{{item.dreamName}}</span>
                      <span class="fr">{{item.pushCount ? item.pushCount : 0}} pick</span>
                    </div>

                  </div>
                </router-link>
              </div>

            </div><!--有作品end-->
          </div>
          <div class="container" v-show="key==2">
            <div class="no-connect" v-if="!allHonner.length">
              <div>
                <p align="center">主人还很害羞，晚点再来看看</p>
              </div>
            </div><!--荣誉为空时-->
            <div class="waterfall">
              <div v-for="(item,index) in allHonner" :key="index">
                <router-link :to="'/prodution?id='+item.id" >
                  <div class="item" :class="item.videoType==1 ? 'lg':''">
                    <img v-lazy="item.productionCover" class="pic">
                    <div class="user-info clearfix">
                      <i class="ico fl"></i>
                      <span class="fl">{{item.dreamName}}</span>
                      <span class="fr">{{item.pushCount ? item.pushCount : 0}} pick</span>
                    </div>
                    <img src="../../assets/img/self/honor.png" class="honor">
                    </div>
                </router-link>
              </div>
            </div><!--荣誉end-->
          </div>
      </div>
    </div>
    <div class="footer_banner">
      <Carousel autoplay v-model="value2" loop>
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
      </Carousel>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem ,Scroller,XHeader,Badge,Confirm} from 'vux'
  import {mapState,mapMutations} from 'vuex'
  import _ from 'lodash'
  export default {
    name: "index",
    components: {
      Tab,
      TabItem,
      Scroller,
      XHeader,
      Badge,
      Confirm
    },
    data(){
      return{
        key:1,
        num:1,
        valname:'1',
        useList:[],//个人信息列表
        mberList:[],//总数
        allProdution:[],
        produtionNum:'',
        allHonner:[],
        honnerNum:'',
        allFavorite:[],
        favoriteNum:'',
        promptList:[],//消息提醒
        scrollerStatus: {
          pullupStatus: 'default'
        },
        isLoading: false,
        needAdd: true,
        addInfo:true,
        page1:1,
        page2:1,
        value2:0
      }
    },
    computed:{
      ...mapState([
        'is_login',
        'my_userId',
        'baseUrl',
        'tips'
      ])
    },
    mounted() {
      this.scroll()
    },
    methods: {
      ...mapMutations(
        ['SETSTATE']
      ),
      //tabs
      onItemClick(num){
        this.key=num;
      },
      //作品
      getData(isEmpty) {
        let limit = 10;
        this.$post('api/offline/user/queryAllProductionByUserIdByPage', {pageSize:limit,pageNum:this.page1,userId:this.userId}).then(res =>{
          this.isLoading = false;
            if (isEmpty) {
              this.allProdution = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.allProdution.push(...res.list);
            }
            if (res.list && res.pages <= this.page1) {
              this.needAdd = false;
            }
          });
      },
      //荣誉
      grtInfo(isEmpty){
        let limit = 10;
        this.$post('api/offline/user/queryAllHonnerProductionByUserIdByPageBean', {pageSize:limit,pageNum:this.page2,userId:this.userId}).then(
          res => {
            this.isLoading = false;
            if (isEmpty) {
              this.allHonner = res.list;
            } else {
              //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
              this.allHonner.push(...res.list);
            }
            if (res.list && res.pages <= this.page2) {
              this.addInfo = false;
            }

          });
      },
      scroll() {
        this.isLoading = false;
        window.onscroll = () => {
          // 距离底部200px时加载一次
          let tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          let bottomOfWindow = document.documentElement.offsetHeight - tpScrollTop - window.innerHeight <= 200

          if (bottomOfWindow && this.isLoading == false) {
            if(this.key==1){
              this.isLoading = true;
              if (this.needAdd) {
                this.page1++;
                this.getData(false);
              }
            }
            if(this.key==2){
              this.isLoading = true;
              if(this.addInfo){
                this.page2++;
                this.grtInfo(false);
              }
            }
          }
        }
      }
    },
    created(){
      this.userId=this.$route.query.userId;
      //获取个人所有信息
      this.$post('api/offline/user/getUserInfoByUserId/'+this.userId).then(res => {
        this.useList = res;
        //console.log(this.useList);
      })
      //获取关注、粉丝等数量
      this.$post('api/offline/user/getUserProductionByUserId/'+this.userId).then(res => {
        this.mberList = res;
      })
      this.getData(true);
      this.grtInfo(true);

    }

  }
</script>
<style>
  #personCenter .vux-header{
    margin-top: .4rem;
  }
  #personCenter .vux-header .vux-header-right a{
    margin-left: .4rem;
  }
  #personCenter .vux-tab {
    background-color: transparent;
  }
  #personCenter .vux-tab .vux-tab-item {
    margin-top: .4rem;
    margin-bottom: .1rem;
    background-color: transparent;
    line-height: 1;
  }

  #personCenter .vux-tab .vux-tab-item.vux-tab-selected {
    color: #fff;
  }

  #personCenter .vux-tab-bar-inner {
    background-color: #FECF74;
  }
  #personCenter .ivu-collapse{
    background-color: transparent;
    border:none;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
    padding-left: .3rem;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
    line-height: 1.02rem;
    height: 1.02rem;
    font-size: .32rem;
    color:#fff;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i{
    float: right;
    margin-top: 0.4rem;
  }
  #personCenter .ivu-collapse-content{
    color:#FECF74;

    background-color: transparent;
  }
  #personCenter .ivu-collapse-content>.ivu-collapse-content-box{
    padding-bottom: 0;
  }
  #personCenter .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header{
    border-bottom-style: none;
  }
  #personCenter .vux-badge-dot{
    padding: 3px;
    margin-top: -.30rem;
    margin-left: .05rem;
  }
  #personCenter .vux-badge{
    background: #FECF74;
    position: absolute;
    right: -.07rem;
    top:.2rem;
  }
  #personCenter .weui-dialog{
    background-color: #1F173E;
  }
  #personCenter .weui-dialog__bd:first-child{
    color: #fff;
  }
  #personCenter .weui-dialog__btn_primary{
    color: #fff;
  }
  #personCenter .ivu-carousel:hover .ivu-carousel-arrow-hover{
    display: none;
  }
  #personCenter .ivu-carousel{
    height: 1.3rem;
  }
</style>
<style scoped>
  .user {
    margin-top: .3rem;
    padding-left: .6rem;
    padding-right: .3rem;
    padding-bottom: .2rem;
  }
  .user img {
    width: 1.26rem;
    height: 1.26rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .user span {
    margin-top: .37rem;
    width: 1.03rem;
    height: .52rem;
    line-height: .52rem;
    font-size: .22rem;
    text-align: center;
    color: #30214A;
    background-color: #fecf74;
    border-radius: 15px;
  }
  .focus-r{
    float: right;
    margin-top: .2rem;
    margin-right: 1.36rem;
    background: #FECF74;
    border-radius:.35rem;
  }
  .focus{
    width: 2.79rem;
    height: .69rem;
    line-height: .69rem;
    font-size: .32rem;
    border-radius:.26rem;
    text-align: center;
    color: #30214A;
    font-weight:600;
  }
  .nick {
    padding: 0 .44rem .23rem;
    color: #BCBAC1;
    font-size: .24rem;
  }
  .nick .title {
    color: #fff;
    font-size: .4rem;
  }
  .nick .sex_ico {
    margin-top: .05rem;
    margin-left: .15rem;
    margin-right: .21rem;
  }
  .boy{
    width: .26rem;
    height: .25rem;
  }
  .girl{
    width: .19rem;
    height: .29rem;
  }
  .nick .tip {
    margin-top: .16rem;

  }
  .tag {
    padding: 0 .44rem .51rem;
  }
  .tag_item {
    margin-right: .1rem;
    padding: 0 .25rem;
    color: #FECF74;
    height: .4rem;
    line-height: .4rem;
    font-size: .2rem;
    background-color: rgba(51, 37, 76, .3);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

  }
  .numbers {
    padding: 0 .44rem;
    margin-bottom: .3rem;
  }
  .numbers .ico {
    margin: 0 .2rem;
  }
  .numbers .num {
    color:#fff;
    font-size: .34rem;
    margin-right: .05rem;
    font-style: italic;
    margin-top: -.06rem;
  }
  .numbers span{
    font-size: .22rem;
    color: #A8A6AB;
  }
  .sel_list{
    padding-bottom: .3rem;
  }
  .sel_list li{
    margin-bottom: .15rem;
    padding-left: .12rem;
    padding-right: .22rem;
    height: .6rem;
    line-height: .6rem;
    font-size: .26rem;
    width: max-content;
    background-color: rgba(51, 37, 76, .3);
    border-radius: 5px;
  }
  .works{padding-bottom: 1.1rem;}
  .works .tabs {
    width: 50%;
    margin: 0 auto;
  }
  .container {width: 92%;margin: .35rem auto 0; margin-bottom: .3rem;}

  .waterfall {-moz-column-count: 2; /* Firefox */-webkit-column-count: 2; /* Safari 和 Chrome */column-count: 2;-moz-column-gap: .15rem;-webkit-column-gap: .15rem;column-gap: .15rem;}

  .waterfall .item.lg {height: 5.18rem;}

  .waterfall .item {position: relative;margin-bottom: .15rem;height: 3.37rem;}

  .waterfall .item .pic {width: 100%;height: 100%; object-fit: cover;border-radius: 5px;}

  .waterfall .user-info {padding: 0 .15rem;position: absolute;bottom: .3rem;width: 100%;line-height: .2rem;font-size: .2rem;color: #fff;}

  .waterfall .user-info .ico {margin-top: .02rem;margin-right: .1rem;width: .14rem;height: .14rem;border-radius: 50%;border: 1px solid #694BFF;}

  .waterfall .isLike .ico-like {margin-right: .07rem;width: .26rem;height: .26rem;}
  .sc-wrap{
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: .15rem;
    -webkit-column-gap: .15rem;
    column-gap: .15rem;
  }

  .sc-wrap .item {
    padding-bottom: .1rem;
    margin-bottom: .2rem;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    display: block;
    color: #fff;
    background-color: #211934;

  }
  .sc-wrap .item .act-like{position: relative;}
  .sc-wrap .item .act-like .pic_div{
    width: 100%;
    height: 3.37rem;
    border-radius: 5px;
  }
  .sc-wrap .item .act-like .pic {
    width: 100%;height: 100%; object-fit: cover;border-radius: 5px;
  }

  .sc-wrap .item.lg .act-like .pic {
    height: 5.18rem;
    border-radius: 5px;
  }

  .sc-wrap .user-info {
    display: block;
    padding: .14rem .2rem;
    font-size: .2rem;
    color: #EBE2FF;
    line-height: .5rem;
  }
  .sc-wrap .act-like .act-info {padding: 0 .15rem;position: absolute;bottom: .3rem;width: 100%;line-height: .2rem;font-size: .2rem;}
  .sc-wrap .act-like .num-like{ width: 1rem; height: .34rem; background: rgba(0,0,0,.6);border-radius: .17rem; position: absolute;top: .2rem;right: .2rem;color: #fff; font-size: .2rem;line-height: .34rem;}
  .sc-wrap .act-like .num-like .like_icon{width: .24rem; height: .22rem;float: left;margin-left: .12rem;margin-top: .06rem;margin-right: .05rem}
  .sc-wrap .user-info img {margin-right: .2rem;width: .5rem;height: .5rem;border-radius: 50%;}
  .sc-wrap .item .user-name {font-size: .2rem;color: #EBE2FF;}
  /*没有作品*/
  .no-connect p{
    color: #737373;
    font-size: .3rem;
    margin-top: 3.28rem;
    margin-bottom: .5rem;
  }
  .honor{
    position: absolute;
    top: -.07rem;
    right: .16rem;
    width: .46rem;
    height: .55rem;
  }
  .like{position: absolute;top: .1rem;right: .3rem;}


  /*-----------------------------------------------------------------------------------------------*/


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

</style>
