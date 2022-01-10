
export abstract class Responder {
  abstract Response(message: string): Promise<string>;
}
export class EchoResponder {
  Response(message: string) {
    return (async (message: string) => { return 'Echo: ' + message; })(message);
  }
}
