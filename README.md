# async-react

> A React component library to help with async await. Can be used with ReactNative too!

[![NPM](https://img.shields.io/npm/v/react-async-await.svg)](https://www.npmjs.com/package/react-async-await) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save async-react
```

## Usage

**With Single Url**

```jsx
import React, { Component } from 'react';
import MyComponent from './MyComponent';
import { AsyncAwait } from 'async-react';

class Example extends Component {
  render() {
    return (
      <AsyncAwait url="https://jsonplaceholder.typicode.com/posts">
        {({ loading, error, data }) => {
          if (error) return <h2>{error}</h2>;
          if (loading) return <h2>Loading...</h2>;
          if (data) return <MyComponent data={data} />;
        }}
      </AsyncAwait>
    );
  }
}
```

**With Multiple Urls**

```jsx
<AsyncAwait
  url={[
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/users'
  ]}
>
  {({ loading, error, data }) => {
    if (error) return <h2>{error}</h2>;
    if (loading) return <h2>Loading...</h2>;
    if (data) return <MyComponent posts={data[0]} users={data[1]} />;
  }}
</AsyncAwait>
```

**With BaseUrl**

```jsx
// App.js
import React, { Component } from 'react';
import AsyncAwaitProvider from 'async-react';
import AnotherComponent from './AnotherComponent';

export default class App extends Component {
  render() {
    return (
      <AsyncAwaitProvider baseUrl="https://jsonplaceholder.typicode.com">
        <AnotherComponent />
      </AsyncAwaitProvider>
    );
  }
}

// AnotherComponent.js
import React, { Component } from 'react';
import MyComponent from './MyComponent';
import { AsyncAwait } from 'async-react';

class AnotherComponent extends Component {
  render() {
    return (
      <AsyncAwait path={['/posts', '/users']}>
        {({ loading, error, data }) => {
          if (error) return <h2>{error}</h2>;
          if (loading) return <h2>Loading...</h2>;
          if (data) return <MyComponent posts={data[0]} users={data[1]} />;
        }}
      </AsyncAwait>
    );
  }
}
```

You can also do path="/posts" or path={["/posts"]}

## License

MIT © [siddharthparmar7](https://github.com/siddharthparmar7)
