import { useState } from 'react'
import { useQuery } from 'react-query'
import { getMovies, IGetMoviesResult } from '../api'
import styled from 'styled-components'
import { makeImagePath } from '../utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useMatch, useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
`

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`

const Slider = styled.div`
  position: relative;
  top: -20px;
`

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    font-size: 18px;
    text-align: center;
  }
`

const rowVariants = {
  hidden: {
    x: window.innerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 5,
  },
}

const boxVariants = {
  noraml: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      type: 'tween',
      delay: 0.5,
    },
  },
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      delay: 0.5,
    },
  },
}

const offset = 6

function Home() {
  const navigate = useNavigate()
  const bigMovieMatch = useMatch('/movies/:id')
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  )

  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const increaseIndex = () => {
    if (data) {
      if (leaving) return
      toggleLeaving()
      const totalMovies = data?.results.length - 1 // 하나는 배너
      const maxIndex = Math.floor(totalMovies / offset) - 1 // 올림, 0부터 시작하니 -1
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
    }
  }
  const toggleLeaving = () => setLeaving((prev) => !prev)
  const onBoxClick = (movieId: number) => {
    navigate(`/movies/${movieId}`)
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>

          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={String(movie.id)}
                      key={movie.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClick(movie.id)}
                      transition={{ type: 'tween' }}
                      bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <motion.div
                layoutId={bigMovieMatch.params.id}
                style={{
                  position: 'absolute',
                  width: '40vw',
                  height: '80vh',
                  backgroundColor: 'red',
                  top: 50,
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                }}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  )
}

export default Home
