<template >
  <div style="display: flex; flex-direction: column; align-items: center" id="content">
    <el-card id="personCard" class="box-card" shadow="always" style="width: 350px; margin: 20px auto;;">
      <template #header>
        <div class="card-header middle">
          / 🎄⛄⛄🎁🔔🎁⛄⛄🎄 /
        </div>
      </template>
      <div v-for="person in persons" class="text item" style="margin: 20px 35px">
        <el-row>
          <el-avatar :src=person.imgSrc></el-avatar>
          <span style="flex-grow: 1;  font-size: larger" class="middle">{{person.name}}</span>
          <span v-if="addr === person.addr" style=" font-size: larger; margin-top: auto;margin-bottom: auto;">📶</span>
          <span v-else-if="'小皇' === person.name" style=" font-size: larger; margin-top: auto;margin-bottom: auto;">📚</span>
          <span v-else style=" font-size: larger; margin-top: auto;margin-bottom: auto; color: transparent">📶</span>
        </el-row>
      </div>
    </el-card>
    <div style="color: lightgray">
      📍 {{addr}} 🏠
    </div>
    <el-card id="clickButton" shadow="always" style=" font-size: 70px; margin: 30px" @click="getGiftReciever" >
      🎅
    </el-card>

  </div>
<!--  <el-image :src="require('@/pages/christmas/assets/cad.jpg')"></el-image>-->
  <div>
    <el-dialog v-model="dialogVisable" style="width: fit-content">
      <el-card shadow="always">
        <el-image :src="dialogImage" style="width: 300px" alt="这是一张图片.jpg"></el-image>
      </el-card>
    </el-dialog>

    <el-dialog v-model="ResultDialogVisable" style=" width: fit-content">
      <el-card id="result" shadow="always">
        <template #header >
          <div style="font-size: 20px; text-align: center;">
            🎊🔔🦌🛷🎅🎄🧦🎁🎊
          </div>
        </template>
        <el-image :src="ResultDialogImage" style="width: 300px" alt="抽卡结果.jpg"></el-image>
      </el-card>
    </el-dialog>
  </div>


</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElNotification} from 'element-plus'

let dialogVisable = ref(false)
let ResultDialogVisable = ref(false)
let ResultDialogImage = ref()
let dialogImage = ref()
let addr = ref(window.city)


interface Person{
  name: string,
  imgSrc: string,
  addr: string
}
let time = new Date()
let randomState = ref(time.getDate())
let imagesModuel = require.context('./assets/photos')
let imagesPaths = imagesModuel.keys()
let orders = [
    [1, 2, 0, 3],
    [2, 0, 1, 3]
]
let persons : Person[] =[
  {
    name: 'CAD',
    imgSrc: require('@/pages/christmas/assets/cad.jpg'),
    addr: '宁波市'
  },
  {
    name: '王二甲',
    imgSrc: require('@/pages/christmas/assets/wyz.jpg'),
    addr: '深圳市'
  },
  {
    name: '葱油封超',
    imgSrc: require('@/pages/christmas/assets/fc.jpg'),
    addr: '杭州市'
  },
  {
    name: '小皇',
    imgSrc: require('@/pages/christmas/assets/xh.jpg'),
    addr: '临平'
  },
]


function getRandom(n:number){
  return Math.floor(Math.random() * n)
}
function animation() {
  let clickButton = document.getElementById('clickButton')
  let duration = 400
  let cnt = 3
  for(let i=0; i<cnt; i++){
    let nowDuration = duration * 2 * i
    setTimeout(() => {
      clickButton.style.cssText += `
      transition: ${duration}ms;
      transform: rotate(45deg);
    `
    }, nowDuration)
    nowDuration += duration
    setTimeout(() => {
      clickButton.style.cssText += `
      transition: ${duration}ms;
      transform: rotate(-45deg);
    `
    }, nowDuration)
  }
  setTimeout(() => {
    let deg = 360 * 6
    clickButton.style.cssText += `
      transition: ${duration * 3}ms;
      transform: rotate(${deg}deg);
    `
  }, duration * cnt * 2)
  return duration * cnt * 2 + duration * 3
}
function getGiftReciever(){
  // addr.value = '深圳市'

  setTimeout(()=>{
    let flag = false
    for (let i=0; i<persons.length; i++){
      if(addr.value === persons[i].addr){
        let person = persons[orders[randomState.value % orders.length][i]]
        ResultDialogImage.value = person.imgSrc
        ResultDialogVisable.value = true
        flag = true
      }
    }
    if(!flag) {
      ElNotification({
        title: '定位错误',
        message: '您的定位在' + addr.value,
        type: 'error',
        duration: 2000
      })
    }
  }, animation())

}

