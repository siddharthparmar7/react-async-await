import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'

export const AsyncAwaitContext = createContext()

export default class AsyncAwaitProvider extends Component {
  static propTypes = {
    baseUrl: PropTypes.string,
    headerOptions: PropTypes.object,
    children: PropTypes.node
  }

  constructor(props) {
    super(props)
    this.state = {
      baseUrl: null,
      headerOptions: {}
    }
  }

  componentDidMount() {
    const { baseUrl, headerOptions } = this.props
    baseUrl && this.setState({ baseUrl })
    headerOptions !== undefined && this.setState({ headerOptions })
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
