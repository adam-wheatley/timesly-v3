import { objectType, stringArg } from 'nexus'
import { isAuth } from '../utils/isAuth'

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.post()

    t.list.field('feed', {
      type: 'Post',
      resolve: (_, args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        })
      },
    })

    t.field('me', {
      type: 'User',
      nullable: true,
      authorize: (_, __, ctx) => isAuth(ctx),
      resolve: (_, __, ctx) => {
        return ctx.prisma.user.findOne({
          where: {
            id: ctx.payload?.userId,
          },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

export { Query }
