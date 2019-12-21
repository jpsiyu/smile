const Web3 = require("web3");
import { message } from "@/scripts/message";
import store from '@/store';

export namespace shh {
  const web3 = new Web3()
  const POW_TIME: number = 3;
  const POW_TARGET: number = 0.5;

  export class Visitor {
    private url: string = "ws://localhost:8546";
    private symPasswd: string = "apple&banana";
    private symKeyID: string = "";

    public async init(topics: string[]) {
      web3.setProvider(new Web3.providers.WebsocketProvider(this.url))
      await web3.eth.net.isListening()

      this.symKeyID = await web3.shh.generateSymKeyFromPassword(this.symPasswd);

      for (let topic of topics) {
        const options: any = {
          symKeyID: this.symKeyID,
          topics: [topic],
        }
        web3.shh.subscribe("messages", options, this.rece)
      }
    }

    public async send(topic: string, message: message.Message) {
      const hash = await web3.shh.post({
        symKeyID: this.symKeyID,
        topic,
        payload: web3.utils.utf8ToHex(JSON.stringify(message)),
        powTime: POW_TIME,
        powTarget: POW_TARGET,
      });
    }

    public rece(error: Error, message: any, subscription: any) {
      if (!message) {
        return
      }
      const msgHex: string = message.payload;
      const msgStr: string = web3.utils.hexToUtf8(msgHex);
      const msg: message.Message = JSON.parse(msgStr)
      store.commit("pushMessage", msg)
    }

  }

  export const newKeyPair = async (): Promise<any> => {
    return web3.shh.newKeyPair();
  }

  export const getPubFromKeyPair = async (keypair: string): Promise<any> => {
    return web3.shh.getPublicKey(keypair)
  }
}
