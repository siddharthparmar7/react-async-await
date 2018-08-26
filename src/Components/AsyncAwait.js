import React, { Component, Fragment } from 'react'
import { AsyncAwaitContext } from '../Context/AsyncAwaitProvider'
import PropTypes from 'prop-types'

class AsyncAwait extends Component {
  static propTypes = {
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    baseUrl: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      baseUrl: null,
      loading: false,
      error: null,
      data: null
    }
  }

  componentDidMount() {
    const { path } = this.props
    if (this.state.baseUrl === null && path) {
      path && typeof path === 'object' && path.length > 1
        ? this.getData(path)
        : this.getData([path])
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (
      this.props.baseUrl !== null &&
      this.props.baseUrl !== prevState.baseUrl
    ) {
      this.setState({ baseUrl: this.props.baseUrl })
      const { path } = this.props
      const { baseUrl } = this.state
      baseUrl !== null && path && typeof path === 'object' && path.length > 1
        ? this.getData(path.map(p => baseUrl + p))
        : this.getData([baseUrl + path])
    }
  }

  getPromise = path => {
    if (path) {
      return fetch(path)
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

  async getData(paths) {
    let allPromises = []
    this.setState({ loading: true })
    try {
      paths.map(path => allPromises.push(this.getPromise(path)))
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

export default props => (
  <AsyncAwaitContext.Consumer>
    {({ baseUrl }) => {
      return <AsyncAwait {...props} baseUrl={baseUrl} />
    }}
  </AsyncAwaitContext.Consumer>
)
