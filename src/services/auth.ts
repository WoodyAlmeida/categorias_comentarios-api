import * as Settings from '../settings';
import * as tokenService from './token';

export async function logout(resolve: any, reject: any): Promise<string> {
    return resolve(true);
}

async function generateToken(user: any, role: any) {
    return tokenService.userToken(user, role);
}

export async function authorizeAdminRole(req: any, res: any, next: any) {
    if (req.role >= Settings.USER_ROLE.Admin) {
        next();
    } else {
        return res.status(403).send({ auth: false, message: 'You have no access to this.' });
    }
}

export async function authorizeModeratorRole(req: any, res: any, next: any) {
    if (req.role >= Settings.USER_ROLE.Moderator) {
        next();
    } else {
        return res.status(403).send({ auth: false, message: 'You have no access to this.' });
    }
}

export async function authorizeUserRole(req: any, res: any, next: any) {
    if (req.role >= Settings.USER_ROLE.User) {
        next();
    } else {
        return res.status(403).send({ auth: false, message: 'You have no access to this.' });
    }
}