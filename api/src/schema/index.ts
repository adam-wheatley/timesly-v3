import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema } from 'nexus'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Post } from './Post'
import { User } from './User'

export const schema = makeSchema({
  types: [Query, Mutation, Post, User],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
})
