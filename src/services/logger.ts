const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const files = new transports.File({ filename: 'api.log' });
const socketfiles = new transports.File({ filename: 'socket.log' });

const Sentry = require('@sentry/node');

const myFormat = printf((info: any) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const console = new transports.Console();

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        console,
        files
    ]
});

const socketLogger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        console,
        socketfiles
    ]
});

export const socketLogError = function (msg: any) {
    let err = new Error(msg);
    Sentry.captureException(err);
    socketLogger.error(`${msg} - ${err.stack}`);
};

export const logError = function (msg: any) {
    let err = new Error(msg);
    Sentry.captureException(err);
    logger.error(`${msg} - ${err.stack}`);
};

export const logWarn = function (msg: any) {
    logger.warn(`${msg}`);
};

export const logInfo = function (msg: any) {
    logger.info(`${msg}`);
};

export const logRequest = (req: any, res: any, next: any) => {
    try{
        const {httpVersion,url,method,next,baseUrl,originalUrl,query,body} = req;

        if (url === `/healthz`)
            return next();

        logInfo(`[HTTP ${httpVersion} => ${url} (${method}) = ${originalUrl} (${baseUrl}) :: ${JSON.stringify(query)} :: ${JSON.stringify(body)}]`);
    }
    catch (err){
        console.log(err);
    }

    next();
};