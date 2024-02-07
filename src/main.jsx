import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/Store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

axios.defaults.baseURL = ("http://localhost:8080")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </Provider>
  </React.StrictMode>,
)
