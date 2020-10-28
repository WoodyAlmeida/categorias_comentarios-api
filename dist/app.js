"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = require("./services/logger");
const moment = require("moment");
const userRepo_1 = require("./repositories/userRepo");
const categoryRepo_1 = require("./repositories/categoryRepo");
const commentRepo_1 = require("./repositories/commentRepo");
// Routes
const routes_1 = require("./routes/");
const pkg = require('../package.json');
// Libs
const Sentry = require('@sentry/node');
const cors = require('cors');
const bodyParser = require('body-parser');
class App {
    configureApp(app) {
        app.use(Sentry.Handlers.requestHandler());
        app.use(bodyParser.json({
            limit: 4194304
        }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(logger_1.logRequest);
        routes_1.default(app);
        app.use(Sentry.Handlers.errorHandler());
        app.use(function onError(err, req, res, next) {
            res.statusCode = 500;
            res.end(res.sentry + '\n');
        });
    }
    //
    preloadSeeds() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Loading seeds...');
            //carregando seeds conforme o modelo
            yield userRepo_1.default.createNewUser({ name: "Alice Smith", icon: "3" });
            yield userRepo_1.default.createNewUser({ name: "Ben Cooper", icon: "2" });
            yield userRepo_1.default.createNewUser({ name: "John Doe", icon: "1" });
            yield categoryRepo_1.default.createNewCategory({ name: "Typescript", color: "red" });
            yield categoryRepo_1.default.createNewCategory({ name: "C#", color: "green" });
            yield categoryRepo_1.default.createNewCategory({ name: "Java", color: "yellow" });
            yield categoryRepo_1.default.createNewCategory({ name: "Javascript", color: "red" });
            yield commentRepo_1.default.createNewComment({ userId: 1, categoryId: 1, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex." });
            yield commentRepo_1.default.createNewComment({ userId: 1, categoryId: 2, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex." });
            yield commentRepo_1.default.createNewComment({ userId: 1, categoryId: 1, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex." });
            yield commentRepo_1.default.createNewComment({ userId: 2, categoryId: 2, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex." });
            yield commentRepo_1.default.createNewComment({ userId: 3, categoryId: 1, dateTime: "2020-04-20T16:20:00.000Z", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non justo vitae velit accumsan laoreet eget at orci. Donec elit orci, vehicula vitae viverra ut, finibus id ex." });
        });
    }
    start() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            logger_1.logInfo(`Currently Server Version: v${pkg.version}`);
            yield this.preloadSeeds();
            this.configureApp(App.instance);
            //caso haja uma porta padrão do env vai a utilizar, se não usa a 3000
            let HTTP_PORT = process.env.HTTP_PORT ? process.env.HTTP_PORT : 3000;
            App.instance.listen(HTTP_PORT);
            logger_1.logInfo(`API ready. Listening on port ${HTTP_PORT}`);
            let startMsg = `API Started at ${moment().format()}`;
            logger_1.logInfo(startMsg);
            Sentry.captureMessage(startMsg);
        });
    }
}
App.fullyLoaded = false;
App.express = require('express');
App.instance = App.express();
exports.default = App;
//# sourceMappingURL=app.js.map