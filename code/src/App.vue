<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <br>
  <button @click="test">click</button>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class App extends Vue {}

</script>
<script lang="ts" setup>
// console.log('hello')
function test(){
  alert("I'm CAD")
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
