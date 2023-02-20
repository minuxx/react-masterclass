import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from 'styled-components'

const darkTheme = {
  textColor: 'whitesmoke',
  backgroundColor: '#111',
}

const lightTheme = {
  textColor: '#111',
  backgroundColor: 'whitesmoke',
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* 우리의 앱이 ThemeProvider 안에 있기 때문에, 우리의 component들이 색에 접근가능 */}
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
