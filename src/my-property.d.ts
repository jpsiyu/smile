import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: any;
    $visitor: any;
    $msgVerify: Function;
    $msgError: Function;
    $deleteEmpty: Function;
  }
}
