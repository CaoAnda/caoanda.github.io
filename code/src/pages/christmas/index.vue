<template >
  <div style="display: flex; flex-direction: column; align-items: center">
    <el-card class="box-card" shadow="always" style="width: 350px">
      <template #header>
        <div class="card-header middel">
          / 🎄⛄⛄🎁🔔🎁⛄⛄🎄 /
        </div>
      </template>
      <div v-for="person in persons" class="text item" style="margin-top: 20px;">
        <el-row>
          <el-avatar :src=person.imgSrc></el-avatar>
          <span style="flex-grow: 1;  font-size: larger" class="middel">{{person.name}}</span>
        </el-row>
      </div>
    </el-card>
  </div>


</template>

<script lang="ts" setup>
interface Person{
  name: string,
  imgSrc: string
}
let persons : Person[] =[
  {
    name: 'CAD',
    imgSrc: require('@/pages/christmas/assets/cad.jpg')
  },
  {
    name: '王二甲',
    imgSrc: require('@/pages/christmas/assets/wyz.jpg')
  },
  {
    name: '葱油封超',
    imgSrc: require('@/pages/christmas/assets/fc.jpg')
  },
]

async function snow() {
  //  1、定义一片雪花模板
  var flake = document.createElement('div');
  // 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺
  flake.innerHTML = '❆';
  // flake.innerHTML = '❄';
  // flake.innerHTML = '🔔';
  flake.style.cssText = 'position:absolute;color:#000;';
  //获取页面的高度 相当于雪花下落结束时Y轴的位置
  var documentHieght = window.innerHeight - 50;
  //获取页面的宽度，利用这个数来算出，雪花开始时left的值
  var documentWidth = window.innerWidth - 50;
  //定义生成一片雪花的毫秒数
  var millisec = 1000;
  //2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；
  setInterval(function() { //页面加载之后，定时器就开始工作
    //随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置
    var startLeft = Math.random() * documentWidth;
    //随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置
    var endLeft = (Math.random() * 1.4 - 0.7) * documentWidth + startLeft;
    endLeft = Math.min(Math.max(1, endLeft), documentWidth)
    //随机生成雪花大小
    var flakeSize = 5 + 20 * Math.random();
    //随机生成雪花下落持续时间
    var durationTime = 7000 + 2000 * Math.random();
    //随机生成雪花下落 开始 时的透明度
    var startOpacity = 0.7 + 0.3 * Math.random();
    //随机生成雪花下落 结束 时的透明度
    var endOpacity = 0.2 + 0.2 * Math.random();
    //克隆一个雪花模板
    var cloneFlake = flake.cloneNode(true);

    //第一次修改样式，定义克隆出来的雪花的样式
    cloneFlake.style.cssText += `
            left: ${startLeft}px;
            opacity: ${startOpacity};
            font-size:${flakeSize}px;
            top:-20px;
            transition:${durationTime}ms;
           `;
    //拼接到页面中
    console.log(cloneFlake, documentHieght)
    document.body.appendChild(cloneFlake);

    //设置第二个定时器，一次性定时器，
    //当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；
    setTimeout(function() {
      //第二次修改样式
      cloneFlake.style.cssText += `
                left: ${endLeft}px;
                top:${documentHieght}px;
                opacity:${endOpacity};
              `;

      //4、设置第三个定时器，当雪花落下后，删除雪花。
      setTimeout(function() {
        cloneFlake.remove();
      }, durationTime - 500);
    }, 0);

  }, millisec);
}
snow();

</script>

<style scoped>
.middel {
  text-align: center; margin-top: auto; margin-bottom: auto;
}
.box-card {
  width: 480px;
}
</style>