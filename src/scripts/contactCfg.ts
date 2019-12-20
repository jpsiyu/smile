import { Contact } from "@/scripts/contact";

const groups: Contact.Group[] = [
  new Contact.Group(100, '工作', 'work', 'work'),
  new Contact.Group(101, '生活', 'living', 'living'),
  new Contact.Group(102, '娱乐', 'entertainment', 'entertainment'),
]

const privates: Contact.Private[] = [
  new Contact.Private(1001, "Stephen Wu", "0x123"),
  new Contact.Private(1002, "Kawai Lenard", "0x456"),
]

export default { groups, privates }
