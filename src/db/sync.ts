import { Conversation } from "./model/Conversation";
import { Post, PostComment } from "./model/Post";
import { User } from "./model/User";
import { Status } from "./model/status";


const mysqlSync = async () => {
    // await User.sync().then(() => {
    //     console.log("User table created")
    // });
    // await Post.sync({force:true}).then(() => {
    //     console.log("Post table created")
    // });
    // await PostComment.sync({force:true}).then(() => {
    //     console.log("Comment table created")
    // })
    // await Status.sync({force:true}).then(() => {
    //     console.log("Image table created")
    // })
    // await Conversation.sync().then(() => {
    //     console.log("Conversation table created")
    // })
    // await Follow.sync().then(() => {
    //     console.log("Follow table created")
    // })
    // await Like.sync().then(() => {
    //     console.log("Like table created")
    // })
    // await Image.sync().then(() => {
    //     console.log("Image table created")
    // })
    // await StatusSeen.sync().then(() => {
    //     console.log("Image table created")
    // })
}

export default mysqlSync;