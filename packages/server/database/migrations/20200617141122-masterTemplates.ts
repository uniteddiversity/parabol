import {R} from 'rethinkdb-ts'

const createdAt = new Date('2016-06-01')

const aGhostUser = {
  id: 'aGhostUser',
  preferredName: 'A Ghost',
  connectedSockets: [],
  email: 'matt@parabol.co',
  featureFlags: [],
  updatedAt: createdAt,
  picture:
    'https://action-files.parabol.co/production/build/v5.10.1/42342faa774f05b7626fa91ff8374e59.svg',
  inactive: false,
  identities: [],
  createdAt,
  tier: 'enterprise',
  tms: 'aGhostTeam'
}
const aGhostOrg = {
  id: 'aGhostOrg',
  name: 'Ghost Org',
  picture:
    'https://action-files.parabol.co/production/build/v5.10.1/42342faa774f05b7626fa91ff8374e59.svg',
  tier: 'enterprise',
  createdAt,
  updatedAt: createdAt
}
const aGhostTeam = {
  id: 'aGhostTeam',
  name: 'Ghost Team',
  createdAt,
  createdBy: 'aGhostUser',
  isArchived: false,
  isPaid: true,
  tier: 'enterprise',
  orgId: 'aGhostOrg',
  isOnboardTeam: true,
  updatedAt: createdAt
}

const aGhostOrgMember = {
  id: 'aGhostOrganizationUser',
  inactive: false,
  joinedAt: createdAt,
  newUserUntil: createdAt,
  orgId: 'aGhostOrg',
  removedAt: null,
  role: 'BILLING_LEADER',
  userId: 'aGhostUser'
}

const templates = [
  {
    createdAt: createdAt,
    id: 'sailboatTemplate',
    isActive: true,
    name: 'Sailboat',
    teamId: 'aGhostTeam',
    updatedAt: createdAt,
    scope: 'public'
  },
  {
    createdAt: createdAt,
    id: 'startStopContinueTemplate',
    isActive: true,
    name: 'Start Stop Continue',
    teamId: 'aGhostTeam',
    updatedAt: createdAt,
    scope: 'public'
  },
  {
    createdAt: createdAt,
    id: 'workingStuckTemplate',
    isActive: true,
    name: 'Working & Stuck',
    teamId: 'aGhostTeam',
    updatedAt: createdAt,
    scope: 'public'
  },
  {
    createdAt: createdAt,
    id: 'fourLsTemplate',
    isActive: true,
    name: 'Liked, Learned, Lacked, Longed for',
    teamId: 'aGhostTeam',
    updatedAt: createdAt,
    scope: 'public'
  },
  {
    createdAt: createdAt,
    id: 'GladSadMadTemplate',
    isActive: true,
    name: 'Glad, Sad, Mad',
    teamId: 'aGhostTeam',
    updatedAt: createdAt,
    scope: 'public'
  }
]

