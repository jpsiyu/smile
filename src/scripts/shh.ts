const Shh = require("web3-shh");
import { message } from "@/scripts/message";
import { hexutil } from "@/scripts/hexutil";
import store from '@/store';

export namespace shh {
  export class Visitor {
    private url: string = "ws://localhost:8546";
    private symPasswd: string = "apple&banana";
    private symKeyID: string = "";
    private shh: any;

    public async init(topics: string[]) {
      this.shh = new Shh(this.url)
      this.symKeyID = await this.shh.generateSymKeyFromPassword(this.symPasswd);

      const options: any = {
        symKeyID: this.symKeyID,
        topics,
      }
      this.shh.subscribe("messages", options, this.rece)
    }

    public async send(topic: string, message: message.Message) {
      const hash = await this.shh.post({
        symKeyID: this.symKeyID,
        topic,
        payload: hexutil.encodeToHex(JSON.stringify(message)),
        powTime: 3,
        powTarget: 0.5
      });
    }

    private rece(error: Error, message: any, subscription: any) {
      console.log(message, subscription)
      const msgHex: string = message.payload;
      const msg: message.Message = hexutil.decodeFromHex(msgHex);
      store.commit("pushMessage", msg)
    }

  }
}
