export default class Rabbit {
    sendToQueue(..._args: any[]): void;
    assertQueue(..._args: any[]): void;
}
export declare type RabbitConnection = Promise<Rabbit>;
declare const rabbitConnection: RabbitConnection;
export { rabbitConnection };
//# sourceMappingURL=Rabbit.connection.d.ts.map