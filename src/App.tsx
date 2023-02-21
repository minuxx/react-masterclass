import React from 'react'
import styled, { keyframes } from 'styled-components'

const Title = styled.span`
  color: tomato;
`

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  )
}

export default App
