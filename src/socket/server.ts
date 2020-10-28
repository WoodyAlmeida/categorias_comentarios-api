import * as Settings from '../settings';
import * as io from 'socket.io';
import { createServer, Server } from 'http';
import IPacket, { HandleData } from './packet';

export default class AServer {

    public static readonly PORT: number = 9633;
    public pool: Array<any> = [];
    public last_activities: any = [];
    private sio: any = {};
    private port: string | number = 0;
    private server: Server = createServer();

    constructor() {
        this.createServer();
        this.sockets();
        this.listen();
    }

    public sendTo(userid: any, data: any) {
        for (let i = 0; i < this.pool.length; i++) {
            try {
                let c = this.pool[i];
                if (Number.parseInt(c.user) === Number.parseInt(userid)) {
                    c.Send(data);
                }
            }
            catch (ex) {
                Settings.logError(ex.message);
            }
        }
    }

    public sendToAll(data: IPacket) {
        for (let i = 0; i < this.pool.length; i++) {
            let c = this.pool[i];
            c.Send(data);
        }
    }

    public sendToAllRole(role: any, data: IPacket) {
        for (let i = 0; i < this.pool.length; i++) {
            let c = this.pool[i];
            if (c && c.role && c.role === role) {
                c.Send(data);
            }
        }
    }

    private createServer(): void {
        this.pool = Array();
        this.port = AServer.PORT;
        this.server = createServer();

        this.init();
    }

    private sockets(): void {
        this.sio = io(this.server, {
            origins: "*"
        });
    }

    private listen(): void {
        this.server.listen(this.port, async () => {
            Settings.logInfo('Socket Server started at port ' + this.port);
            //await Settings.loadNid()
            Settings.logInfo(`Notification counter started at ${Settings.NotificationID.Next}.`);
        });

        this.sio.on('connect', (socket: any) => {
        });
    }

    private init() {
    }
}

class AClient {
    public id: any;
    public user: any;
    public role: any;
    public name: any;
    public lastActivity: any;
    private socket: any;

    constructor(MainSocket: any) {
        this.socket = MainSocket;
        this.id = MainSocket.id;
        this.init();
    }

    init() {
        this.socket.on('disconnect', () => {
            this.Disconnect();
            if (this.user) {
                //Settings.logInfo(this.user + ' has disconnected!')
            }
        });

        this.socket.on('recv', (data: any) => {
            let _decryptedData = JSON.parse(data);
            HandleData(_decryptedData, this);
        });
    }

    Send(data: any) {
        try {
            if (data && data.Data)
                this.socket.emit('recv', JSON.stringify(data.Data));
        } catch (ex) {
            Settings.logError(ex.message);
        }
    }

    emit(data: any) {
        this.Send(data);
    }

    Disconnect() {
        /*for (let i = 0; i < Settings.NotificationService.pool.length; i++) {
            try {
                let c = Settings.NotificationService.pool[i]

                if (!c || (c && Number.parseInt(c.user) === Number.parseInt(this.user))) {
                    delete Settings.NotificationService.pool[i]
                }
            }
            catch (ex) {
                Settings.logError(ex.message)
            }
        }*/
    }

}

export { AClient };
