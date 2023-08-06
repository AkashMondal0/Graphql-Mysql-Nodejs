import sequelize from "../db/db"
import { Follow } from "../db/model/User"
import { getUserById } from "./User"

const userFollowAndUnFollow = async (authorId: string, followUserId: string) => {
    try {

        const [alreadyFollow] = await sequelize.query(`SELECT * FROM follows where 
        followerId = "${authorId}" 
        AND followingId = "${followUserId}"`,
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
            return "unFollow success"
        } else {
            await Follow.create({
                followerId: authorId,
                followingId: followUserId
            })
            return "Follow success"
        }
    } catch (error) {
        console.log(error);
        return (error as Error).message
    }
}

const getUserFollowers = async (authorId: string) => {
    const followerArr = []
    const followers = await Follow.findAll({
        where: {
            followingId: authorId
        }
    })
    for (let i = 0; i < followers.length; i++) {
        const element = followers[i];
        const user = await getUserById(element.dataValues.followerId)
       
        followerArr.push(user?.dataValues)
    }
    return followerArr
}

const getUserFollowing = async (authorId: string) => {
    const followingArr = []
    const following = await Follow.findAll({
        where: {
            followerId: authorId
        }
    })
    for (let i = 0; i < following.length; i++) {
        const element = following[i];
        const user = await getUserById(element.dataValues.followingId)
      
        followingArr.push(user?.dataValues)
    }
    return followingArr
}

export {
    userFollowAndUnFollow,
    getUserFollowers,
    getUserFollowing
}