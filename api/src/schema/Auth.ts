import { objectType } from 'nexus'

const LoginResponse = objectType({
  name: 'LoginResponse',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  },
})

export { LoginResponse }
