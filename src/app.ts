import { logInfo, logRequest } from './services/logger';
import * as moment from 'moment';
import UserRepo from './repositories/userRepo';
import CategoryRepo from './repositories/categoryRepo';
import CommentRepo from './repositories/commentRepo';
// Routes
import route from './routes/';

const pkg = require('../package.json');

// Libs
const Sentry = require('@sentry/node');
const cors = require('cors');
const bodyParser = require('body-parser');

export default class App {
    static fullyLoaded = false;

    static express = require('express');
    static instance = App.express();

    configureApp(app: any){
        app.use(Sentry.Handlers.requestHandler());
        app.use(bodyParser.json({
            limit: 4194304
        }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());

        app.use(logRequest);

        route(app);

        app.use(Sentry.Handlers.errorHandler());
        app.use(function onError(err: any, req: any, res: any, next: any) {
            res.statusCode = 500;
            res.end(res.sentry + '\n');
        });
    }

    //
    async preloadSeeds(){
        console.log('Loading seeds...');
        //carregando seeds conforme o modelo
        await UserRepo.createNewUser({name: "Alice Smith", icon: "3"});
        await UserRepo.createNewUser({name: "Ben Cooper", icon: "2"});
        await UserRepo.createNewUser({name: "John Doe", icon: "1"});

        await CategoryRepo.createNewCategory({name: "Typescript", color: "red"});
        await CategoryRepo.createNewCategory({name: "C#", color: "green"});
        await CategoryRepo.createNewCategory({name: "Java", color: "yellow"});
        await CategoryRepo.createNewCategory({name: "Javascript", color: "red"});

        await CommentRepo.createNewComment({userId: 1, categoryId: 1, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex."});
        await CommentRepo.createNewComment({userId: 1, categoryId: 2, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex."});
        await CommentRepo.createNewComment({userId: 1, categoryId: 1, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex."});
    
        await CommentRepo.createNewComment({userId: 2, categoryId: 2, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex."});

        await CommentRepo.createNewComment({userId: 3, categoryId: 1, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex."});
    }

    async start(){
        logInfo(`Currently Server Version: v${pkg.version}`);
        await this.preloadSeeds();
        this.configureApp(App.instance);
        //caso haja uma porta padrão do env vai a utilizar, se não usa a 3000
        let HTTP_PORT = process.env.HTTP_PORT ? process.env.HTTP_PORT : 3000
        App.instance.listen(HTTP_PORT);
        logInfo(`API ready. Listening on port ${HTTP_PORT}`);

        let startMsg = `API Started at ${moment().format()}`;

        logInfo(startMsg);
        Sentry.captureMessage(startMsg);
    }
}