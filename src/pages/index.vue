<template>
  <div class="home">
    <div class="home-cont">
      <Contact />
    </div>
    <div class="home-chat">
      <Chat v-if="chatting"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Contact from "@/components/Contact.vue";
import Chat from "@/components/Chat.vue";
import { contact } from "@/scripts/contact";
@Component({
  components: { Contact, Chat }
})
export default class Home extends Vue {
  private get chatting(): contact.Group | contact.Private {
    return this.$store.state.chatting;
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

  &-cont {
    flex: 1;
    background: var(--color-extra-light-border);
  }

  &-chat {
    flex: 3;
  }
}
</style>
