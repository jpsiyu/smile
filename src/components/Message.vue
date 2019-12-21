<template>
  <div class="msg" :class="{'me': isMe}">
    <div class="msg-head">
      <img :src="msg.head" alt class="msg-head__img" />
    </div>
    <div class="msg-main">
      <span class="msg-main__name">{{msg.sender}}</span>
      <div class="msg-main__content">{{msg.content}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { message } from "@/scripts/message";
import { user } from "@/scripts/user";

@Component({
  props: ["msg"]
})
export default class Message extends Vue {
  private get me(): user.User {
    return this.$store.state.user;
  }

  private get isMe(): boolean {
    const res = this.me.pubKey === this.msg.pubKey;
    console.log("is me", res);
    return res;
  }
}
</script>

<style lang="postcss" scoped>
.msg {
  margin: 10px;
  display: flex;
  &-head {
    &__img {
      width: 30px;
      height: 30px;
    }
  }
  &-main {
    margin-left: 10px;
    display: flex;
    flex-direction: column;

    &__name {
      font-size: 12px;
      color: var(--color-secondary-text);
    }

    &__content {
      max-width: 200px;
      background: var(--color-extra-light-border);
      padding: 5px 10px;
      word-break: break-all;
      white-space: pre-line;
    }
  }
}
</style>