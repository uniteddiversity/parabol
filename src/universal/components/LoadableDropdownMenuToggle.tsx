import React, {ComponentType, ReactElement} from 'react'
import styled from 'react-emotion'
import FieldBlock from 'universal/components/FieldBlock/FieldBlock'
import LoadableDropdownMenu from 'universal/components/LoadableDropdownMenu'
import StyledFontAwesome from 'universal/components/StyledFontAwesome'
import makeFieldColorPalette from 'universal/styles/helpers/makeFieldColorPalette'
import ui from 'universal/styles/ui'

const originAnchor = {
  vertical: 'bottom',
  horizontal: 'left'
}

const targetAnchor = {
  vertical: 'top',
  horizontal: 'left'
}

const DownButtonIcon = styled(StyledFontAwesome)({
  cursor: 'pointer',
  paddingRight: '1rem',
  lineHeight: '2.375rem',
  left: '-1px',
  right: '-1px',
  height: '100%',
  position: 'absolute',
  textAlign: 'right',
  top: 0,
  width: '100%',
  fontSize: ui.iconSize
})

const DropdownBlock = styled('div')({
  display: 'inline-block',
  width: '100%'
})

const InputBlock = styled('div')(
  ({disabled}: {disabled: boolean}) => ({
    ...ui.fieldBaseStyles,
    ...ui.fieldSizeStyles.medium,
    ...makeFieldColorPalette('white', !disabled),
    position: 'relative',
    userSelect: 'none'
  }),
  ({disabled}: {disabled: boolean}) => disabled && {...ui.fieldDisabled}
)

interface Props {
  defaultText: string | ReactElement<any>
  disabled?: boolean
  LoadableComponent: ComponentType<any>
  queryVars?: object
}

const LoadableDropdownMenuToggle = (props: Props) => {
  const {defaultText, disabled, queryVars, LoadableComponent} = props
  return (
    <DropdownBlock>
      <FieldBlock>
        <InputBlock disabled={!!disabled} tabIndex={1}>
          <span>{defaultText}</span>
          {!disabled && (
            <LoadableDropdownMenu
              LoadableComponent={LoadableComponent}
              maxHeight={350}
              originAnchor={originAnchor}
              queryVars={queryVars}
              targetAnchor={targetAnchor}
              toggle={<DownButtonIcon name='chevron-down' />}
            />
          )}
        </InputBlock>
      </FieldBlock>
    </DropdownBlock>
  )
}

export default LoadableDropdownMenuToggle
