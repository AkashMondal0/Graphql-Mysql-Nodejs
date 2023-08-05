const typeDefs = `#graphql

  type User {
    uid: ID!
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

  type Query {
    # users queries
    users: [User!]!
    user(uid: ID!): User!
    name(name: String!): User!
    userByEmail(email: String!): User!
    userByToken(token: String!): User!
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

    # userLogin(
    #   email: String!
    #   password: String!
    # ): ReturnType 

    # userLogout(token: String!): User!
    # userUpdate(id: ID!, updateUserData:UpdateUserData!): ReturnType
    # userDelete(id: ID!): ReturnType
  }
`;

export default typeDefs;