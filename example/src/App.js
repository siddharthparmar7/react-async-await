import React, { Component } from 'react'
import AsyncAwait from 'react-async-await'

export default class App extends Component {
  render() {
    return (
      <AsyncAwait
        url={[
          'https://jsonplaceholder.typicode.com/posts',
          'https://jsonplaceholder.typicode.com/users'
        ]}
      >
        {({ loading, error, data }) => {
          if (error) return <h2>{error}</h2>
          if (loading) return <h2>Loading...</h2>
          if (data) console.log(data)
        }}
      </AsyncAwait>
    )
  }
}
