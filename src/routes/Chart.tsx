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
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  )
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data ? data?.map((price) => price.close) : [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 5,
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
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#00cec9'], stops: [0, 100] },
            },
            colors: ['#0984e3'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default Chart
