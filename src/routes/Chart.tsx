import { useQuery } from 'react-query'
import { fetchCoinHistory } from '../api'
import ApexChart from 'react-apexcharts'

interface CoinProps {
  coinId: string
}

interface IHistorical {
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  market_cap: number
}

function Chart({ coinId }: CoinProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  )

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data
                ? data?.map((price) => {
                    return [
                      Number(price.time_close),
                      Number(price.open),
                      Number(price.high),
                      Number(price.low),
                      Number(price.close),
                    ]
                  })
                : [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              type: 'candlestick',
              height: 400,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              labels: { show: false },
              axisTicks: { show: false },
              type: 'datetime',
              categories: data?.map((price) =>
                new Date(parseInt(price.time_close) * 1000).toISOString()
              ),
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#4796ea',
                  downward: '#e54720',
                },
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default Chart
