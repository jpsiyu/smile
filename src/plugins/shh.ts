import Vue from 'vue'
import { shh } from "@/scripts/shh"

const visitor = new shh.Visitor()

Vue.prototype.$shh = visitor

export default visitor
