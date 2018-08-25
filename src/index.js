import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class AsyncAwait extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      data: null
    }
  }

  componentDidMount() {
    const { url } = this.props
    url && this.getData(url)
  }

  getPromise = url => {
    if (url) {
      return fetch(url)
        .then(res => {
          if (res.status === 404) throw 'Error: ' + res.status
          else return res.json()
        })
        .catch(error => {
          throw 'Error:' + error
        })
    } else {
      throw ('Error:', new Error())
    }
  }

  getData(url) {
    this.setState({ loading: true })
    this.getPromise(url)
      .then(res => {
        this.setState({ data: res, error: null })
      })
      .then(() => this.setState({ loading: false }))
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { loading, error, data } = this.state
    return <Fragment>{this.props.children({ loading, error, data })}</Fragment>
  }
}
