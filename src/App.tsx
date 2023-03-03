import styled from 'styled-components'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useScroll,
} from 'framer-motion'

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

function App() {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-800, 0, 800], [-360, 1, 360]) // motionValue, input, output
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
      'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
    ]
  )

  const { scrollY, scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log(latest)
  })

  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotate, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  )
}

export default App
