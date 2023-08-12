/* eslint-disable @typescript-eslint/no-explicit-any */
import uuid4 from "uuid4"
import { Conversation } from "../db/model/Conversation"
import sequelize from "../db/db"
import { ConversationType, createConversationType } from "../interface/User"
import { MessagesType } from "../interface/MessageTypes"


/// conversation --------------------
const findUserConversation = async (userId: string) => {
    const ConversationArray: ConversationType[] = []
    try {
        const conversations = await sequelize.query(`
        SELECT * FROM msdb.conversations WHERE JSON_CONTAINS(usersId, '"${userId}"', '$');`,
            { mapToModel: true, model: Conversation })

        for (let index = 0; index < conversations.length; index++) {
            const element = conversations[index];
            // const friendsId = element.dataValues.usersId.filter((id: string) => id !== userId)
            const parsedConversations = element.dataValues.messageData.map((message: any) => JSON.parse(message))

            ConversationArray.push({
                ...element.dataValues,
                messageData: parsedConversations
            })
        }
        return ConversationArray
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const createConversation = async (data: createConversationType) => {
    const { users, name, avatar, description, isGroup } = data
    try {
        const conversations = await sequelize.query(
            `SELECT *
            FROM msdb.conversations
            WHERE JSON_CONTAINS(usersId, '"${users[0]}"', '$') and JSON_CONTAINS(usersId, '"${users[1]}"', '$')`,
            { mapToModel: true, model: Conversation })

        const createNewConversation = async () => {
            await Conversation.create({
                id: uuid4(),
                messageData: [],
                isGroup: users.length > 2 ? true : false,
                GroupData: {
                    admin: [
                        users[0]
                    ],
                    name: name,
                    avatar: avatar,
                    description: description,
                    CreatedUser: users[0]
                },
                usersId: users,
            })
        }

        if (conversations.length === 0 && !isGroup) {
            createNewConversation()
            return "Conversation created"
        } else if (isGroup) {
            createNewConversation()
            return "Conversation created with group"
        }
        else {
            return "Conversation already exist"
        }
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const UpdateConversation = async (data: createConversationType) => {
    const { conversationId, name, avatar, description } = data

    try {
        await Conversation.update({
            GroupData: {
                name: name,
                avatar: avatar,
                description: description,
            }
        }, {
            where: {
                id: conversationId
            }
        })
        return "Conversation updated"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const DeleteConversation = async (conversationId: string) => {
    try {
        await Conversation.destroy({
            where: {
                id: conversationId
            }
        })
        return "Conversation deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

/// User -----------------------------

const addUserToConversation = async (data: {
    conversationId: string,
    usersId: string[]
}) => {
    try {
        const conversation = await Conversation.findOne({
            where: {
                id: data.conversationId
            }
        })
        const usersIdInGroup = conversation?.dataValues.usersId
        // if group is true then add user to group
        for (let index = 0; index < data.usersId.length; index++) {
            const userId = data.usersId[index];

            if (!usersIdInGroup.includes(userId)) {
                // console.log(userId)
                await sequelize.query(`
                    UPDATE msdb.conversations
                    SET usersId = JSON_ARRAY_APPEND(usersId, '$', '${userId}')
                    WHERE id = '${data.conversationId}';`)
            }
        }
        return "user added to conversation group"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const removeUserFromConversation = async (data:
    { conversationId: string, users: string[] }) => {
    console.log(data)
    return "deleted"
}

/// Message -----------------------------
const CreateAndAddMessage = async (data: MessagesType) => {

    try {
        const newMessage = { ...data, id: uuid4() }

        await Conversation.update({
            messageData: sequelize.fn('JSON_ARRAY_APPEND', sequelize.col('messageData'), '$', JSON.stringify(newMessage))
        }, {
            where: {
                id: data.conversationId
            }
        })

        return "message added"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


const deleteMessage = async () => {

}

export {
    createConversation,
    addUserToConversation,
    removeUserFromConversation,
    findUserConversation,
    CreateAndAddMessage,
    deleteMessage,
    DeleteConversation,
    UpdateConversation
}