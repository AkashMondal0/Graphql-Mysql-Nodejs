/* eslint-disable @typescript-eslint/no-explicit-any */
import uuid4 from "uuid4";
import sequelize from "../db/db";
import { Follow, User } from "../db/model/User";
import bcrypt from "bcrypt";
const saltRounds = 10;
const secret = process.env.JWT_SECRET as string || "secret";
import jwt from "jsonwebtoken";


const getUsers = async () => {
    const users = await User.findAll()
    return users
}

const getUserById = async (uid: string) => {
    const user = await User.findOne({
        where: {
            uid: uid
        }
    })
    return user
}

const getUserByToken = async (token: string) => {

    const verify = jwt.verify(token, secret) as { uid: string }
    if (!verify?.uid) {
        return "Invalid Token"
    }
    const user = await User.findOne({
        where: {
            uid: verify?.uid
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
        const alreadyUser = await User.findOne({
            where: {
                email: data.email
            }
        })
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
                uid: uuid4()
            })
            const token = jwt.sign({ uid: GID }, secret)
            return token
        }
    } catch (error) {
        console.log(error); //TODO // type assertion to tell TypeScript that error is of type Error
        return (error as Error).message
    }
}


const login = async (email: string, password: string) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user?.dataValues.email) {
            return "User Not Found"
        }
        const checkPassword = await bcrypt.compare(password, user?.dataValues.password)
        if (!checkPassword) {
            return "Invalid User Credential"
        }
        const token = jwt.sign({ uid: user?.dataValues.uid }, secret)
        return token
    } catch (error) {
        return "Something Wrong"
    }
}

const userFollow = async (authorId: string, followUserId: string) => {
    try {

        const [alreadyFollow] = await sequelize.query(`SELECT * FROM follows where 
        followerId = "${authorId}" 
        AND followingId = "${followUserId}" 
        OR followerId = "${followUserId}" 
        AND followingId = "${authorId}"`,
            {
                model: Follow,
                mapToModel: true
            })
        if (alreadyFollow?.dataValues.id) {
            await Follow.destroy({
                where: {
                    id: alreadyFollow?.dataValues.id
                }
            })
            // console.log("unfollow")
            return "unFollow success"
        } else {
            await Follow.create({
                followerId: authorId,
                followingId: followUserId
            })
            return "Follow success"
        }
    } catch (error) {
        console.log(error); //TODO // type assertion to tell TypeScript that error is of type Error
        return (error as Error).message
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

export {
    getUsers,
    getUserById,
    getUserByNameAndEmail,
    getUserByToken,
    register,
    userFollow,
    login
}
