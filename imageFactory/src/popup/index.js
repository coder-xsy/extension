import * as React from 'react'
import { createRoot } from 'react-dom/client'
import "@arco-design/web-react/dist/css/arco.css";

import CreateImage from '../option/create/index'

const App = () => {
  return (
    <div style={{width: '600px'}}>
      <CreateImage maxSize={{maxWidth: '520px', maxHeight: '300px'}} />
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)