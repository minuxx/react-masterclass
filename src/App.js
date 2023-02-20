import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 10px;
  }
  50% {
    border-radius: 100px;
  }
  100%{
    transform: rotate(360deg);
    border-radius: 10px;
  }
`

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;

  span {
    font-size: 36px;
    &:hover {
      font-size: 40px;
    }
  }
`

function App() {
  return (
    <Wrapper>
      <Box>
        <span>😛</span>
      </Box>
    </Wrapper>
  )
}

export default App
