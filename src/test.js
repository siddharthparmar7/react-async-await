import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AsyncAwaitProvider, { AsyncAwait } from 'react-async-await'

configure({ adapter: new Adapter() })

const component = shallow(
  <AsyncAwaitProvider baseUrl='https://jsonplaceholder.typicode.com'>
    <AsyncAwait path='/posts'>
      {({ loading, error, data }) => {
        if (error) return <h2>{error}</h2>
        if (loading) return <h2>Loading...</h2>
        if (data) console.log(data)
      }}
    </AsyncAwait>
  </AsyncAwaitProvider>
)

describe('AsyncAwaitProvider Component', () => {
  it('matches the snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('prop passed matches the component state', () => {
    expect(component.state().baseUrl).toEqual(
      'https://jsonplaceholder.typicode.com'
    )
  })

  it('path prop passed matches the children prop', () => {
    expect(component.props().children.props.path).toEqual('/posts')
  })

  it('state changes, base url will be an empty string', () => {
    component.setState({ baseUrl: '' })
    expect(component.state().baseUrl).toEqual('')
  })
})
