import React from 'react'
import CreateImage from './create/index'
import './app.css'

const app = ({children}) => {
  return (<div>
    <div className="content">
      <CreateImage />
    </div>
  </div>)
}
export default app