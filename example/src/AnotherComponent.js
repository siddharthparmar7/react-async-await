import React, { Component } from 'react'
import { AsyncAwait } from 'async-react'

class AnotherComponent extends Component {
  render() {
    const headerOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: 'a@a.com',
        password: 'a@a.com'
      })
    }
    return (
      <AsyncAwait path={'/auth/login'} headerOptions={headerOptions}>
        {({ loading, error, data }) => {
          if (error) return <h2>{error.message}</h2>
          if (loading) return <h2>Loading...</h2>
          if (data) console.log(data)
        }}
      </AsyncAwait>
    )
  }
}

export default AnotherComponent
