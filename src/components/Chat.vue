<template>
  <div class="chat">
    <div class="chat-top">chat</div>
    <div class="chat-main">
      main
    </div>
    <div class="chat-input"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Chart extends Vue {}
</script>

<style lang="postcss" scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-top {
    height: 40px;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
  }
  &-main{
    flex: 1;
  }
  &-input{
    height: 100px;
    margin: 5px;
  }
}
</style>