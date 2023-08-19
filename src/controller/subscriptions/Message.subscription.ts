import uuid4 from "uuid4";
import { MessageType } from "../../interface/MessageTypes";
import pubsub from "../../graphql/pubsub";

const MessageCreate = (data: MessageType) => {
    const newMessage: MessageType = {
        id: uuid4(),
        createdAt: new Date().toISOString(),
        message: data.message,
        receiverId: data.receiverId,
        senderId: data.senderId,
        conversationId: data.conversationId,

        video: data.video,
        images: data.images,
        replyId: data.replyId,
        updatedAt: new Date().toISOString(),
    }
    // console.log(newMessage)
    pubsub.publish('MESSAGE_SENT', { LiveChatRoom: newMessage });
    return newMessage;
}


export { MessageCreate };