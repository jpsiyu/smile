import { contact } from "@/scripts/contact";

const groups: contact.Group[] = [
  new contact.Group(100, '工作', 'work', '0xaabbccdd'),
  new contact.Group(101, '生活', 'living', '0x11223344'),
  new contact.Group(102, '娱乐', 'entertainment', '0xaa22bb44'),
]

const privates: contact.Private[] = [
  new contact.Private(1001, "Stephen Wu", "0x123"),
  new contact.Private(1002, "Kawai Lenard", "0x456"),
]

export default { groups, privates }
