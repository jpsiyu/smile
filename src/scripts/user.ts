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
      const user: User = new User(userData.keyPair, userData.name, userData.head)
      return user
    }

    public keyPair: string;
    public name: string;
    public head: string;
    public pubKey: string;

    constructor(keyPair: string, name: string, head: string) {
      this.keyPair = keyPair;
      this.name = name;
      this.head = head;
      this.pubKey = "";
    }

    public async fillPubKey(): Promise<void> {
      try {
        const pubKey = await shh.getPubFromKeyPair(this.keyPair)
        this.pubKey = pubKey
      } catch (err) {
        console.log(err)
      }
    }

    public setPubKey(pubKey: string) {
      this.pubKey = pubKey
    }

    public save() {
      const str: string = JSON.stringify(this)
      localStorage.setItem(key, str)
    }

    public async init(): Promise<void> {
      const isValid: boolean = await shh.isKeyPairValid(this.keyPair)
      if (!isValid) {
        const keyPair: string = await shh.newKeyPair()
        this.keyPair = keyPair
        this.save()
      }
      await this.fillPubKey()
    }
  }

}
