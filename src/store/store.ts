import { contact } from "@/scripts/contact";

export namespace store {
  export class State {
    public isInited: boolean = false;
    public chatting: contact.Group | contact.Private | null = null;
    public groups: contact.Group[] = [];
    public privates: contact.Private[] = [];
  }
}
