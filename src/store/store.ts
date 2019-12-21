import { contact } from "@/scripts/contact";
import { message } from "@/scripts/message";
import { user } from "@/scripts/user";

export namespace store {
  export class State {
    public isInited: boolean = false;
    public user: user.User | null = null;
    public chatting: contact.Group | contact.Private | null = null;
    public groups: contact.Group[] = [];
    public privates: contact.Private[] = [];
    public chatLogs: Map<number, message.Message[]> = new Map<number, message.Message[]>();
  }
}
