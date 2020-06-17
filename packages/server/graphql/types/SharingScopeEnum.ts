import {GraphQLEnumType} from 'graphql'

const SharingScopeEnum = new GraphQLEnumType({
  name: 'SharingScopeEnum',
  description: 'The scope of a shareable item',
  values: {
    team: {},
    organization: {},
    public: {}
  }
})

export default SharingScopeEnum