const phaseItems = [
  {
    createdAt: createdAt,
    description: 'What did you learn?',
    groupColor: '#5CA0E5',
    id: 'promptWhatLearn',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Learned',
    sortOrder: 1,
    teamId: 'aGhostTeam',
    templateId: 'fourLsTemplate',
    title: 'Learned',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What was missing?',
    groupColor: '#E59545',
    id: 'promptWhatMissing',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Lacked',
    sortOrder: 2,
    teamId: 'aGhostTeam',
    templateId: 'fourLsTemplate',
    title: 'Lacked',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What’s slowing the team down in your journey?',
    groupColor: '#D9D916',
    id: 'promptWhatSlowing',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Anchors',
    sortOrder: 1,
    teamId: 'aGhostTeam',
    templateId: 'sailboatTemplate',
    title: 'Anchors',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What are you happy about?',
    groupColor: '#52CC52',
    id: 'promptWhatHappy',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Glad',
    sortOrder: 0,
    teamId: 'aGhostTeam',
    templateId: 'GladSadMadTemplate',
    title: 'Glad',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What are you angry or disappointed about?',
    groupColor: '#E55C5C',
    id: 'promptWhatAngry',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Mad',
    sortOrder: 2,
    teamId: 'aGhostTeam',
    templateId: 'GladSadMadTemplate',
    title: 'Mad',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What could be improved?',
    groupColor: '#D9D916',
    id: 'promptWhatImproved',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Sad',
    sortOrder: 1,
    teamId: 'aGhostTeam',
    templateId: 'GladSadMadTemplate',
    title: 'Sad',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What current behaviors should we keep doing?',
    groupColor: '#D9D916',
    id: 'promptWhatKeep',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Continue',
    sortOrder: 2,
    teamId: 'aGhostTeam',
    templateId: 'startStopContinueTemplate',
    title: 'Continue',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What’s helping us make progress toward our goals?',
    groupColor: '#52CC52',
    id: 'promptWhatHelps',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'What’s working?',
    sortOrder: 0,
    teamId: 'aGhostTeam',
    templateId: 'workingStuckTemplate',
    title: 'Positive',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What risks may the team encounter ahead?',
    groupColor: '#E55C5C',
    id: 'promptWhatRisks',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Risks',
    sortOrder: 2,
    teamId: 'aGhostTeam',
    templateId: 'sailboatTemplate',
    title: 'Risks',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What new behaviors should we adopt?',
    groupColor: '#52CC52',
    id: 'promptWhatAdopt',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Start',
    sortOrder: 0,
    teamId: 'aGhostTeam',
    templateId: 'startStopContinueTemplate',
    title: 'Start',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What’s helping the team reach its goals?',
    groupColor: '#52CC52',
    id: 'promptWhatHelpGoal',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Wind in the sails',
    sortOrder: 0,
    teamId: 'aGhostTeam',
    templateId: 'sailboatTemplate',
    title: 'Wind in the sails',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What existing behaviors should we cease doing?',
    groupColor: '#E55C5C',
    id: 'promptWhatCease',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Stop',
    sortOrder: 1,
    teamId: 'aGhostTeam',
    templateId: 'startStopContinueTemplate',
    title: 'Stop',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What went well?',
    groupColor: '#52CC52',
    id: 'promptWhatWell',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Liked',
    sortOrder: 0,
    teamId: 'aGhostTeam',
    templateId: 'fourLsTemplate',
    title: 'Liked',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What did you want to happen?',
    groupColor: '#AC73E5',
    id: 'promptWhatHappen',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Longed for',
    sortOrder: 3,
    teamId: 'aGhostTeam',
    templateId: 'fourLsTemplate',
    title: 'Longed for',
    updatedAt: createdAt
  },
  {
    createdAt: createdAt,
    description: 'What’s blocking us from achieving our goals?',
    groupColor: '#E55C5C',
    id: 'promptWhatBlocking',
    isActive: true,
    phaseItemType: 'retroPhaseItem',
    question: 'Where did you get stuck?',
    sortOrder: 1,
    teamId: 'aGhostTeam',
    templateId: 'workingStuckTemplate',
    title: 'Negative',
    updatedAt: createdAt
  }
]
export const up = async function(r: R) {
  try {
    await r
      .table('ReflectTemplate')
      .update({scope: 'team'})
      .run()
  } catch (e) {
    console.log(e)
  }
  try {
    await Promise.all([
      r.table('User').insert(aGhostUser),
      r.table('OrganizationUser').insert(aGhostOrgMember),
      r.table('Organization').insert(aGhostOrg),
      r.table('Team').insert(aGhostTeam),
      r.table('ReflectTemplate').insert(templates),
      r.table('CustomPhaseItem').insert(phaseItems)
    ])
  } catch (e) {
    console.log(e)
  }
  try {
    await r
      .table('MeetingSettings')
      .filter({meetingType: 'retrospective'})
      .update({
        managedTemplateIds: []
      })
      .run()
  } catch (e) {
    console.log(e)
  }
}

export const down = async function(r: R) {
  try {
    await r
      .table('ReflectTemplate')
      .replace((row) => row.without('scope'))
      .run()
  } catch (e) {
    console.log(e)
  }
  const templateIds = templates.map(({id}) => id)
  const promptIds = phaseItems.map(({id}) => id)
  try {
    await Promise.all([
      r
        .table('User')
        .get(aGhostUser.id)
        .delete(),
      r
        .table('OrganizationUser')
        .get(aGhostOrgMember.id)
        .delete(),
      r
        .table('Organization')
        .get(aGhostOrg.id)
        .delete(),
      r
        .table('Team')
        .get(aGhostTeam.id)
        .delete(),
      r
        .table('ReflectTemplate')
        .getAll(r.args(templateIds))
        .delete(),
      r
        .table('CustomPhaseItem')
        .getAll(r.args(promptIds))
        .delete()
    ])
  } catch (e) {
    console.log(e)
  }
  try {
    await r
      .table('MeetingSettings')
      .filter({meetingType: 'retrospective'})
      .replace((row) => row.without('managedTemplateIds'))
      .run()
  } catch (e) {
    console.log(e)
  }
}
