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
      const user: User = JSON.parse(str)
      return user
    }

    public keypair: string;
    public name: string;
    public head: string;

    constructor(keypair: string, name: string, head: string) {
      this.keypair = keypair;
      this.name = name;
      this.head = head;
    }


    public save() {
      const str: string = JSON.stringify(this)
      localStorage.setItem(key, str)
    }

  }

}
