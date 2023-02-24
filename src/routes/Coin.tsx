import { useQuery } from 'react-query'
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { fetchCoinInfo, fetchCoinTickers } from '../api'
import Chart from './Chart'
import Price from './Price'
import { useContext } from 'react'
import { ThemeContext } from '../contexts'
import ToggleSwitch from '../components/ToggleSwitch'

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-gap: 20px;
  align-items: center;
`

const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`

const BackBtn = styled.div`
  a {
    font-size: 14px;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.btnBgColor};
    border-radius: 50%;
    border: 1px solid transparent;
    color: ${(props) => props.theme.bgColor};
    padding-top: 2px;
    padding-right: 2px;
  }
`

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.overviewBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const Description = styled.p`
  margin: 20px 0px;
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.tabBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : 'white;')};
  a {
    display: block;
  }
`

interface RouterParams {
  coinId: string
}

interface ILocationState {
  state: {
    name: string
  }
}

interface IInfoData {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
  logo: string
  description: string
  message: string
  open_source: boolean
  started_at: string
  development_status: string
  hardware_wallet: boolean
  proof_type: string
  org_structure: string
  hash_algorithm: string
  first_data_at: string
  last_data_at: string
}

interface IPriceData {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      price: number
      market_cap: number
      volume_24h: number
      percent_change_1h: number
      percent_change_6h: number
      percent_change_12h: number
      percent_change_24h: number
    }
  }
}

function Coin() {
  const { coinId } = useParams() as unknown as RouterParams
  const { state } = useLocation() as ILocationState
  const context = useContext(ThemeContext)
  const chartMatch = useMatch('/:coinId/chart')
  const priceMatch = useMatch('/:coinId/price')

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId ?? '')
  )
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId ?? '')
  )

  const loading = infoLoading || tickersLoading

  return (
    <Container>
      <Helmet>
        <title>
          {state.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackBtn>
          <Link to="/">〈</Link>
        </BackBtn>
        <Title>
          {state.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        <ToggleSwitch onToggle={context.toggleTheme} />
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} state={{ name: state.name }}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`} state={{ name: state.name }}>
                Price
              </Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  )
}

export default Coin
