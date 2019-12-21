const Web3 = require("web3");
import { message } from "@/scripts/message";
import { hexutil } from "@/scripts/hexutil";
import store from '@/store';

export namespace shh {
  export class Visitor {
    private url: string = "ws://localhost:8546";
    private symPasswd: string = "apple&banana";
    private symKeyID: string = "";
    private web3: any;

    public async init(topics: string[]) {
      this.web3 = new Web3();
      this.web3.setProvider(new Web3.providers.WebsocketProvider(this.url))
      await this.web3.eth.net.isListening()

      this.symKeyID = await this.web3.shh.generateSymKeyFromPassword(this.symPasswd);

      for (let topic of topics) {
        const options: any = {
          symKeyID: this.symKeyID,
          topics: [topic],
        }
        this.web3.shh.subscribe("messages", options, this.rece)
      }
    }

    public async send(topic: string, message: message.Message) {
      const hash = await this.web3.shh.post({
        symKeyID: this.symKeyID,
        topic,
        payload: hexutil.encodeToHex(JSON.stringify(message)),
        powTime: 3,
        powTarget: 0.5
      });
    }

    public rece(error: Error, message: any, subscription: any) {
      if (!message) {
        return
      }
      const msgHex: string = message.payload;
      const msg: message.Message = hexutil.decodeFromHex(msgHex);
      store.commit("pushMessage", msg)
    }

  }
}
