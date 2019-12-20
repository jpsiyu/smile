export namespace Contact {
  export class Public {
    public name: string;
    public password: string;
    public topic: string;

    constructor(name: string, password: string, topic: string) {
      this.name = name;
      this.password = password;
      this.topic = topic;
    }
  }

  export class Private { }
}