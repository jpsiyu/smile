<template>
  <div class="chat">
    <div class="chat-top">chat</div>
    <div class="chat-main">main</div>
    <div class="chat-input">
      <el-input class="chat-input__area" v-model="msg" type="textarea"></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Chart extends Vue {
  private msg: string = "";
}
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
    border-bottom: 1px solid var(--color-light-border);
  }
  &-main {
    flex: 1;
  }
  &-input {
    height: 100px;
    border-top: 1px solid var(--color-light-border);
    &__area {
      height: 100%;
      & >>> .el-textarea__inner {
        border: none;
        height: 100%;
        resize: none;
      }
    }
  }
}
</style>