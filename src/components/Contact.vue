<template>
  <div class="cont">
    <el-collapse v-model="collapse">
      <el-collapse-item title name="group">
        <div class="cont-title" slot="title">
          <i class="fas fa-users"></i>
          <span>群聊</span>
        </div>
        <div
          class="cont-item"
          :class="{'select': chatting.id === item.id}"
          v-for="(item, index) in groups"
          :key="index"
          @click="select(item)"
        >{{item.name}}</div>
      </el-collapse-item>
      <el-collapse-item title="私聊" name="private">
        <div class="cont-title" slot="title">
          <i class="fas fa-user"></i>
          <span>私聊</span>
        </div>
        <i class="cont-add fas fa-plus" @click="addPriv"></i>
        <div
          class="cont-item"
          :class="{'select': chatting.id === item.id}"
          v-for="(item, index) in privates"
          :key="index"
          @click="select(item)"
        >{{item.name}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { contact } from "@/scripts/contact";

@Component({})
export default class ComContact extends Vue {
  private collapse: string = "";

  private get chatting(): contact.Group | contact.Private | null {
    return this.$store.state.chatting;
  }

  private get groups() {
    return this.$store.state.groups;
  }

  private get privates() {
    return this.$store.state.privates;
  }

  private mounted() {
    this.chatting instanceof contact.Group
      ? (this.collapse = "group")
      : (this.collapse = "private");
  }

  private select(item: contact.Group | contact.Private) {
    this.$store.commit("setChatting", item);
  }

  private addPriv() {
    this.$prompt("请输入对方pubKey", "提示")
      .then((data: any) => {
        if (!data.value) {
          return;
        }
        const pubKey = data.value;
        const priv = new contact.Private(pubKey, "user", pubKey);
        this.$store.commit("addPrivate", priv);
      })
      .catch((err: Error) => {});
  }
}
</script>

<style lang="postcss" scoped>
.cont {
  &-title {
    color: var(--color-primary-text);
    margin-left: 10px;
    font-weight: 600;
    span {
      margin-left: 10px;
    }
  }

  &-item {
    background: var(--color-extra-light-border);
    color: var(--color-regular-text);
    cursor: pointer;
    padding: 5px 40px;
    &:hover {
      background: var(--color-lighter-border);
    }
  }

  &-add {
    width: 100px;
    margin-left: 40px;
    cursor: pointer;
  }

  & >>> .el-collapse-item__wrap,
  & >>> .el-collapse-item__header {
    background: var(--color-extra-light-border);
  }
}

.select {
  position: relative;
  background: #fff;
  &::before {
    position: absolute;
    top: 45%;
    left: 25px;
    content: "";
    width: 5px;
    height: 5px;
    background: var(--color-success);
    border-radius: 50%;
  }
  &:hover {
    background: #fff;
  }
}
</style>