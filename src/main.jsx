import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { Store, persistor } from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <App />
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    // </React.StrictMode>,
)
