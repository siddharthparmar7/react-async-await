import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class AsyncAwait extends Component {
  static propTypes = {
    url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
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
    url && typeof url === 'object' && url.length > 1
      ? this.getData(url)
      : this.getData([url])
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

  async getData(urls) {
    let allPromises = []
    this.setState({ loading: true })
    try {
      urls.map(url => allPromises.push(this.getPromise(url)))
      const data = await Promise.all(allPromises)
      this.setState({ loading: false, data, error: null })
    } catch (error) {
      this.setState({ error })
    }
  }

  render() {
    const { loading, error, data } = this.state
    return <Fragment>{this.props.children({ loading, error, data })}</Fragment>
  }
}
