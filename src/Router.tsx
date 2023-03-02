import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes></Routes>
    </BrowserRouter>
  )
}

export default Router
