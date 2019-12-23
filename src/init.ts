import store from "@/store"
import { contact } from "@/scripts/contact";
import { user } from "@/scripts/user";
import visitor from "@/plugins/visitor";
import router from '@/router';
import { shh } from "@/scripts/shh";

const init = async (): Promise<void> => {
  const groups: contact.Group[] = [
    new contact.Group('word', '工作', 'work', '0xaabbccdd'),
    new contact.Group("living", '生活', 'living', '0x11223344'),
    new contact.Group("entainment", '娱乐', 'entertainment', '0xaa22bb44'),
  ];

  const privates: contact.Private[] = [];

  await shh.initWeb3()

  let me = user.User.load()
  if (!me) {
    router.push({ path: "/signup" })
    return Promise.reject()
  }

  return Promise.resolve()
    .then(() => {
      return me!.init()
    })
    .then(() => {
      store.commit("setUser", me)
      store.commit("setGroups", groups);
      store.commit("setPrivates", privates);
      store.commit("setChatting", groups[0]);
    })
    .then(() => {
      visitor.startPrivSubscribe(me!.keypair)

      const topics: string[] = groups.map((e: contact.Group) => {
        return e.topic
      })
      return visitor.startSubscribe(topics)
    })
    .then(() => {
      console.log("init done")
      store.commit("setInit", true);
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

export default init
