<template>
  <div class="home">
    <div class="home-cont">
      <Contact />
    </div>
    <div class="home-chat">
      <Chat />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Contact from "@/components/Contact.vue";
import Chat from "@/components/Chat.vue";
@Component({
  components: { Contact, Chat }
})
export default class Home extends Vue {}
</script>

<style lang="postcss" scoped>
.home {
  width: 960px;
  height: 500px;
  margin: 50px auto;
  box-shadow: 0 0 3px 2px rgba(200, 200, 200, 0.5);
  display: flex;

  &-cont {
    border-right: 1px solid #dcdfe6;
    flex: 1;
  }

  &-chat {
    flex: 2;
  }
}
</style>
