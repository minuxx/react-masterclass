import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Coin from './routes/Coin'
import Coins from './routes/Coins'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {/* /: Router 에게 우리의 URL이 변수값을 갖는다는 것을 말해주는 방식 */}
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
