
export abstract class Responder {
  abstract Response(messages: string[]): Promise<string>;
}
export class EchoResponder {
  Response(messages: string[]) {
    return (async (message: string) => { return 'Echo: ' + message; })(messages[messages.length - 1]);
  }
}
