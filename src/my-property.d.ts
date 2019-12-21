import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: any;
    $shh: any;
    $msgVerify: Function;
    $msgError: Function;
    $deleteEmpty: Function;
  }
}
