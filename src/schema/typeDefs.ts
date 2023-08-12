
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

  type Message {
    id: ID!
    text: String
    images: [String]
    replyTo: Message
    replyId: String
    createAt: String
    updateAt: String
    userId: String
  }

  type Status{
    id: ID!
    caption: String
    image: String
    createAt: String
    seenUsers: [User]
    comments: [Comment]
  }

  type Post{
    id: ID!
    caption: String
    createAt: String
    updateAt: String
    author: User
    likes: [Like]
    comments: [Comment]
    images: [String]
  }

  type Like{
    id: ID!
    User: User
    Post: Post
    reaction: String
  }

  type Comment{
    id: ID!
    User: User
    content: String
    createAt: String
    updateAt: String
  }

  type Query {

    # users queries
    users: [User!]!
    user(id: ID!): User!
    name(name: String!): User!
    userByNameAndEmail(Text: String!): [User]
    userByToken(token: String!): User!
    getUserFollowers(id: String!): [Follow]
    getUserFollowing(id: String!): [Follow]
    userLogin(email: String! password: String!): String

    # conversation queries
    conversations: [Conversation!]!
    conversation(userId: String!):[Conversation!]!

    # post queries
    posts: [Post!]!
    post(id: ID!): Post!
    postByAuthorId(authorId: String!): [Post]
    likeByPostId(postId: String!): [Like]

    # status queries
    status: [Status!]!
  }
  
  


  # mutations
  type Mutation {

    # authentication   
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

    # conversation
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
    conversationsAddUsers(conversationId: String!, usersId: [String!]!): String!
    conversationsRemoveUsers(conversationId: String!, usersIs: [String!]!): String!
    conversationsUpdate(conversationId: String!
      name: String!,avatar: String!,description: String!
    ): String!
    conversationsDelete(conversationId: String!): String!

    # post
    postCreate(
      caption: String!
      images: [String]!
      authorId: String!
    ): String!
    postUpdate(
      id: ID!
      caption: String
      images: [String]
    ): String!
    postDelete(id: ID!): String!
    createLikeAndDisLike(postId: String!, authorId: String!): String!
    createComment(postId: String!, authorId: String!, content: String!): String!

    
    # status
    statusCreate(
      caption: String!
      image: String!
      authorId: String!
    ): String!
    statusSeenUpdate(statusId: String!, userId: String!): String!
    statusDelete(id: ID!): String!
    statusCreateComment(statusId: String!, authorId: String!, content: String!): String!
  }`;

export default typeDefs;