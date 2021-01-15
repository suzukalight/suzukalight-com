---
title: GraphQL Apollo-Server 入門 (2)
date: '2019-12-11T00:02:00'
category: Technology
tags: ['graphql', 'apollo-server', 'express', 'nodejs', 'typescript', 'ts-node-dev']
hero: playground.png
status: 'draft'
---

Apollo-Server を使った GraphQL サーバの具体的なチュートリアルとして、[こちらの素晴らしい記事](https://www.robinwieruch.de/graphql-apollo-server-tutorial)がありましたので、これをなぞりつつ、typescript で記述したり、適当に改造や改善をしながら、素振りをしていこう、というのが本記事の主旨になります。本記事は第 2 回です。

今回実装したリポジトリはこちらです；  
https://github.com/suzukalight/study-graphql-apollo-server

# Mutation

Query が Read 側の処理でしたが、Mutation はいわゆる Write 側の処理になります。

## create

```typescript{4-6}
const schema = gql`
  # ...

  type Mutation {
    createMessage(text: String!): Message
  }
`;
```

```typescript{5-15}
const resolvers: IResolvers = {
  // ...

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      messages[id] = message;
      console.log('message keys', Object.keys(messages));
      return message;
    },
  },
};
```

```graphql:query
mutation {
  createMessage(text: "Hello GraphQL!") {
    id
    text
    user {
      id
      username
    }
  }
}
```

```json:response
{
  "data": {
    "createMessage": {
      "id": "e656f38c-7bed-47b8-96f4-386cc52fd6a8",
      "text": "Hello GraphQL!",
      "user": {
        "id": "2",
        "username": "suzuka light"
      }
    }
  }
}
```

```bash
message keys [ '1', '2', '3', '05955f56-7c44-456e-bc36-72abf8b170a9' ]
```

## delete

```typescript{6}
const schema = gql`
  # ...

  type Mutation {
    createMessage(text: String!): Message
    deleteMessage(id: ID!): Boolean!
  }
`;
```

```typescript{7-13}
const resolvers: IResolvers = {
  // ...

  Mutation: {
    // ...

    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMesasges } = messages;
      if (!message) return false;
      messages = otherMesasges;
      console.log('message keys', Object.keys(messages));
      return true;
    },
  },
};
```

```graphql:query
mutation {
  deleteMessage(id: "3")
}
```

```json:response
{
  "data": {
    "deleteMessage": true
  }
}
```

```bash
message keys [ '1', '2', '05955f56-7c44-456e-bc36-72abf8b170a9' ]
```

# ファイル構成

## 技術ベース

```typescript:./src/models/index.ts
export let users: Users = {
  '1': { id: '1', firstName: 'masahiko', lastName: 'kubara' },
  '2': { id: '2', firstName: 'suzuka', lastName: 'light' },
};

export let messages: Messages = {
  '1': { id: '1', text: 'Hello, world!', userId: '1' },
  '2': { id: '2', text: 'from GraphQL and Apollo-Server.', userId: '2' },
  '3': { id: '3', text: 'textextext', userId: '2' },
};

export default {
  users,
  messages,
};
```

```typescript:./src/schema/index.ts
import { gql } from 'apollo-server-express';

const schema = gql`
  type Query {
    me: User
    users: [User!]
    user(id: ID!): User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

export default schema;
```

```typescript:./src/resolvers/index.ts
import { IResolvers } from 'apollo-server-express';
import uuidv4 from 'uuid/v4';

const resolvers: IResolvers = {
  Query: {
    me: (parent, args, { me }) => me,
    users: (parent, args, { models }) => Object.values(models.users),
    user: (parent, { id }, { models }) => models.users[id],
    messages: (parent, args, { models }) => Object.values(models.messages),
    message: (parent, { id }, { models }) => models.messages[id],
  },
  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      models.messages[id] = message;
      console.log('message keys', Object.keys(models.messages));
      return message;
    },
    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMesasges } = models.messages;
      if (!message) return false;
      models.messages = otherMesasges;
      console.log('message keys', Object.keys(models.messages));
      return true;
    },
  },
  User: {
    username: (user: User) => `${user.firstName} ${user.lastName}`,
    messages: (user: User, args, { models }) =>
      Object.values<Message>(models.messages)
        .filter((m: Message) => +m.userId === +user.id)
        .map((m: Message) => models.messages[m.id]),
  },
  Message: {
    user: (message: Message, args, { models }) => models.users[message.userId],
  },
};

export default resolvers;
```

```typescript:./src/index.ts
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: { me: models.users[2], models },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 23456 }, () => {
  console.log('server on http://localhost:23456/graphql');
});
```

## ドメインベース

### スキーマ

user と message に切り分けてみます；

**User**

```typescript:./src/schema/user.ts
import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    me: User
    users: [User!]
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    messages: [Message!]
  }
`;

export default schema;
```

- user に関する type を分離します。
- user に関する Query を分離します。Query は User 以外にも存在するため、ベースの Query に拡張(extend)していく、というスタイルで記述していきます。

**Message**

```typescript:./src/schema/message.ts
import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

export default schema;
```

**ベースとなるスキーマファイル**

```typescript:./src/schema/index.ts
import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema];
```

切り分けたスキーマファイルを import するとともに、ベースとなるスキーマを定義しています。ベーススキーマは空の Query/Mutation/Subscription(次章以降で登場)を定義しており、それぞれにダミーを 1 つ配置しています。このダミーに、切り分けたスキーマを拡張(extend)しつづけて、最終的に得たいスキーマを生成する、というスタイルになっています。

スキーマのリンク作業は、Apollo-Server が行ってくれます。配列で渡せば良いので、スキーマを配列にして返しています。

### リゾルバ

リゾルバファイルも、スキーマと同様の考え方で分割することができます。詳細は割愛します。

**User**

```typescript:./src/index.ts
import { IResolvers } from 'apollo-server-express';
import uuidv4 from 'uuid/v4';

const resolvers: IResolvers = {
  Query: {
    me: (parent, args, { me }) => me,
    users: (parent, args, { models }) => Object.values(models.users),
    user: (parent, { id }, { models }) => models.users[id],
  },

  User: {
    username: (user: User) => `${user.firstName} ${user.lastName}`,
    messages: (user: User, args, { models }) =>
      Object.values<Message>(models.messages)
        .filter((m: Message) => +m.userId === +user.id)
        .map((m: Message) => models.messages[m.id]),
  },
};

export default resolvers;
```

**Message**

```typescript:./src/index.ts
import { IResolvers } from 'apollo-server-express';
import uuidv4 from 'uuid/v4';

const resolvers: IResolvers = {
  Query: {
    messages: (parent, args, { models }) => Object.values(models.messages),
    message: (parent, { id }, { models }) => models.messages[id],
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      models.messages[id] = message;
      console.log('message keys', Object.keys(models.messages));
      return message;
    },
    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMesasges } = models.messages;
      if (!message) return false;
      models.messages = otherMesasges;
      console.log('message keys', Object.keys(models.messages));
      return true;
    },
  },

  Message: {
    user: (message: Message, args, { models }) => models.users[message.userId],
  },
};

export default resolvers;
```

**ベースとなるリゾルバファイル**

```typescript:./src/index.ts
import userResolvers from './user';
import messageResolvers from './message';

export default [userResolvers, messageResolvers];
```

# 完成品

実装したリポジトリはこちらです；  
https://github.com/suzukalight/study-graphql-apollo-server
