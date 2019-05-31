import makeHref from 'universal/utils/makeHref'
import {SLACK_SCOPE} from 'universal/utils/constants'
import getOAuthPopupFeatures from 'universal/utils/getOAuthPopupFeatures'
import {MenuMutationProps} from 'universal/hooks/useMutationProps'
import AddSlackAuthMutation from 'universal/mutations/AddSlackAuthMutation'
import Atmosphere from 'universal/Atmosphere'

interface SlackClientManagerOptions {
  fetch?: Window['fetch']
}

interface ErrorResponse {
  ok: false
  error: string
}

interface IdentityResponse {
  ok: true
  user: {
    name: string
    id: string
  }
  team: {
    id: string
  }
}

interface SlackChannelInfo {
  id: string
  name: string
  is_channel: boolean
  created: number
  is_archived: boolean
  is_general: boolean
  name_normalized: string
  is_shared: boolean
  is_org_shared: boolean
  is_member: boolean
  is_private: boolean
  is_mpim: boolean
  members: string[]
  topic: {
    value: string
    creator: string
    last_set: number
  }
  purpose: {
    value: string
    creator: string
    last_set: number
  }
  previous_names: string[]
  num_members: number
}

interface ChannelInfoResponse {
  ok: true
  channel: SlackChannelInfo
}

interface ChannelListResponse {
  ok: true
  channels: SlackChannelInfo[]
}

interface PostMessageResponse {
  ok: true
}

interface SlackUser {
  id: string
  team_id: string
  name: string
  deleted: boolean
  color: string
  real_name: string
  tz: string
  tz_label: string
  tz_offset: number
  profile: {
    avatar_hash: string
    status_text: string
    status_emoj: string
    status_expiration: number
    real_name: string
    display_name: string
    real_name_normalized: string
    display_name_normalized: string
    // email?: string
    image_original: string
    image_24: string
    image_32: string
    image_48: string
    image_72: string
    image_192: string
    image_512: string
    team: string
  }
  is_admin: true
  is_owner: boolean
  is_primary_owner: boolean
  is_restricted: boolean
  is_ultra_restricted: boolean
  is_bot: boolean
  is_stranger: boolean
  updated: number
  is_app_user: boolean
  has_2fa: boolean
  locale: string
}

interface UserInfoResponse {
  ok: true
  user: SlackUser
}

class SlackClientManager {
  static openOAuth (atmosphere: Atmosphere, teamId: string, mutationProps: MenuMutationProps) {
    const {submitting, onError, onCompleted, submitMutation} = mutationProps
    const providerState = Math.random()
      .toString(36)
      .substring(5)
    const redirect = makeHref('/auth/slack')
    const uri = `https://slack.com/oauth/authorize?client_id=${
      window.__ACTION__.slack
    }&scope=${SLACK_SCOPE}&state=${providerState}&redirect_uri=${redirect}`
    console.log('adding message listener')
    const popup = window.open(
      uri,
      'OAuth',
      getOAuthPopupFeatures({width: 500, height: 600, top: 56})
    )
    const handler = (event) => {
      if (typeof event.data !== 'object' || event.origin !== window.location.origin || submitting) {
        return
      }
      const {code, state} = event.data
      if (state !== providerState || typeof code !== 'string') return
      submitMutation()
      AddSlackAuthMutation(atmosphere, {code, teamId}, {onError, onCompleted})
      popup && popup.close()
      window.removeEventListener('message', handler)
    }
    window.addEventListener('message', handler)
  }

  accessToken: string
  fetch: typeof fetch
  // the any is for node until we can use tsc in nodeland
  cache: {[key: string]: {result: any; expiration: number | any}} = {}
  timeout = 5000
  headers: any

  constructor (accessToken: string, options: SlackClientManagerOptions = {}) {
    this.accessToken = accessToken
    this.fetch = options.fetch || window.fetch.bind(window)
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json' as 'application/json'
    // }

    // this.post = async (url, payload) => {
    //   const res = await fetch(url, {
    //     method: 'POST',
    //     headers,
    //     body: JSON.stringify(payload)
    //   })
    //   return res.json()
    // }
  }

  async get<T> (url: string): Promise<T | ErrorResponse> {
    const record = this.cache[url]
    if (!record) {
      const res = await this.fetch(url)
      const result = await res.json()
      this.cache[url] = {
        result,
        expiration: setTimeout(() => {
          delete this.cache[url]
        }, this.timeout)
      }
    } else {
      clearTimeout(record.expiration)
      record.expiration = setTimeout(() => {
        delete this.cache[url]
      }, this.timeout)
    }
    return this.cache[url].result
  }

  getChannelInfo (slackChannelId: string) {
    return this.get<ChannelInfoResponse>(
      `https://slack.com/api/channels.info?token=${this.accessToken}&channel=${slackChannelId}`
    )
  }

  getChannelList () {
    return this.get<ChannelListResponse>(
      `https://slack.com/api/channels.list?token=${this.accessToken}&exclude_archived=1`
    )
  }

  getUserInfo (userId: string) {
    return this.get<UserInfoResponse>(
      `https://slack.com/api/users.info?token=${this.accessToken}&user=${userId}`
    )
  }

  postMessage (channelId: string, text: string) {
    return this.get<PostMessageResponse>(
      `https://slack.com/api/chat.postMessage?token=${
        this.accessToken
      }&channel=${channelId}&text=${text}&unfurl_links=true`
    )
  }
}

export default SlackClientManager
