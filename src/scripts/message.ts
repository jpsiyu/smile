export namespace message {
  export class Message {
    public chatID: number;
    public sender: string;
    public content: string;
    public timestamp: number;
    constructor(chatID: number, sender: string, content: string, timestamp: number) {
      this.chatID = chatID;
      this.sender = sender;
      this.content = content;
      this.timestamp = timestamp;
    }
  }
}
