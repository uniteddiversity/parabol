import styled from '@emotion/styled'
import React from 'react'
import {PALETTE} from '../styles/paletteV2'
import Icon from './Icon'

const Message = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px dashed ${PALETTE.BORDER_GRAY}`,
  borderRadius: 4,
  color: PALETTE.TEXT_GRAY,
  fontSize: 14,
  fontStyle: 'italic',
  lineHeight: '32px',
  margin: '64px auto auto',
  padding: '8px 16px'
})

const Info = styled(Icon)({
  paddingRight: 16
})

const JiraScopingNoResults = () => {
  return (
    <Message>
      <Info>info</Info>
      No issues match that query
    </Message>
  )
}

export default JiraScopingNoResults
