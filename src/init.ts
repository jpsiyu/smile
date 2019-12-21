import store from "@/store"
import { contact } from "@/scripts/contact";

const init = (): Promise<void> => {
  return Promise.resolve()
    .then(() => {
      const groups: contact.Group[] = [
        new contact.Group(100, '工作', 'work', '0xaabbccdd'),
        new contact.Group(101, '生活', 'living', '0x11223344'),
        new contact.Group(102, '娱乐', 'entertainment', '0xaa22bb44'),
      ];

      const privates: contact.Private[] = [
        new contact.Private(1001, "Stephen Wu", "0x123"),
        new contact.Private(1002, "Kawai Lenard", "0x456"),
      ];

      store.commit("setGroups", groups);
      store.commit("setPrivates", privates);
      store.commit("setChatting", groups[0]);

      store.commit("setInit", true);
    })
}

export default init
