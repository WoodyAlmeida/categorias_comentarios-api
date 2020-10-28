import * as Settings from '../settings';
import * as jwt from 'jsonwebtoken';

export async function userToken(id: number, role: string): Promise<string> {
  return await sign(id, 36000, role);
}

async function sign(id: number, expiration: number = 0, role: string): Promise<string> {
  return new Promise<string>((resolve) => {
    let tokenData = {
      uid: id,
      role,
      type: 1,
      exp: expirationDate(expiration)
    };

    let token = jwt.sign(tokenData, Settings.API_SECRET);

    resolve(token);
  });
}

function expirationDate(minutes: number): number {
  let now = Date.now();
  let till = now + (minutes * 60) * 1000 * 24 * 7;
  return till;
}

export async function authorizeToken(req: any, res: any, next: any) {
  let token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, Settings.API_SECRET, function (err: any, decoded: any) {
    if (err)
      return res.status(400).send({ auth: false, message: 'Invalid token.' });

    req.userId = decoded.uid;
    req.role = decoded.role;
    req.token = token;
    next();
  });
}