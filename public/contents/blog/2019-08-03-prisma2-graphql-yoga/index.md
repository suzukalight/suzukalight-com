---
title: Prisma2 + graphql-yoga でサーバを立てる
date: '2019-08-03T00:02:00'
category: Technology
tags: ['prisma2', 'hands-on', 'prisma', 'graphql-yoga']
hero: ./title.png
status: 'draft'
---

# Prisma2

# graphql-yoga

## 以前に触っていたもの

```javascript
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
```

- typeDefs
- resolvers

## Prisma2 のサンプルにあったもの

```javascript
const photon = new Photon();

const schema = makeSchema({
  types: [Query, Mutation, Post, User, nexusPrisma],
  outputs: {
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
});

const server = new GraphQLServer({
  schema,
  context: { photon },
});
```

- schema
- context

## 違い

### スキーマ定義

- schema または typeDefs+resolvers のどちらかが必要

# セットアップ

- [photonjs/examples/typescript/graphql at master · prisma/photonjs](https://github.com/prisma/photonjs/tree/master/examples/typescript/graphql)

PhotonJS のサンプルを利用します。リポジトリをクローンします；

```bash
$ git clone git@github.com:prisma/photonjs.git
$ cd photonjs/examples/typescript/graphql
$ yarn
```

# Nexus

- [Database Access with Prisma 2 \(Preview\) · GraphQL Nexus](https://nexus.js.org/docs/database-access-with-prisma-v2)

Prisma2 Preview では、ORM として **nexus** を使用しています。PhotonJS のサンプルでは、それをプラグインとして利用する **@prisma/nexus** がインストールされています；

```javascript{3,5}:title=package.json
{
  "dependencies": {
    "@prisma/nexus": "^0.0.1",
    "graphql-yoga": "1.17.4",
    "nexus": "0.11.7"
  },
}
```

## モデル定義

マッピングするモデルを、Nexus の指定する形式で記述します；

```prisma:title=prisma/schema.prisma
model Race {
  id            Int @id
  raceId        String @unique
  createdAt     DateTime
  raceDate      DateTime
  courseCode    String
  kai           Int
  nichi         Int
  number        Int
  hondai        String
  gradeCode     String
  joukenCodeJy  String
  distance      Int
  trackCode     String
  hassouTime    DateTime
  tourokuTousuu Int
  shussouTousuu Int

  umaRaces      UmaRace[]
}

model UmaRace {
  id            Int @id
  umaRaceId     String @unique
  race          Race
  createdAt     DateTime
  raceDate      DateTime
  wakuban       Int
  umaban        Int
  name          String
  sexCode       String
  keiroCode     String
  age           Int
  tozaiCode     String
  choukyoushiRyakushou  String
  futanJuuryou  Int
  kishuRyakushou  String
  odds          Int
  ninki         Int
}
```

##
