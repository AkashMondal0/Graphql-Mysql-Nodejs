/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import connect_mysql from "../db/db.config"

const getUser = async (): Promise<any> => {
    try {
        const [row] = await connect_mysql.query(`SELECT * FROM msdb.user`)
        return row as any
    }
    catch (error) {
        return error
    }
}

export {
    getUser
}