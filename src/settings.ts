const Sentry = require('@sentry/node');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

export const API_SECRET = 'iYzZkltBjYqmVIMcGTXoO7SG15ckGxwN';

const files = new transports.File({ filename: 'api.log' });
const socketfiles = new transports.File({ filename: 'socket.log' });
const console = new transports.Console();

//Sentry.init({ dsn: 'https://dae1ca0699364f2bb92ee4adaa40e3a0@sentry.io/1294481' });

const myFormat = printf((info: any) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

export const LOGGER = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        console,
        files
    ]
});

export const S_LOGGER = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        console,
        socketfiles
    ]
});

export const logError = function (msg: any) {
    let err = new Error(msg);
    Sentry.captureException(err);
    LOGGER.error(`${msg} - ${err.stack}`);
};

export const logInfo = function (msg: any) {
    LOGGER.info(`${msg}`);
};

// Counters
import Counter from './components/counter';
export const NotificationID = new Counter(0);

export const USER_ROLE = {
    Admin: 4,
    Moderator: 3,
    User: 1,
    Guest: 0
};