import store from "@/store"
import { contact } from "@/scripts/contact";
import { user } from "@/scripts/user";
import visitor from "@/plugins/visitor";
import router from '@/router';
import { shh } from "@/scripts/shh";

const init = (): Promise<void> => {
  const groups: contact.Group[] = [
    new contact.Group(100, '工作', 'work', '0xaabbccdd'),
    new contact.Group(101, '生活', 'living', '0x11223344'),
    new contact.Group(102, '娱乐', 'entertainment', '0xaa22bb44'),
  ];

  const privates: contact.Private[] = [
    new contact.Private(1001, "Stephen Wu", "0x123"),
    new contact.Private(1002, "Kawai Lenard", "0x456"),
  ];


  let me = user.User.load()
  if (!me) {
    router.push({ path: "/signup" })
    return Promise.reject()
  }

  return Promise.resolve()
    .then(() => {
      return shh.initWeb3()
    })
    .then(() => {
      return me!.fillPubKey()
    })
    .then(() => {
      store.commit("setUser", me)
      store.commit("setGroups", groups);
      store.commit("setPrivates", privates);
      store.commit("setChatting", groups[0]);
    })
    .then(() => {
      const topics: string[] = groups.map((e: contact.Group) => {
        return e.topic
      })
      return visitor.startSubscribe(topics)
    })
    .then(() => {
      console.log("init done")
      store.commit("setInit", true);
    })
    .catch(() => { })
}

export default init
