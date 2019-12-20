export namespace message {
  export class Message {
    public sender: string;
    public content: string;
    public timestamp: number;
    constructor(sender: string, content: string, timestamp: number) {
      this.sender = sender;
      this.content = content;
      this.timestamp = timestamp;
    }
  }
}
