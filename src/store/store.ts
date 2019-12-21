import { contact } from "@/scripts/contact";
import { message } from "@/scripts/message";

export namespace store {
  export class State {
    public isInited: boolean = false;
    public chatting: contact.Group | contact.Private | null = null;
    public groups: contact.Group[] = [];
    public privates: contact.Private[] = [];
    public chatLogs: Map<number, message.Message[]> = new Map<number, message.Message[]>();
  }
}
