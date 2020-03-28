import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, fieldAuthorizePlugin } from 'nexus'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Post } from './Post'
import { User } from './User'
import { Company } from './Company'
import { Team } from './Team'
import { LoginResponse } from './Auth'

export const schema = makeSchema({
  types: [Query, Mutation, Post, Company, Team, User, LoginResponse],
  plugins: [nexusPrismaPlugin(), fieldAuthorizePlugin()],
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
