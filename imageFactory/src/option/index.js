import * as React from 'react'
import { createRoot } from 'react-dom/client'
import "@arco-design/web-react/dist/css/arco.css";
import App from './app'

const root = createRoot(document.getElementById('root'))
root.render(<App />)