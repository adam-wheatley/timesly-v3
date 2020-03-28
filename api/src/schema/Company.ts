import { objectType } from 'nexus'

const Company = objectType({
  name: 'Company',
  definition(t) {
    t.model.id()
    t.model.name()
  },
})

export { Company }
