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
    requests: Request
    conversations: [Conversation]
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
    user(id: ID!): User!
    name(name: String!): User!
    userByNameAndEmail(Text: String!): [User]
    userByToken(token: String!): User!
    getUserFollowers(id: String!): [Follow]
    getUserFollowing(id: String!): [Follow]
    userLogin(
      email: String!
      password: String!
    ): String
    # post queries
    posts: [Post!]!
    post(id: ID!): Post!
    postByAuthorId(authorId: String!): [Post]
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
    # userLogout(token: String!): User!
    # userUpdate(id: ID!, updateUserData:UpdateUserData!): ReturnType
    # userDelete(id: ID!): ReturnType

    # post
    postCreate(
      caption: String!
      images: [String]!
      authorId: String!
    ): String!

    
  }
`;

export default typeDefs;