import mysql from "mysql2/promise";

export const dbConfig: mysql.ConnectionOptions = {
    host: process.env.MYSQL_HOST as string,
    user: process.env.MYSQL_USER as string,
    password: process.env.MYSQL_PASSWORD as string,
    database: process.env.MYSQL_DATABASE as string,
    port: parseInt(process.env.MYSQL_PORT as string, 10),
};
