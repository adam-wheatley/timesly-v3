/* eslint-disable import/first */
require('dotenv').config()
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createContext } from './context'
import { schema } from './schema'
;(async () => {
  const app = express()
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  )

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
