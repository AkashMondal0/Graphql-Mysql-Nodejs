/* eslint-disable no-var */
import uuid4 from "uuid4"
import { Status } from "../db/model/status"
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
            id: uuid4(),
            caption: data.caption,
            image: data.image,
            authorId: data.authorId,
            statusSeen: []
        })
        return "Status created"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const deleteUserStatus = async (id: string) => {
    try {
        Status.destroy({
            where: {
                id: id
            }
        })
        return "Status deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const updateSeenStatus = async (id: string, userId: string) => {
    try {
        const findStatus = await Status.findOne({
            where: {
                id: id,
            }
        })
        const alreadySeen = findStatus?.dataValues.statusSeen
        if (!alreadySeen?.includes(userId)) {
            Status.update({
                statusSeen: [...alreadySeen, userId]
            }, {
                where: {
                    id: id
                }
            })
            return "Status seen"
        }
        return "Already seen"

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
}