import mysql from 'mysql2';

const connect_mysql = mysql.createPool({
    user: "akash",
    password: "olivia@2003",
    host: "skyinc.mysql.database.azure.com",
    database: "msdb",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise()

export default connect_mysql
