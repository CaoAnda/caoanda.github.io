<template >
  <div style="display: flex; flex-direction: column; align-items: center" id="content">
    <el-card id="personCard" class="box-card" shadow="always" style="width: 350px; margin: 20px auto;;">
      <template #header>
        <div class="card-header middle">
          / πββπππββπ /
        </div>
      </template>
      <div v-for="person in persons" class="text item" style="margin: 20px 35px">
        <el-row>
          <el-avatar :src=person.imgSrc></el-avatar>
          <span style="flex-grow: 1;  font-size: larger" class="middle">{{person.name}}</span>
          <span v-if="addr === person.addr" style=" font-size: larger; margin-top: auto;margin-bottom: auto;">πΆ</span>
          <span v-else-if="'ε°η' === person.name" style=" font-size: larger; margin-top: auto;margin-bottom: auto;">π</span>
          <span v-else style=" font-size: larger; margin-top: auto;margin-bottom: auto; color: transparent">πΆ</span>
        </el-row>
      </div>
    </el-card>
    <div style="color: lightgray">
      π {{addr}} π 
    </div>
    <el-card id="clickButton" shadow="always" style=" font-size: 70px; margin: 30px" @click="getGiftReciever" >
      π
    </el-card>

  </div>

  <div>
    <el-dialog v-model="dialogVisable[0].value" style="width: fit-content">
      <el-card shadow="always">
        <el-image :src="dialogImage[0].value" style="width: 300px" alt="θΏζ―δΈεΌ εΎη.jpg"></el-image>
      </el-card>
    </el-dialog>
    <el-dialog v-model="dialogVisable[1].value" style="width: fit-content">
      <el-card shadow="always">
        <el-image :src="dialogImage[1].value" style="width: 300px" alt="θΏζ―δΈεΌ εΎη.jpg"></el-image>
      </el-card>
    </el-dialog>

    <el-dialog v-model="ResultDialogVisable" style=" width: fit-content">
      <el-card id="result" shadow="always">
        <template #header >
          <div style="font-size: 20px; text-align: center;">
            πππ¦π·πππ§¦ππ
          </div>
        </template>
        <el-image :src="ResultDialogImage" style="width: 300px" alt="ζ½ε‘η»ζ.jpg"></el-image>
      </el-card>
    </el-dialog>
  </div>


</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElNotification} from 'element-plus'

let dialogVisable = [ref(false), ref(false)]
let dialogImage = [ref(''), ref('')]
let dialogID = ref(0)
let ResultDialogVisable = ref(false)
let ResultDialogImage = ref()

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
    addr: 'ε?ζ³’εΈ'
  },
  {
    name: 'ηδΊη²',
    imgSrc: require('@/pages/christmas/assets/wyz.jpg'),
    addr: 'ζ·±ε³εΈ'
  },
  {
    name: 'θ±ζ²Ήε°θΆ',
    imgSrc: require('@/pages/christmas/assets/fc.jpg'),
    addr: 'ζ­ε·εΈ'
  },
  {
    name: 'ε°η',
    imgSrc: require('@/pages/christmas/assets/xh.jpg'),
    addr: 'δΈ΄εΉ³'
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
  // addr.value = 'ζ·±ε³εΈ'

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
        title: 'ε?δ½ιθ――',
        message: 'ζ¨ηε?δ½ε¨' + addr.value,
        type: 'error',
        duration: 2000
      })
    }
  }, animation())

}
preLoadNextImage()
dialogID.value += 1
function preLoadNextImage(){
  let num = getRandom(imagesPaths.length)
  dialogImage[(dialogID.value + 1) % dialogImage.length].value = require('@/pages/christmas/assets/photos' + imagesPaths[num].substring(1))
}
// dialogVisable[dialogID.value % dialogVisable.length].value = true
// console.log()

