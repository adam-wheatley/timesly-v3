/* eslint-disable import/first */
require('dotenv').config()
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createContext, prisma } from './context'
import { schema } from './schema'
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken'
import { User } from '@prisma/client'
import { sendRefreshToken, createAccessToken } from './utils/auth'
;(async () => {
  const app = express()
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  )

  app.use('/refresh_token', cookieParser())
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid
    const invalidToken = () => res.send({ ok: false, accessToken: '' })
    if (!token) return invalidToken()

    let payload: any = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (err) {
      return invalidToken()
    }

    const user: User | null = await prisma.user.findOne({
      where: {
        id: payload.userId,
      },
    })
    if (!user) return invalidToken()
    if (user.tokenVersion !== payload.tokenVersion) return invalidToken()
    sendRefreshToken(res, user)
    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: createContext(),
  })

  apolloServer.applyMiddleware({ app, cors: false })
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port} ⭐️`)
  })
})()
