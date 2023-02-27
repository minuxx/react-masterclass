import { useQuery } from 'react-query'
import { fetchCoinTickers } from '../api'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    font-size: 13px;
    text-align: center;
    border-bottom: 1.5px solid ${(props) => props.theme.textColor};
    padding: 10px;
  }
`

interface IPriceData {
  quotes: {
    USD: {
      market_cap: number
      volume_24h: number
      percent_change_1h: number
      percent_change_6h: number
      percent_change_12h: number
      percent_change_24h: number
    }
  }
}

interface RouterParams {
  coinId: string
}

function Price() {
  const { coinId } = useParams() as unknown as RouterParams
  const { isLoading, data } = useQuery<IPriceData>(['price', coinId], () =>
    fetchCoinTickers(coinId)
  )

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <Table>
          <thead>
            <tr>
              <th>총 시가</th>
              <th>거래량(24H)</th>
              <th>변동(1H)</th>
              <th>변동(6H)</th>
              <th>변동(12H)</th>
              <th>변동(24H)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {((data?.quotes.USD.market_cap ?? 0) / 1000000000000).toFixed(
                  2
                )}
                T
              </td>
              <td>
                {((data?.quotes.USD.volume_24h ?? 0) / 1000000000000).toFixed(
                  2
                )}
                T
              </td>
              <td>{data?.quotes.USD.percent_change_24h.toFixed(2)}%</td>
              <td>{data?.quotes.USD.percent_change_12h.toFixed(2)}%</td>
              <td>{data?.quotes.USD.percent_change_6h.toFixed(2)}%</td>
              <td>{data?.quotes.USD.percent_change_1h.toFixed(2)}%</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default Price
