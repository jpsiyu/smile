<template>
  <div class="cont">
    <el-collapse v-model="collapse">
      <el-collapse-item title name="group">
        <div class="cont-title" slot="title">
          <i class="fas fa-users"></i>
          <span>群聊</span>
        </div>
        <div class="cont-group-item select">工作</div>
        <div class="cont-group-item">生活</div>
        <div class="cont-group-item">娱乐</div>
      </el-collapse-item>
      <el-collapse-item title="私聊" name="single">
        <div class="cont-title" slot="title">
          <i class="fas fa-user"></i>
          <span>私聊</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Contact extends Vue {
  private collapse: string = "";
}
</script>

<style lang="postcss" scoped>
.cont {
  &-title {
    margin-left: 10px;
    span {
      margin-left: 10px;
    }
  }

  &-group {
    &-item {
      cursor: pointer;
      padding: 5px 20px;
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
    left: 10px;
    content: "";
    width: 5px;
    height: 5px;
    background: var(--color-success);
    border-radius: 50%;
  }
}
</style>