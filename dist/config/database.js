"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    timezone: process.env.DB72_TIMEZONE || "+07:00",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 300000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
exports.default = dbPool;
