import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { fetchCoins } from '../api'
import ToggleSwitch from '../components/ToggleSwitch'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isDarkAtom } from './atoms'

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  grid-gap: 20px;
  align-items: center;
`

const CoinList = styled.ul``

const Coin = styled.li`
  background-color: ${(props) => props.theme.coinItemBgColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: 500;
  color: ${(props) => props.theme.accentColor};
`

const Loader = styled.span`
  text-align: center;
  display: block;
`

interface ICoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins)
  const isDark = useRecoilValue(isDarkAtom)
  const setDarkAtom = useSetRecoilState(isDarkAtom)

  const toggleDarkAtom = () => {
    window.localStorage.setItem('themeMode', isDark ? 'light' : 'dark')
    setDarkAtom((prev) => !prev)
  }

  return (
    <Container>
      <Helmet>
        <title>Crypto Tracker</title>
      </Helmet>
      <Header>
        <span></span>
        <Title>Crypto Tracker</Title>
        <ToggleSwitch onToggle={toggleDarkAtom} />
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  )
}

export default Coins
