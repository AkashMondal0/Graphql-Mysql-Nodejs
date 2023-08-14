
const typeDefs = `#graphql

  type User {
    id: ID!
    # manual update
    name: String!
    email: String!
    password: String!
    bio: String
    website: String
    avatar: String
    # system update
    posts: [Post]
    status: [Status]
    followers: [User]
    following: [User]
    conversations: [Conversation]
    createAt: String
    updateAt: String
  }

  type Follow{
    id: ID!
    followerId: String!
    followingId: String!
    createAt: String
    updateAt: String
  } 

  type Conversation{
    id: ID!
    usersId: [String]
    messageData: [Message]
    isGroup: Boolean
    GroupData: GroupData
    createAt: String
    updateAt: String
    lastMessage: String
    lastMessageTime: String
    lastMessageAuthor: String
  }

  type GroupData{
    name: String
    avatar: String
    description: String
    admins: [String!]
    CreatedUser: String
  }

  type Status{
    id: ID!
    caption: String
    image: String
    createAt: String
    statusSeen: [String]
    comments: [Comment]
  }

  type Post{
    id: ID!
    caption: String
    createAt: String
    updateAt: String
    author: User
    likes: [String]
    comments: [Comment]
    images: [String]
  }

  type Comment{
    id: ID!
    authorId: String
    content: String
    likes: [String]
    createAt: String
    updateAt: String
  }
  type Message {
    id: ID!
    text: String
    images: [String]
    replyId: String
    createAt: String
    receiverId: String!
    senderId: String!
    roomId: String!
  }
  type Query {
      #//! message queries
   userMessages(userId:String!): [Message]
    #//! users queries
    users: [User!]!
    user(id: ID!): User!
    name(name: String!): User!
    userByNameAndEmail(Text: String!): [User]
    userLoginByToken(token: String!): User!
    getUserFollowers(id: String!): [Follow]
    getUserFollowing(id: String!): [Follow]
    userLogin(email: String! password: String!): String

    #//! conversation queries
    conversations: [Conversation!]!
    conversation(userId: String!):[Conversation!]!

    #//! post queries
    posts: [Post!]!
    postById(id: ID!): Post!

    #//! status queries
    status: [Status!]!

  }

  #//? mutations
  type Mutation {
    #//! authentication   
    userRegister(
      email: String!
      name: String!
      password: String!
      avatar: String
    ): String
    follow(authorId:String!, followUserId:String!): String!
    userUpdate(id: ID! 
    name:String
    email:String
    password: String!
    bio: String
    website: String
    avatar: String
    ): String!
    userDelete(id: ID!): String!

    #//! conversation
    conversationsCreate(users: [String!]!,
    isGroup:String!,name: String,
    avatar: String,description: String): String!
    conversationsMessageDataUpdate(
      conversationId: String!,
      text: String!
      images: [String]!
      replyId: String!
      userId: String!
       ): String!
    conversationsMessageDataDelete(
      conversationId: String!,
      messageId: [String!]!
    ): String!
    conversationsAddUsers(conversationId: String!, usersId: [String!]!): String!
    conversationsRemoveUsers(conversationId: String!, usersId: [String!]!): String!
    conversationsUpdate(conversationId: String!
      name: String!,avatar: String!,description: String!
    ): String!
    conversationsDelete(conversationId: String!): String!

    #//! post
    postCreate(
      caption: String!
      images: [String]!
      authorId: String!
    ): String!
    postUpdate(
      id: ID!
      caption: String!
    ): String!
    postDelete(id: ID!): String!
    postLikeAndDisLike(postId: String!, authorId: String!): String!
    postCommentCreate(postId: String!, authorId: String!, content: String!): String!
    postCommentDelete(commentId: String!): String!
    postCommentUpdate(commentId: String!, content: String!): String!
    
    #//! status
    statusCreate(
      caption: String!
      image: String!
      authorId: String!
    ): String!
    statusSeenUpdate(statusId: String!, userId: String!): String!
    statusDelete(id: ID!): String!
    statusCreateComment(statusId: String!, authorId: String!, content: String!): String!

    #//! message
    sendMessage(
      text: String!
      images: [String]
      replyId: String
      senderId: String!, 
      receiverId: String!
      roomId: String!
      ): Message
  }
  
  type Subscription {
    LiveChatRoom(roomId: String,userId:String): Message
  }`;

export default typeDefs;