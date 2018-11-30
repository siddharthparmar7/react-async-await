import React, { Component, Fragment } from 'react'
import { AsyncAwaitContext } from '../Context/AsyncAwaitProvider'
import PropTypes from 'prop-types'

class AsyncAwait extends Component {
  static propTypes = {
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    baseUrl: PropTypes.string,
    headerOptions: PropTypes.object,
    children: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      baseUrl: null,
      loading: false,
      error: null,
      data: null,
      headerOptions: {}
    }
  }

  componentDidMount() {
    const { path, headerOptions, baseUrl } = this.props
    baseUrl !== null && this.setState({ baseUrl })
    if (this.state.baseUrl === null && path) {
      path && typeof path === 'object' && path.length > 1
        ? this.getData(path, headerOptions)
        : this.getData([path], headerOptions)
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (
      this.props.baseUrl !== null &&
      this.props.baseUrl !== prevState.baseUrl
    ) {
      this.setState({
        baseUrl: this.props.baseUrl,
        headerOptions: this.props.headerOptions
      })
      const { path, headerOptions } = this.props
      const { baseUrl } = this.state
      baseUrl !== null && path && typeof path === 'object' && path.length > 1
        ? this.getData(path.map(p => baseUrl + p), headerOptions)
        : this.getData([baseUrl + path], headerOptions)
    }
  }

  getPromise = (path, headerOptions) => {
    if (path) {
      return fetch(path, headerOptions)
        .then(res => {
          if (res.status === 404 || res.ok === false)
            throw new Error(res.status + ' ' + res.statusText)
          else return res.json()
        })
        .catch(error => {
          throw new Error(error)
        })
    } else {
      throw ('Error:', new Error())
    }
  }

  async getData(paths, headerOptions) {
    const allPromises = []
    if (this.state.baseUrl !== null) {
      this.setState({ loading: true })
      try {
        paths.map(path =>
          allPromises.push(this.getPromise(path, headerOptions))
        )
        const data = await Promise.all(allPromises)
        this.setState({ loading: false, data, error: null })
      } catch (error) {
        this.setState({ error })
      }
    }
  }

  render() {
    const { loading, error, data } = this.state
    return <Fragment>{this.props.children({ loading, error, data })}</Fragment>
  }
}

export default props => (
  <AsyncAwaitContext.Consumer>
    {values => {
      const baseUrl = values ? values.baseUrl : ''
      const headerOptions = values
        ? { ...values.headerOptions, ...props.headerOptions }
        : props.headerOptions
      return (
        <AsyncAwait
          {...props}
          baseUrl={baseUrl}
          headerOptions={headerOptions}
        />
      )
    }}
  </AsyncAwaitContext.Consumer>
)
