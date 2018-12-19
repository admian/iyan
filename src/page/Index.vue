<template>
    <!--<div id="index">
      <p contenteditable="true">这是一段可编辑的段落。请试着编辑该文本。</p>
      &lt;!&ndash;水平滚动容器&ndash;&gt;
      <div class="slider-wrap">
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i in 4"></li>
        </ul>
      </div>
      <div class="box">test</div>
      <div class="slider-wrap">
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i in 4">{{i}}</li>
        </ul>
        <ul class="list-nav clearfix">
          <li class="list-item fl" v-for="i in 4">{{i}}</li>
        </ul>
      </div>
    </div>-->
  <div class="container">
    <div class="card-item" v-for="(item,index) in cardArrs"
         :class="[item.bgColor ,'z'+item.zIndex, 't'+item.zIndex*30]"
         @click.stop="changeArrIndex(index)">
      {{item.text}}
    </div>
  </div>

</template>

<script>
    export default {
        /*name: "Index",created(){
          let a=[1,2,3,4,5,7,8,6,9,10]
          let b=[]
          b=a.slice(0,5);
          console.log(b);
      }*/
      data() {
        return {
          cardArrs: [
            {
              text: "card-1",
              zIndex: 1,
              bgColor: "red"
            },
            {
              text: "card-2",
              zIndex: 2,
              bgColor: "blue"
            },
            {
              text: "card-3",
              zIndex: 3,
              bgColor: "yellow"
            },
            {
              text: "card-4",
              zIndex: 4,
              bgColor: "green"
            },
            {
              text: "card-5",
              zIndex: 5,
              bgColor: "black"
            }
          ],
          maxLength: 5
        }
      },
      methods: {
        changeArrIndex(index){
//                if(index == this.maxLength - 1) {
//                    return;
//                }
          let _zIndex = "";
          let _newArr = [];
          this.cardArrs.forEach((item,idx)=> {
            let _obj = {};
            if(idx == index) {
              _zIndex = item.zIndex;
              _obj.zIndex = this.maxLength;
              _obj.bgColor = item.bgColor;
              _obj.text = item.text;
              _obj.flag = true;
              _newArr.push(_obj)
            }else {
              _newArr.push(item)
            }
          });
          _newArr.forEach((obj)=>{
            if(obj.zIndex == this.maxLength && !obj.flag) {
              obj.zIndex = _zIndex;
            }
          });
          _newArr.map((item)=>{
            delete item.flag;
          });
          this.cardArrs = _newArr;
        }
      }
    }
</script>

<style scoped>
  .container {
    width: 500px;
    height: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    position: relative;
  }
  .card-item {
    width: 300px;
    height: 200px;
    line-height: 198px;
    text-align: center;
    font-size: 18px;
    border-radius: 5px;
    position: absolute;
  }
  .card-item.t30 {
    top: 30px;
    animation: positionAnimate1 1.1s
  }
  .card-item.t60 {
    top: 60px;
    animation: positionAnimate1 0.9s
  }
  .card-item.t90 {
    top: 90px;
    animation: positionAnimate1 0.7s
  }
  .card-item.t120 {
    top: 120px;
    box-shadow: 0 0 2px 2px #fff;
    animation: positionAnimate 0.5s
  }
  .card-item.t150 {
    top: 150px;
    box-shadow: 0 0 2px 2px #fff;
    animation: positionAnimate 0.3s
  }
  @keyframes positionAnimate1 {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes positionAnimate {
    0% {
      opacity: 0;
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .card-item.z1 {
    z-index:  1;
  }
  .card-item.z2 {
    z-index:  2;
  }
  .card-item.z3 {
    z-index:  3;
  }
  .card-item.z4 {
    z-index:  4;
  }
  .card-item.z5 {
    z-index:  5;
  }
  .card-item.red {
    border: 1px solid red;
    background-color: red;
  }
  .card-item.blue {
    border: 1px solid blue;
    background-color: blue;
  }
  .card-item.yellow {
    border: 1px solid yellow;
    background-color: yellow;
  }
  .card-item.green {
    border: 1px solid green;
    background-color: green;
  }
  .card-item.black {
    border: 1px solid black;
    background-color: black;
  }
    #index{
      width: 100%;
      background-color: #fff;
    }
    .slider-wrap{
      overflow-y: auto;
      border: 1px saddlebrown solid;
      margin-left: .3rem;
    }
    /*去掉滚动条*/
    .slider-wrap::-webkit-scrollbar {
      display: none;
    }
    .list-nav{
      width: max-content;
      height: max-content;
    }
    .list-item{
      width: 148px;
      height: 140px;
      border: darkmagenta 1px solid;
    }
    .box {
      width: 100%;
      height: 70px;
      border: 1px solid red;
    }


</style>
