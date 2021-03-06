import graphql from 'babel-plugin-relay/macro'
import {createFragmentContainer, commitLocalUpdate} from 'react-relay'
import {JiraScopingSearchInput_meeting} from '../__generated__/JiraScopingSearchInput_meeting.graphql'
import React from 'react'
import styled from '@emotion/styled'
import {PALETTE} from '../styles/paletteV2'
import Icon from './Icon'
import Atmosphere from '../Atmosphere'
import useAtmosphere from '../hooks/useAtmosphere'
import AtlassianClientManager from '../utils/AtlassianClientManager'

const SearchInput = styled('input')({
  appearance: 'none',
  border: '1px solid transparent',
  color: PALETTE.TEXT_MAIN,
  fontSize: 16,
  margin: 0,
  outline: 0,
  backgroundColor: 'transparent',
  width: '100%'
})

const Wrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flex: 1
})

const ClearSearchIcon = styled(Icon)<{isEmpty: boolean}>(({isEmpty}) => ({
  color: PALETTE.TEXT_GRAY,
  cursor: 'pointer',
  padding: 12,
  visibility: isEmpty ? 'hidden' : undefined
}))

const setSearch = (atmosphere: Atmosphere, meetingId: string, value: string) => {
  commitLocalUpdate(atmosphere, (store) => {
    const meeting = store.get(meetingId)
    console.log('meet', meeting)
    if (!meeting) return
    meeting.setValue(value, 'jiraSearchQuery')
  })
}

interface Props {
  meeting: JiraScopingSearchInput_meeting
}

const JiraScopingSearchInput = (props: Props) => {
  const {meeting} = props
  const {id: meetingId, jiraSearchQuery, viewerMeetingMember} = meeting
  const {teamMember} = viewerMeetingMember
  const {atlassianAuth} = teamMember
  const accessToken = atlassianAuth?.accessToken
  const isEmpty = !jiraSearchQuery
  const atmosphere = useAtmosphere()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(atmosphere, meetingId, e.target.value)
  }
  const clearSearch = () => {
    setSearch(atmosphere, meetingId, '')
  }
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || e.shiftKey) return
    onSubmit()

  }
  const onSubmit = () => {
    const manager = new AtlassianClientManager(accessToken || '')
    console.log('man', manager)
  }
  return (
    <Wrapper>
      <SearchInput value={jiraSearchQuery || ''} placeholder={'Search issues on Jira'} onChange={onChange} onKeyPress={onKeyPress} />
      <ClearSearchIcon isEmpty={isEmpty} onClick={clearSearch}>close</ClearSearchIcon>
    </Wrapper>
  )
}

export default createFragmentContainer(JiraScopingSearchInput, {
  meeting: graphql`
    fragment JiraScopingSearchInput_meeting on PokerMeeting {
      id
      jiraSearchQuery
      viewerMeetingMember {
        teamMember {
          atlassianAuth {
            accessToken
          }
        }
      }
    }
  `
})
