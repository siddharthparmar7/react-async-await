# async-react

> A React component library to help with async data fetching. Can be used with ReactNative too!

> Now available with a new feature - `headerOptions`

[![NPM](https://img.shields.io/npm/v/async-react.svg)](https://www.npmjs.com/package/async-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save async-react
```

## Usage:

**With Single Url**

```jsx
import React, { Component } from 'react'
import MyComponent from './MyComponent'
import { AsyncAwait } from 'async-react'

class Example extends Component {
  render() {
    return (
      <AsyncAwait path="https://jsonplaceholder.typicode.com/posts">
        {({ loading, error, data }) => {
          if (error) return <h2>{error}</h2>
          if (loading) return <h2>Loading...</h2>
          if (data) return <MyComponent data={data} />
        }}
      </AsyncAwait>
    )
  }
}
```

**With Multiple Urls**

```jsx
<AsyncAwait
  path={[
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/users'
  ]}
>
  {({ loading, error, data }) => {
    if (error) return <h2>{error}</h2>
    if (loading) return <h2>Loading...</h2>
    if (data) return <MyComponent posts={data[0]} users={data[1]} />
  }}
</AsyncAwait>
```

**With BaseUrl**

```jsx
// App.js
import React, { Component } from 'react'
import AsyncAwaitProvider from 'async-react'
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

// AnotherComponent.js
import React, { Component } from 'react'
import MyComponent from './MyComponent'
import { AsyncAwait } from 'async-react'

class AnotherComponent extends Component {
  render() {
    return (
      <AsyncAwait path={['/posts', '/users']}>
        {({ loading, error, data }) => {
          if (error) return <h2>{error}</h2>
          if (loading) return <h2>Loading...</h2>
          if (data) return <MyComponent posts={data[0]} users={data[1]} />
        }}
      </AsyncAwait>
    )
  }
}
```

You can also do path="/posts" or path={["/posts"]}

## Advanced Use Cases:

**With BaseURL**

```jsx
//  App.js
export default class App extends Component {
  render() {
    return (
      <AsyncAwaitProvider
        baseUrl="https://xxx.xxx.xx/api"
        headerOptions={{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }}
      >
        <AnotherComponent />
      </AsyncAwaitProvider>
    )
  }
}

// AnotherComponent.js
class AnotherComponent extends Component {
  render() {
    const headerOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: 'a@a.com',
        password: 'password'
      })
    }
    return (
      <AsyncAwait path={'/auth/login'} headerOptions={headerOptions}>
        {({ loading, error, data }) => {
          if (error) return <h2>{error.message}</h2>
          if (loading) return <h2>Loading...</h2>
          if (data) <MyComponent data={data} />
        }}
      </AsyncAwait>
    )
  }
}
```

You can also do path={["/auth/login"]}

**without BaseURL**

just use the `path` prop (provide full URL) with `AsyncAwait` component

```jsx
class AnotherComponent extends Component {
  render() {
    const headerOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'a@a.com',
        password: 'password'
      })
    }
    return (
      <AsyncAwait
        path={'https://xxx.xxx.xx/api/auth/login'}
        headerOptions={headerOptions}
      >
        {({ loading, error, data }) => {
          if (error) return <h2>{error.message}</h2>
          if (loading) return <h2>Loading...</h2>
          if (data) <MyComponent data={data} />
        }}
      </AsyncAwait>
    )
  }
}
```

## Author:
[Sid Parmar](https://www.linkedin.com/in/siddharth-parmar-a901a075/)

## License

MIT
