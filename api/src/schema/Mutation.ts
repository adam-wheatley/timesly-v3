import { objectType, stringArg, arg } from 'nexus'
import { compare, hash } from 'bcryptjs'
import { sendRefreshToken, createAccessToken } from '../utils/auth'
import { isAuth } from '../utils/isAuth'

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('logout', {
      type: 'Boolean',
      resolve: (_, __, ctx) => {
        ctx.res.clearCookie('jid', {
          path: '/refresh_token',
        })
        return true
      },
    })

    t.field('revokeRefreshTokensForUser', {
      type: 'Boolean',
      args: {
        userId: stringArg(),
      },
      resolve: async (_, { userId }, ctx) => {
        try {
          const user = await ctx.prisma.user.findOne({
            where: {
              id: userId,
            },
          })
          if (user?.tokenVersion) {
            await ctx.prisma.user.update({
              where: { id: userId },
              data: { tokenVersion: user.tokenVersion + 1 },
            })
          } else {
            return false
          }
        } catch (e) {
          return false
        }
        return true
      },
    })

    t.field('login', {
      type: 'LoginResponse',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_, { email, password }, { res, prisma }) => {
        const user = await prisma.user.findOne({
          where: { email },
        })

        if (!user) {
          throw new Error('Could not find user!')
        }

        const valid = await compare(password, user.password)
        if (!valid) {
          throw new Error('Incorrect password!')
        }

        sendRefreshToken(res, user)

        return {
          accessToken: createAccessToken(user),
          user,
        }
      },
    })

    t.field('updateMe', {
      type: 'Boolean',
      args: {
        firstName: stringArg(),
        lastName: stringArg(),
        dateOfBirth: arg({ type: 'DateTime' }),
      },
      authorize: (_, __, ctx) => isAuth(ctx),
      async resolve(
        _,
        { firstName, lastName, dateOfBirth },
        { prisma: { user }, payload },
      ) {
        try {
          await user.update({
            where: {
              id: payload?.userId,
            },
            data: {
              firstName,
              lastName,
              dateOfBirth,
            },
          })
          return true
        } catch (e) {
          return false
        }
      },
    })

    t.field('register', {
      type: 'User',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
        companyName: stringArg({ nullable: false }),
        firstName: stringArg(),
        lastName: stringArg(),
      },
      resolve: async (
        _,
        { email, password, companyName, firstName, lastName },
        ctx,
      ) => {
        const hashedPassword = await hash(password, 12)

        return ctx.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            company: {
              create: {
                name: companyName,
              },
            },
          },
        })
      },
    })
  },
})

export { Mutation }
