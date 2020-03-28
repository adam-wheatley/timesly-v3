import { verify } from 'jsonwebtoken'
import { Context } from '../context'

export const isAuth = (ctx: Context) => {
  const authorization = ctx.req.headers['authorization']

  if (!authorization) {
    return false
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
    ctx.payload = payload as any
    return true
  } catch (err) {
    return false
  }
}
