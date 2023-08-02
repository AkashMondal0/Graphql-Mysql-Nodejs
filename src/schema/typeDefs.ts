const typeDefs = `#graphql

  type User {
    id: ID!
    # manual update
    username: String!
    email: String!
    password: String
    bio: String
    website: String
    avatar: String
    # system update
    token: String
    createDate: String
    updateDate: String
    lastLoginDate: String
    posts: [Post]
    status: [Status]
    followers: [User]
    following: [User]
    requests: Request
    conversations: [Conversation]
  }

  type Conversation{
    id: ID!
    users: [User!]
    messages: [Message]
    createDate: String
    updateDate: String
    isGroup: Boolean
    name: String
    avatar: String
    description: String
    members: [User!]
    admins: [User!]
    owner: User
    requests: [Request]
  }


  type Message {
    id: ID!
    text: String
    images: [String]
    replyTo: Message
    createDate: String
    updateDate: String
    user: User
  }

  type Request{
    id: ID!
    user: User!
    type: String
    createDate: String
    RequestType: String
  }

  type Status{
    id: ID!
    caption: String
    image: String
    createDate: String
    seenUsers: [User]
    comments: [Comment]
  }

  type Post{
    id: ID!
    caption: String
    createDate: String
    updateDate: String
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
    createDate: String
    updateDate: String
  }

  type Comment{
    id: ID!
    content: String
    createDate: String
    updateDate: String
  }

  input userRegister {
    username: String!
    email: String!
    password: String!
    avatar: String
  }

type userReturnType{
  message: String
  data: User
  statusCode: Int
}
input UpdateUserData {
      username: String
      email: String
      password: String
      bio: String
      website: String
      avatar: String
    }
  type Query {
    # users queries
    users: [User!]
    user(id: ID!): User!
    userByUsername(username: String!): User!
    userByEmail(email: String!): User!
    userByToken(token: String!): User!
    
    # # status queries
    # status(id: ID!): Status!
    # statuses: [Status!]

    # # posts queries
    # post(id: ID!): Post!
    # posts: [Post!]

    # # likes queries
    # like(id: ID!): Like!
    # likes: [Like!]

    # # comments queries
    # comment(id: ID!): Comment!
    # comments: [Comment!]

    # # messages queries
    # message(id: ID!): Message!
    # messages: [Message!]

    # # requests queries
    # request(id: ID!): Request!
    # requests: [Request!]

  }

  # mutations


  type Mutation {
    # authentication
    userRegister(
      email: String!
      username: String!
      password: String!
      avatar: String
    ): userReturnType

    userLogin(
      email: String!
      password: String!
    ): userReturnType

    userLogout(token: String!): User!
    userUpdate(id: ID!, updateUserData:UpdateUserData!): userReturnType
    userDelete(id: ID!): userReturnType

    # # status
    # statusCreate(Status: statusCreate): Status!
    # statusUpdate(id: ID!, Status: statusUpdate): Status!
    # statusDelete(id: ID!): Status!

    # # posts
    # postCreate(Post: postCreate): Post!
    # postUpdate(id: ID!, Post: postUpdate): Post!
    # postDelete(id: ID!): Post!

    # # likes
    # likeCreate(Like: likeCreate): Like!
    # likeDelete(id: ID!): Like!

    # # comments
    # commentCreate(Comment: commentCreate): Comment!
    # commentUpdate(id: ID!, Comment: commentUpdate): Comment!
    # commentDelete(id: ID!): Comment!

    # # messages
    # messageCreate(Message: messageCreate): Message!
    # messageUpdate(id: ID!, Message: messageUpdate): Message!
    # messageDelete(id: ID!): Message!

    # # requests
    # requestCreate(Request: requestCreate): Request!
    # requestDelete(id: ID!): Request!

    # # conversations
    # conversationCreate(Conversation: conversationCreate): Conversation!
    # conversationUpdate(id: ID!, Conversation: conversationUpdate): Conversation!
    # conversationDelete(id: ID!): Conversation!

    # # followers
    # follow(id: ID!): User!
    # unFollow(id: ID!): User!

    # # followings
    # accept(id: ID!): User!
    # decline(id: ID!): User!

  }
`;

export default typeDefs;