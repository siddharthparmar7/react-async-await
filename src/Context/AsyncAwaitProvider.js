import React, { Component, createContext, Fragment } from 'react'
import PropTypes from 'prop-types'

export const AsyncAwaitContext = createContext()

export default class AsyncAwaitProvider extends Component {
  static propTypes = {
    baseUrl: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      baseUrl: null
    }
  }

  componentDidMount() {
    const { baseUrl } = this.props
    baseUrl && this.setState({ baseUrl })
  }

  changeBaseUrl(newUrl) {
    this.setState({ baseUrl: newUrl })
  }

  render() {
    return (
      <AsyncAwaitContext.Provider
        value={{
          ...this.state,
          changeBaseUrl: this.changeBaseUrl
        }}
      >
        {this.props.children}
      </AsyncAwaitContext.Provider>
    )
  }
}
