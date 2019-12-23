const Web3 = require("web3");
import { message } from "@/scripts/message";
import store from '@/store';

export namespace shh {
  const web3 = new Web3()
  const POW_TIME: number = 3;
  const POW_TARGET: number = 0.5;
  const URL: string = "ws://localhost:8546";

  export const newKeyPair = async (): Promise<string> => {
    return web3.shh.newKeyPair();
  }

  export const getPubFromKeyPair = async (keyPair: string) => {
    return web3.shh.getPublicKey(keyPair);
  }

  export const initWeb3 = async () => {
    web3.setProvider(new Web3.providers.WebsocketProvider(URL))
    await web3.eth.net.isListening()
  }

  export const isKeyPairValid = async (keyPair: string): Promise<boolean> => {
    try {
      let res = await web3.shh.hasKeyPair(keyPair)
      return Promise.resolve(res)
    } catch (err) {
      return Promise.resolve(false)
    }
  }

  export class Visitor {
    private symPasswd: string = "apple&banana";
    private symKeyID: string = "";


    public async startSubscribe(topics: string[]) {
      this.symKeyID = await web3.shh.generateSymKeyFromPassword(this.symPasswd);

      for (let topic of topics) {
        const options: any = {
          symKeyID: this.symKeyID,
          topics: [topic],
        }
        web3.shh.subscribe("messages", options, this.rece)
      }
    }

    public startPrivSubscribe(keyPair: string) {
      const options = {
        privateKeyID: keyPair
      }
      web3.shh.subscribe("messages", options, this.recePriv)
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

    public async sendPriv(pubKey: string, message: message.Message) {
      const hash = await web3.shh.post({
        pubKey,
        payload: web3.utils.utf8ToHex(JSON.stringify(message)),
        powTime: POW_TIME,
        powTarget: POW_TARGET,
      })
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

    public recePriv(error: Error, message: any, subscription: any) {
      if (!message) {
        return
      }
      const msgHex: string = message.payload;
      const msgStr: string = web3.utils.hexToUtf8(msgHex);
      const msg: message.Message = JSON.parse(msgStr)
      msg.chatID = msg.pubKey
      store.commit("pushMessage", msg)
    }

  }

}
