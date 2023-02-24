import { useState } from 'react'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox']:checked + span::before {
    transform: translateX(25px);
    background-color: #333;
  }

  input[type='checkbox']:checked + span {
    background-color: ${(props) => props.theme.accentColor};
  }

  span {
    position: absolute;
    cursor: pointer;
    background-color: ${(props) => props.theme.accentColor};
    border-radius: 25px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: background-color 0.2s ease;
  }

  span::before {
    position: absolute;
    content: '';
    left: 2px;
    top: 2px;
    width: 21px;
    height: 21px;
    background-color: ${(props) => props.theme.toggleBtnColor};
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
`

interface IThemeSwitchProps {
  onToggle: () => void
}

function ToggleSwitch({ onToggle }: IThemeSwitchProps) {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
    onToggle()
  }

  return (
    <Wrapper>
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span />
    </Wrapper>
  )
}

export default ToggleSwitch
