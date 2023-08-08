/* eslint-disable @typescript-eslint/no-explicit-any */
import uuid4 from "uuid4";
import sequelize from "../db/db";
import { User } from "../db/model/User";
import bcrypt from "bcrypt";
const saltRounds = 10;
const secret = process.env.JWT_SECRET as string || "secret";
import jwt from "jsonwebtoken";


const getUsers = async () => {
    const users = await User.findAll()
    return users
}

const getUserById = async (id: string) => {
    const user = await User.findOne({ where: { id: id } })
    return user
}

const getUserByToken = async (token: string) => {

    const verify = jwt.verify(token, secret) as { id: string }
    if (!verify?.id) {
        return "Invalid Token"
    }
    const user = await User.findOne({
        where: {
            id: verify?.id
        }
    })
    return user
}

const register = async (data: {
    email: string,
    password: string,
    avatar: string,
    name: string
}) => {
    try {
        const alreadyUser = await User.findOne({ where: { email: data.email } })
        if (alreadyUser?.dataValues.email) {
            return "User already exist"
        } else {
            const { name, email, password, avatar } = data;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const GID = uuid4();
            await User.create({
                name,
                email,
                password: hashPassword,
                avatar,
                id: uuid4()
            })
            const token = jwt.sign({ id: GID }, secret)
            return token
        }
    } catch (error) {
        console.log(error); //TODO // type assertion to tell TypeScript that error is of type Error
        return (error as Error).message
    }
}


const login = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user?.dataValues.email) {
            return "User Not Found"
        }
        const checkPassword = await bcrypt.compare(password, user?.dataValues.password)
        if (!checkPassword) {
            return "Invalid User Credential"
        }
        const token = jwt.sign({ uid: user?.dataValues.id }, secret)
        return token
    } catch (error) {
        return "Something Wrong"
    }
}


const getUserByNameAndEmail = async (Text: string) => {
    const user = await sequelize.query(`SELECT * FROM users WHERE email LIKE "%${Text}%" OR name LIKE "%${Text}%"`,
        {
            model: User,
            mapToModel: true,
        })
    return user
}

const updateUser = async (data: { id: string, 
    name: string,
     email: string, 
    password: string, 
    bio: string,
    website: string,
    avatar: string }) => {
    await User.update(data, { where: { id: data.id } })
    return "User Updated"
}

const deleteUser = async (id: string) => {
    await User.destroy({ where: { id: id } })
    return "User Deleted"
}

export {
    getUsers,
    getUserById,
    getUserByNameAndEmail,
    getUserByToken,
    register,
    login,
    updateUser,
    deleteUser
}
