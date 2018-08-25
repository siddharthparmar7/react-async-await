import React, { Component } from 'react'
import AsyncAwaitProvider from 'react-async-await'
import AnotherComponent from './AnotherComponent'

export default class App extends Component {
  render() {
    return (
      <AsyncAwaitProvider baseUrl="https://jsonplaceholder.typicode.com">
        <AnotherComponent />
      </AsyncAwaitProvider>
    )
  }
}
