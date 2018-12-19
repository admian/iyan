<template>
  <div id="app" :class="showHeader? 'hasHead' : ''">
    <router-view :class="showTabbar ? 'page' : ''"/>
    <x-modal v-show="showModal"></x-modal>
    <x-shaer></x-shaer>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import XModal from "./components/x-modal";
  import XShaer from "./components/x-share";
  import { cookie } from 'vux'

  export default {
    name: 'App',
    components: { XModal, XShaer},
    beforeCreate(){
      this.$setAutoSize();
    },
    data(){
      return{
        setTime:'',
      }
    },
    computed: {
      ...mapState([
        
        'showTabbar',
        'showModal',
        'is_login',
        'showShare',
        'tips'
      ]),
    },
    created() {
      //console.log(this.is_login);
     // let _this=this;
     /* if(this.is_login){
        clearInterval(this.setTime);
        this.setTime=setInterval(() => {

        }, 5000);
      }*/
      window.getTouter=this.getTouter;
    },
    methods:{
      getTouter(){
        this.$router.push({path:'/matter'});
      }
    }
  }
</script>

<style>
  #app .vux-header .vux-header-left .vux-header-back{
    font-size: .34rem;
  }

</style>
