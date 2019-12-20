<template>
  <div class="cont">
    <el-collapse v-model="collapse">
      <el-collapse-item title name="group">
        <div class="cont-title" slot="title">
          <i class="fas fa-users"></i>
          <span>群聊</span>
        </div>
        <div
          class="cont-group-item"
          :class="{'select': selectedGroup && selectedGroup.id === item.id}"
          v-for="(item, index) in groups"
          :key="index"
          @click="selectGroup(item)"
        >{{item.name}}</div>
      </el-collapse-item>
      <el-collapse-item title="私聊" name="single">
        <div class="cont-title" slot="title">
          <i class="fas fa-user"></i>
          <span>私聊</span>
        </div>
        <div
          class="cont-priv-item"
          :class="{'select': selectedPrivate && selectedPrivate.id === item.id}"
          v-for="(item, index) in privates"
          :key="index"
          @click="selectPrivate(item)"
        >{{item.name}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Contact } from "@/scripts/contact";
import contactCfg from "@/scripts/contactCfg";

@Component({})
export default class ComContact extends Vue {
  private collapse: string = "";
  private selectedGroup: Contact.Group | null = null;
  private selectedPrivate: Contact.Private | null = null;

  private get groups() {
    return contactCfg.groups;
  }

  private get privates() {
    return contactCfg.privates;
  }

  private selectGroup(group: Contact.Group) {
    this.selectedGroup = group;
    this.selectedPrivate = null;
  }

  private selectPrivate(priv: Contact.Private) {
    this.selectedPrivate = priv;
    this.selectedGroup = null;
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

  &-group,
  &-priv {
    &-item {
      color: var(--color-regular-text);
      cursor: pointer;
      padding: 5px 40px;
      &:hover {
        background: var(--color-lighter-border);
      }
    }
  }
}

.select {
  position: relative;
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
}
</style>