import React, { Component } from 'react'
import { AsyncAwait } from 'react-async-await'

class AnotherComponent extends Component {
  render() {
    return (
      <AsyncAwait path={['/posts', '/users']}>
        {({ loading, error, data }) => {
          if (error) return <h2>{error}</h2>
          if (loading) return <h2>Loading...</h2>
          if (data) console.log(data)
        }}
      </AsyncAwait>
    )
  }
}

export default AnotherComponent
