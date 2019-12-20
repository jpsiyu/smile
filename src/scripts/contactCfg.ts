import { contact } from "@/scripts/contact";

const groups: contact.Group[] = [
  new contact.Group(100, '工作', 'work', 'work'),
  new contact.Group(101, '生活', 'living', 'living'),
  new contact.Group(102, '娱乐', 'entertainment', 'entertainment'),
]

const privates: contact.Private[] = [
  new contact.Private(1001, "Stephen Wu", "0x123"),
  new contact.Private(1002, "Kawai Lenard", "0x456"),
]

export default { groups, privates }
