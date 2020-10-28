import { authorizeToken } from '../services/token';
import * as Settings from '../settings';
import { Response } from 'express';
import { setRoutesUp } from './routes';

import App from '../app';

export default function setRouter(app: any): any {
    setRoutesUp(app);

    setExternalRoute(app, 'get', '/healthz', healthCheck, false);

    app.get('/', (req: any, res: any) => {
        res.status(404).send();
    });
}

export function setExternalRoute(app: any, method: string, route: string, func: any, locked: boolean = true){
    let registerRoute: any = app.get.bind(app);

    switch (method){
        case "post": {
            registerRoute = app.post.bind(app);
            break;
        }
    }

    if (locked){
        registerRoute(route, authorizeToken, func);
        registerRoute(`${route}`, authorizeToken, func);
    }
    else {
        registerRoute(route, func);
        registerRoute(`${route}`, func);
    }

}

function healthCheck(req: any, res: any){
    if (App.fullyLoaded){
        res.json({
            healthy: true,
        });
    } else {
        res.status(404).send();
    }
}

export async function denyAccess(res: Response) {
    Settings.logInfo('Access Denied.');
    res.status(401).send();
}