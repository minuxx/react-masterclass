import styled from 'styled-components'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

// transformation
// -800 => 2
// -400 => 1.5
// 0    => 1
// 400  => 0.5
// 800  => 0

function App() {
  const x = useMotionValue(0)
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0]) // motionValue, input, output

  useMotionValueEvent(scale, 'change', (s) => {
    console.log(s)
  })

  return (
    <Wrapper>
      <Box style={{ x, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  )
}

export default App
