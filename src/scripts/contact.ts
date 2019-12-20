export namespace Contact {
  export class Group {
    public id: number;
    public name: string;
    public password: string;
    public topic: string;

    constructor(id: number, name: string, password: string, topic: string) {
      this.id = id;
      this.name = name;
      this.password = password;
      this.topic = topic;
    }
  }

  export class Private {
    public name: string;
    public pubKey: string;

    constructor(id: number, name: string, pubKey: string) {
      this.id = id;
      this.name = name;
      this.pubKey = pubKey;
    }
  }
}
