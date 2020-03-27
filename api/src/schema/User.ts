import { objectType } from 'nexus'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.firstName()
    t.model.lastName()
    t.model.email()
    t.model.posts({
      pagination: false,
    })
  },
})

export { User }
