import mysql from "mysql2/promise";

export const dbConfig: mysql.ConnectionOptions = {
    host: process.env.MYSQL_HOST as string,
    user: process.env.MYSQL_USER as string,
    password: process.env.MYSQL_PASSWORD as string,
    database: process.env.MYSQL_DATABASE as string,
    port: parseInt(process.env.MYSQL_PORT as string, 10),
};


const NODE_ENV = process.env.NODE_ENV;

const config: Record<string, string> = {
    local: "http://localhost:8080",
    development: "https://weexpert-chatbot-development.up.railway.app",
    production: "https://your-production-url.com",
};

if(!NODE_ENV) throw new Error("NODE_ENV is not set, please check this variable");

export const apiUrl = config[NODE_ENV];
