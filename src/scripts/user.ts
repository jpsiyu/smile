import { shh } from "../scripts/shh";

export namespace user {
  const key: string = "smile_user";

  export class User {
    public static isExist(): boolean {
      return localStorage.getItem(key) !== null
    }

    public static load(): User | null {
      const str = localStorage.getItem(key)
      if (!str) {
        return null
      }
      const userData: any = JSON.parse(str)
      const user: User = new User(userData.keypair, userData.name, userData.head)
      return user
    }

    public keypair: string;
    public name: string;
    public head: string;
    public pubKey: string;

    constructor(keypair: string, name: string, head: string) {
      this.keypair = keypair;
      this.name = name;
      this.head = head;
      this.pubKey = "";
    }

    public async fillPubKey(): Promise<string> {
      if (this.pubKey) {
        return Promise.resolve(this.pubKey)
      }
      return shh.getPubFromKeyPair(this.keypair)
        .catch((err: Error) => {
          throw (err)
        })
    }

    public setPubKey(pubKey: string) {
      this.pubKey = pubKey
    }

    public save() {
      const str: string = JSON.stringify(this)
      localStorage.setItem(key, str)
    }

    public async init(): Promise<void> {
      const isValid: boolean = await shh.isKeyPairValid(this.keypair)
      if (isValid) {
        return Promise.resolve()
      }

      const keyPair: string = await shh.newKeyPair()
      console.log("regenerate key pair", keyPair)
      this.keypair = keyPair
      this.save()
      await this.fillPubKey()
    }
  }

}
