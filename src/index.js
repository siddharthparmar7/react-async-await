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
    this.props.url && this.getData(this.props.url)
  }

  getPromise = url => {
    return new Promise((resolve, reject) => {
      if (url) {
        fetch(url)
          .then(res => {
            if (res.status === 404) reject('Error: ' + res.status)
            else resolve(res.json())
          })
          .catch(error => reject('Error:' + error))
      } else {
        reject('Error:', new Error())
      }
    })
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
