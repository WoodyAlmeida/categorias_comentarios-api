import Auth from './packets/(1000)Auth';

interface IPacket {
    ID: number;
    Data: any;
    Send: any;
}

export default IPacket;

export function HandleData(data: IPacket, client: any){
    //console.log(data)

    switch (data.ID){
        case 1000: HandleAuth(data, client); break;
    }
}

function HandleAuth(data: any, client: any){
    let now = Date.now();
    let auth = new Auth(data);

    client.user = auth.User;
    client.role = auth.Role;
    client.name = auth.Name;
    client.lastActivity = now;

    //Settings.NotificationService.pool.push( client )

    //Settings.logInfo(`User ID ${client.user} (${client.role}) has been registered successfully!`)

    auth.UID = client.id;
    auth.Send(client);

    /*let lastUserInstance:AClient = Settings.NotificationService.last_activities[client.user]
    if (lastUserInstance && lastUserInstance !== null){
        let leftTime = now - lastUserInstance.lastActivity;

        let msg = new Message({
            text: `${client.name} (${client.role}) (*1127*)`,
            layout: 'bottomLeft',
            user: 0
        })

        if (leftTime > 5 * 60 * 1000){
            Settings.NotificationService.sendToAllRole('admin', msg)
        }
    }

    Settings.NotificationService.last_activities[client.user] = client*/
}