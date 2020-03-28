import { objectType } from 'nexus'

const Team = objectType({
  name: 'Team',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.users()
    t.model.company()
  },
})

export { Team }
