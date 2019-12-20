<template>
  <div class="chat">
    <div class="chat-top">chat</div>
    <div class="chat-main" ref="main">
      <div class="chat-main-item" v-for="(item, index) in chats" :key="index">
        <CompMessage :msg="item" />
        <span id="chat-main__tail" ref="tail"></span>
      </div>
    </div>
    <div class="chat-input">
      <el-input
        class="chat-input__area"
        v-model="msg"
        type="textarea"
        @keydown.enter.exact.native="handleEnter"
      ></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CompMessage from "@/components/Message.vue";
import { message } from "@/scripts/message";
const Shh = require("web3-shh");
import hexutil from "@/scripts/hexutil";

@Component({
  components: { CompMessage }
})
export default class Chart extends Vue {
  private msg: string = "";
  private chats: message.Message[] = [];
  private shh: any;
  private symKeyID: string = "";
  private topic: string = "0xaabbccdd";

  private async created() {
    this.shh = new Shh("ws://localhost:8546");
    this.symKeyID = await this.shh.generateSymKeyFromPassword("hello");

    this.shh.subscribe(
      "messages",
      {
        symKeyID: this.symKeyID,
        topics: [this.topic]
      },
      (error: Error, message: any, subscription: any) => {
        const msgHex: string = message.payload;
        const msg: message.Message = hexutil.decodeFromHex(msgHex);
        this.chats.push(msg);
      }
    );
  }

  private async handleEnter() {
    if (!this.msg) {
      return;
    }
    const msgFix = this.msg.trim();
    if (!msgFix) {
      return;
    }

    const msg: message.Message = new message.Message("Tom", msgFix, Date.now());

    const symKeyID = await this.shh.generateSymKeyFromPassword("hello");

    const hash = await this.shh.post({
      symKeyID: this.symKeyID,
      topic: this.topic,
      payload: hexutil.encodeToHex(JSON.stringify(msg)),
      powTime: 3,
      powTarget: 0.5
    });

    setTimeout(() => {
      this.msg = "";
      this.scrollBottom();
    }, 100);
  }

  private scrollBottom() {
    const comp: any = this.$refs.main;
    comp.scrollTop = comp.scrollHeight;
  }
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
    overflow-y: auto;
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