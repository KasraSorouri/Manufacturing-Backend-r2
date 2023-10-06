"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollbackMigration = exports.sequelize = exports.connectToDatabase = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const umzug_1 = require("umzug");
const logger_1 = __importDefault(require("../utils/logger"));
if (!config_1.DATABASE_URI) {
    logger_1.default.info('Database URI is not found!');
}
const sequelize = new sequelize_1.Sequelize(config_1.DATABASE_URI, {
    logging: true,
});
exports.sequelize = sequelize;
const migrationConf = {
    migrations: {
        glob: './src/migrations/*.js'
    },
    storage: new umzug_1.SequelizeStorage({ sequelize, tableName: 'migration' }),
    context: sequelize.getQueryInterface(),
    logger: console,
};
const runMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    const migrator = new umzug_1.Umzug(migrationConf);
    const migrations = yield migrator.up();
    logger_1.default.info('migration up to date', {
        files: migrations.map((mig) => mig.name),
    });
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield runMigration();
        logger_1.default.info('Connection has been established successfully.');
    }
    catch (error) {
        if (error instanceof Error)
            logger_1.default.info('Unable to connect to the database:', error.message);
        return process.exit(1);
    }
    return null;
});
exports.connectToDatabase = connectToDatabase;
const rollbackMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConf);
    yield migrator.down();
});
exports.rollbackMigration = rollbackMigration;
