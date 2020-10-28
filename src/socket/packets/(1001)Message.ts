import IPacket from '../packet';
import * as Settings from '../../settings';

class Message implements IPacket {

    ID: number = 0;
    _data: any;

    constructor(data: any, isNew: boolean = true){
        this.Data = {};

        if (data) this.Data = data;

        if (isNew) this._data.created = Date.now();
        if (!this.Data.uid) this._data.uid = Settings.NotificationID.Next;

        this.Data.ID = 1001;
    }
    get StatusCode(){
        return {
            Unread: 0,
            Read: 1,
            Unregistered: 2
        };
    }

    get Data(): any {
        return this._data;
    }
    set Data(value: any){
        this._data = value;
        this._data.updated = Date.now();
        if (this._data.text && this._data.uid)
            this.updateValues(this._data);
    }

    get UID(): any {
        return this.Data.uid;
    }
    set UID(value: any){
        this.Data.uid = value;
        //this.updateValues(this._data)
    }

    get Created(): any {
        return this.Data.created;
    }
    set Created(value: any){
        this.Data.created = value;
    }

    get Updated(): any {
        return this.Data.updated;
    }
    set Updated(value: any){
        this.Data.updated = value;
    }

    get User(): any {
        return this.Data.user;
    }
    set User(value: any){
        this.Data.user = value;
    }

    get Title(): any {
        return this.Data.title;
    }
    set Title(value: any){
        this.Data.title = value;
    }

    get Text(): any {
        return this.Data.text;
    }
    set Text(value: any){
        this.Data.text = value;
    }

    get TextWords(): any {
        return JSON.parse(this.Data.words);
    }
    set TextWords(value: any){
        this.Data.words = JSON.stringify(value);
    }

    get Url(): any {
        return this.Data.url;
    }
    set Url(value: any){
        this.Data.url = value;
    }

    get Time(): any {
        return this.Data.time;
    }
    set Time(value: any){
        this.Data.time = value;
    }

    get Layout(): any {
        return this.Data.layout;
    }
    set Layout(value: any){
        this.Data.layout = value;
    }

    get Status(): any {
        return this.Data.status;
    }
    set Status(value: any){
        this.Data.status = value;
    }

    async confirmUpdate(){
        await this.updateValues(this._data);
    }

    async updateValues(Data: any){
        if (Data.user > 0){
        }
    }

    Send(client: any){
        client.Send(this);
    }

}

export default Message;