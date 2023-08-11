/* eslint-disable no-var */
import { User } from "../db/model/User"
import { Status, StatusSeen } from "../db/model/status"
/* eslint-disable @typescript-eslint/no-unused-vars */

const getUserAllStatus = async (authorId: string) => {
    try {
        const status = await Status.findAll({
            where: {
                authorId: authorId
            }
        })
        return status
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const createUserStatus = async (data: { caption: string, image: string, authorId: string }) => {
    try {
        await Status.create({
            caption: data.caption,
            image: data.image,
            authorId: data.authorId
        })
        return "Status created"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const deleteUserStatus = async (statusId: string) => {
    try {
        Status.destroy({
            where: {
                id: statusId
            }
        })
        return "Status deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const updateSeenStatus = async (data: { statusId: string, userId: string }) => {
    try {
        const alreadySeen = await StatusSeen.findOne({
            where: {
                userId: data.userId
            }
        })
        if (!alreadySeen) {
            StatusSeen.create({
                userId: data.userId,
                statusId: data.statusId
            })
            return "Status seen"
        }
        return "Already seen"

    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const getStatusSeenUsers = async (statusId: string) => {
    var statusSeenUsers = []
    try {
        const statusSeen = await StatusSeen.findAll({
            where: {
                id: statusId
            }
        })
        for (let index = 0; index < statusSeen.length; index++) {
            const user = await User.findOne({
                where: {
                    id: statusSeen[index].dataValues.userId
                }
            })
            statusSeenUsers.push(user)
        }
        return statusSeenUsers
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
export {
    getUserAllStatus,
    createUserStatus,
    deleteUserStatus,
    updateSeenStatus,
    getStatusSeenUsers
}