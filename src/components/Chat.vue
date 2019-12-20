<template>
  <div class="chat">
    <div class="chat-top">chat</div>
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
  background: var(--color-extra-light-border);
  height: 100%;
  &-top {
    background: var(--color-lighter-border);
    height: 30px;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
  }
}
</style>