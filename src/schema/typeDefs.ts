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
    createAt: String
    updateAt: String
  }

  type Message {
    id: ID!
    text: String
    images: [String]
    replyTo: Message
    createAt: String
    updateAt: String
    user: User
  }

  type Request{
    id: ID!
    user: User!
    type: String
    createAt: String
    updateAt: String
    RequestType: String
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
    # post queries
    posts: [Post!]!
    post(id: ID!): Post!
    postByAuthorId(authorId: String!): [Post]
    # Like queries
    likeByPostId(postId: String!): [Like]
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
  }`;

export default typeDefs;