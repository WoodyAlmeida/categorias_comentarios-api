import IPacket from '../packet';

class Auth implements IPacket {

    ID: number = 0;
    Data: any = {};

    constructor(data: any){
        this.Data = {};
        if (data)
            this.Data = data;

        this.Data.ID = 1000;
    }

    get User(): any {
        return this.Data.user;
    }
    set User(value: any){
        this.Data.user = value;
    }

    get Name(): any {
        return this.Data.name;
    }
    set Name(value: any){
        this.Data.name = value;
    }

    get Role(): any {
        return this.Data.role;
    }
    set Role(value: any){
        this.Data.role = value;
    }

    get UID(): any {
        return this.Data.uid;
    }
    set UID(value: any){
        this.Data.uid = value;
    }

    Send(client: any){
        client.Send(this);
    }

}

export default Auth;