function snow() {
  //  1、定义一片雪花模板
  var flake = document.createElement('div');
  // 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺
  var contents = ['🎁', '❄', '🎵', '🦌', '🛷', '🧦']
  flake.innerHTML = '❆';
  // flake.innerHTML = '❄';
  // flake.innerHTML = '🔔';
  flake.style.cssText = 'position:absolute;color:#000;';
  //获取页面的高度 相当于雪花下落结束时Y轴的位置
  var documentHieght = window.innerHeight - 50;
  //获取页面的宽度，利用这个数来算出，雪花开始时left的值
  var documentWidth = window.innerWidth - 30;
  //定义生成一片雪花的毫秒数
  var millisec = 400;
  //2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；
  setInterval(function() { //页面加载之后，定时器就开始工作
    //随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置
    var startLeft = Math.random() * documentWidth;
    //随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置
    var endLeft = (Math.random() * 1.0 - 0.5) * documentWidth + startLeft;
    if (endLeft < 0){
      endLeft = -endLeft
    }
    else if (endLeft > documentWidth){
      endLeft -= documentWidth
    }
    //随机生成雪花大小
    var flakeSize = 10 + 15 * Math.random();
    //随机生成雪花下落持续时间
    var durationTime = 12000 + 3000 * Math.random();
    //随机生成雪花下落 开始 时的透明度
    var startOpacity = 0.7 + 0.3 * Math.random();
    //随机生成雪花下落 结束 时的透明度
    var endOpacity = 0.3 + 0.2 * Math.random();
    //克隆一个雪花模板
    var cloneFlake = flake.cloneNode(true);
    cloneFlake.innerHTML = contents[Math.round(Math.random() * (contents.length - 1))]
    if(cloneFlake.innerHTML === '🎁'){
      cloneFlake.onclick = function () {
        let num = getRandom(imagesPaths.length)
        dialogImage.value = require('@/pages/christmas/assets/photos' + imagesPaths[num].substring(1))
        dialogVisable.value = true
      }
    }
    //第一次修改样式，定义克隆出来的雪花的样式
    cloneFlake.style.cssText += `
            left: ${startLeft}px;
            opacity: ${startOpacity};
            font-size:${flakeSize}px;
            top:-30px;
            transition:${durationTime}ms;
           `;
    //拼接到页面中
    document.body.appendChild(cloneFlake);

    //设置第二个定时器，一次性定时器，
    //当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；
    setTimeout(function() {
      //第二次修改样式
      cloneFlake.style.cssText += `
                left: ${endLeft}px;
                top:${documentHieght - Math.random() * 10}px;
                opacity:${endOpacity};
              `;

      //4、设置第三个定时器，当雪花落下后，删除雪花。
      setTimeout(function() {
        cloneFlake.remove();
      }, durationTime + 3000);
    }, 100);
  }, millisec);
}
snow();

</script>


<style scoped>
.middle {
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
}
.box-card {
  width: 480px;
}
:deep(.el-dialog__body){
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
:deep(.el-card__body){
  padding: 5px;
}
:deep(.el-dialog__header){
  display: none;
}
#result :deep(.el-card__header){
  padding: 10px;
}
#content {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url("./assets/background.jpg") no-repeat 30% 0%/ cover;
  height: 100%;
}

#personCard,#clickButton{
  opacity: 0.7;
}
</style>