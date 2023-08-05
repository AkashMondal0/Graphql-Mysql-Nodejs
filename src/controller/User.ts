/* eslint-disable @typescript-eslint/no-explicit-any */
import uuid4 from "uuid4";
import sequelize from "../db/db";
import { Follow, User } from "../db/model/User";

const getUsers = async () => {
    const users = await sequelize.query('SELECT * FROM users', {
        model: User,
        mapToModel: true
    })
    return users
}

const getUser = async (data: any) => {
    const [users] = await sequelize.query(`SELECT * FROM users where uid = "${data.uid}"`, {
        model: User,
        mapToModel: true
    })
    return users
}


const register = async (data: any) => {
    try {
        const { name, email, password, avatar } = data;
        await User.create({
            name,
            email,
            password,
            avatar,
            uid: uuid4()
        })
        return "Register success"
    } catch (error) {
        console.log(error); //TODO // type assertion to tell TypeScript that error is of type Error
        return (error as Error).message
    }
}

const userFollow = async (data: any) => {
    try {

        const [alreadyFollow] = await sequelize.query(`SELECT * FROM follows where 
        followerId = "${data.authorId}" 
        AND followingId = "${data.followUserId}" 
        OR followerId = "${data.followUserId}" 
        AND followingId = "${data.authorId}"`,
            {
                model: Follow,
                mapToModel: true
            })
        if (alreadyFollow?.dataValues.id) {
            await sequelize.query(`DELETE FROM follows where id = "${alreadyFollow?.dataValues.id}"`)
            console.log("unfollow")
            return "unFollow success"
        } else {
            await Follow.create({
                followerId: data.authorId,
                followingId: data.followUserId
            })
            return "Follow success"
        }
    } catch (error) {
        console.log(error); //TODO // type assertion to tell TypeScript that error is of type Error
        return (error as Error).message
    }
}


export {
    getUsers,
    getUser,
    register,
    userFollow
}
