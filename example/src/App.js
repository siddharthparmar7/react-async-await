import React, { Component } from 'react'
import AsyncAwaitProvider from 'async-react'
import AnotherComponent from './AnotherComponent'

export default class App extends Component {
  render() {
    return (
      <AsyncAwaitProvider
        baseUrl="https://xxx.xxx.xx/api"
        headerOptions={{
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }}
      >
        <AnotherComponent />
      </AsyncAwaitProvider>
    )
  }
}
