import { Like, Post, Comment } from "./model/Post";
import { Follow, User } from "./model/User";

const mysqlSync = async () => {
    // await User.sync().then(() => {
    //     console.log("User table created")
    // });
    // await Follow.sync().then(() => {
    //     console.log("Follow table created")
    // })
    // await Post.sync().then(() => {
    //     console.log("Post table created")
    // });
    // await Like.sync().then(() => {
    //     console.log("Like table created")
    // })
    // await Comment.sync().then(() => {
    //     console.log("Comment table created")
    // })
}

export default mysqlSync;