function snow() {
  //  1γε?δΉδΈηιͺθ±ζ¨‘ζΏ
  var flake = document.createElement('div');
  // ιͺθ±ε­η¬¦ βββββ»βΌββββ₯βΊ
  var contents = ['π', 'β', 'π΅', 'π¦', 'π·', 'π§¦']
  flake.innerHTML = 'β';
  // flake.innerHTML = 'β';
  // flake.innerHTML = 'π';
  flake.style.cssText = 'position:absolute;color:#000;';
  //θ·ει‘΅ι’ηι«εΊ¦ ηΈε½δΊιͺθ±δΈθ½η»ζζΆYθ½΄ηδ½η½?
  var documentHieght = window.innerHeight - 50;
  //θ·ει‘΅ι’ηε?½εΊ¦οΌε©η¨θΏδΈͺζ°ζ₯η?εΊοΌιͺθ±εΌε§ζΆleftηεΌ
  var documentWidth = window.innerWidth - 30;
  //ε?δΉηζδΈηιͺθ±ηζ―«η§ζ°
  var millisec = 400;
  //2γθ?Ύη½?η¬¬δΈδΈͺε?ζΆε¨οΌε¨ζζ§ε?ζΆε¨οΌζ―ιδΈζ?΅ζΆι΄οΌmillisecοΌηζδΈηιͺθ±οΌ
  setInterval(function() { //ι‘΅ι’ε θ½½δΉεοΌε?ζΆε¨ε°±εΌε§ε·₯δ½
    //ιζΊηζιͺθ±δΈθ½ εΌε§ ζΆleftηεΌοΌηΈε½δΊεΌε§ζΆXθ½΄ηδ½η½?
    var startLeft = Math.random() * documentWidth;
    //ιζΊηζιͺθ±δΈθ½ η»ζ ζΆleftηεΌοΌηΈε½δΊη»ζζΆXθ½΄ηδ½η½?
    var endLeft = (Math.random() * 1.0 - 0.5) * documentWidth + startLeft;
    if (endLeft < 0){
      endLeft = -endLeft
    }
    else if (endLeft > documentWidth){
      endLeft -= documentWidth
    }
    //ιζΊηζιͺθ±ε€§ε°
    var flakeSize = 10 + 15 * Math.random();
    //ιζΊηζιͺθ±δΈθ½ζη»­ζΆι΄
    var durationTime = 12000 + 3000 * Math.random();
    //ιζΊηζιͺθ±δΈθ½ εΌε§ ζΆηιζεΊ¦
    var startOpacity = 0.7 + 0.3 * Math.random();
    //ιζΊηζιͺθ±δΈθ½ η»ζ ζΆηιζεΊ¦
    var endOpacity = 0.3 + 0.2 * Math.random();
    //ειδΈδΈͺιͺθ±ζ¨‘ζΏ
    var cloneFlake = flake.cloneNode(true);
    cloneFlake.innerHTML = contents[Math.round(Math.random() * (contents.length - 1))]
    if(cloneFlake.innerHTML === 'π'){
      cloneFlake.onclick = function () {
        preLoadNextImage()
        // console.log(dialogVisable)
        dialogVisable[dialogID.value % dialogVisable.length].value = true
        dialogID.value += 1
      }
    }
    //η¬¬δΈζ¬‘δΏ?ζΉζ ·εΌοΌε?δΉειεΊζ₯ηιͺθ±ηζ ·εΌ
    cloneFlake.style.cssText += `
            left: ${startLeft}px;
            opacity: ${startOpacity};
            font-size:${flakeSize}px;
            top:-30px;
            transition:${durationTime}ms;
           `;
    //ζΌζ₯ε°ι‘΅ι’δΈ­
    document.body.appendChild(cloneFlake);

    //θ?Ύη½?η¬¬δΊδΈͺε?ζΆε¨οΌδΈζ¬‘ζ§ε?ζΆε¨οΌ
    //ε½η¬¬δΈδΈͺε?ζΆε¨ηζιͺθ±οΌεΉΆε¨ι‘΅ι’δΈζΈ²ζεΊζ₯εοΌδΏ?ζΉιͺθ±ηζ ·εΌοΌθ?©ιͺθ±ε¨θ΅·ζ₯οΌ
    setTimeout(function() {
      //η¬¬δΊζ¬‘δΏ?ζΉζ ·εΌ
      cloneFlake.style.cssText += `
                left: ${endLeft}px;
                top:${documentHieght - Math.random() * 10}px;
                opacity:${endOpacity};
              `;

      //4γθ?Ύη½?η¬¬δΈδΈͺε?ζΆε¨οΌε½ιͺθ±θ½δΈεοΌε ι€ιͺθ±γ
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