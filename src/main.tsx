import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './lib/firebase'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// بعد از mount شدن React، لودر اولیه را حذف کن
if (window.DiacoReady) {
  window.DiacoReady()
}