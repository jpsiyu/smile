<template>
  <el-dialog class="af" :append-to-body="true" :visible.sync="visible" width="400px">
    <div class="af-title" slot="title">添加联系人</div>
    <el-form :model="userInput" ref="form">
      <el-form-item prop="name" label="昵称" placeholder="请输入昵称">
        <el-input v-model="userInput.name"></el-input>
      </el-form-item>
      <el-form-item prop="pubKey" label="Public Key" placeholder="请输入联系人的 publick key">
        <el-input v-model="userInput.pubKey"></el-input>
      </el-form-item>
    </el-form>
    <div class="af-footer" slot="footer">
      <el-button @click="hide">取消</el-button>
      <el-button @click="sure" type="primary" :disabled="!pass">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { contact } from "@/scripts/contact";

class UserInput {
  public name: string = "";
  public pubKey: string = "";
}

@Component({})
export default class AddFriend extends Vue {
  private userInput: UserInput = new UserInput();
  private visible: boolean = false;

  private get pass(): boolean {
    return this.userInput.name !== "" && this.userInput.pubKey !== "";
  }

  private show() {
    this.visible = true;
  }

  private hide() {
    this.reset();
    this.visible = false;
  }

  private reset() {
    const form: any = this.$refs.form;
    form.resetFields();
  }

  private sure() {
    const priv = new contact.Private(
      this.userInput.pubKey,
      this.userInput.name,
      this.userInput.pubKey
    );

    this.$store.commit("addPrivate", priv);
    this.hide();
  }
}
</script>