import React from 'react'
import { useRouteError } from 'react-router-dom'
function ErrorPage() {

    let routingError=useRouteError()

  return (
    <div className='text-center mt-5 text-danger p-5 bg-light'>
        <h1>{routingError.status}-{routingError.data}</h1>
    </div>
  )
}

export default ErrorPage