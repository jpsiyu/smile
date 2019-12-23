<template>
  <div class="home">
    <div class="home-cont">
      <Contact />
    </div>
    <div class="home-chat">
      <Chat v-if="chatting" />
    </div>
    <div class="home-me">
      <span>{{me.name}}</span>
      <span class="home-me__pub">{{me.pubKey}}</span>
      <span class="home-me__copy" @click="copy">复制</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Contact from "@/components/Contact.vue";
import Chat from "@/components/Chat.vue";
import { contact } from "@/scripts/contact";
import { user } from "@/scripts/user";

@Component({
  components: { Contact, Chat }
})
export default class Home extends Vue {
  private get chatting(): contact.Group | contact.Private {
    return this.$store.state.chatting;
  }

  private get me(): user.User {
    return this.$store.state.user;
  }

  private copy() {
    this.$copyText(this.me.pubKey).then(() => {
      this.$message({ message: "Publick Key 已复制到剪贴板", type: "success" });
    });
  }
}
</script>

<style lang="postcss" scoped>
.home {
  color: var(--color-regular-text);
  width: 900px;
  height: 500px;
  margin: 50px auto;
  box-shadow: 0 0 3px 2px rgba(200, 200, 200, 0.5);
  display: flex;
  position: relative;

  &-cont {
    flex: 1;
    background: var(--color-extra-light-border);
  }

  &-chat {
    flex: 3;
  }

  &-me {
    display: flex;
    align-items: center;
    position: absolute;
    top: -30px;
    &__pub {
      margin-left: 20px;
      display: inline-block;
      white-space: nowrap;
      width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__copy {
      margin-left: 20px;
      cursor: pointer;
      display: inline-block;
      font-size: 12px;
      border: 1px solid #e4e7ed;
      border-radius: 10px;
      padding: 0 10px;
    }
  }
}
</style>
