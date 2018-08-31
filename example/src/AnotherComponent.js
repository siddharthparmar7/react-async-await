import React, { Component } from 'react';
import { AsyncAwait } from 'async-react';

class AnotherComponent extends Component {
  render() {
    return (
      <AsyncAwait path={['/posts', '/users']}>
        {({ loading, error, data }) => {
          if (error) return <h2>{error}</h2>;
          if (loading) return <h2>Loading...</h2>;
          if (data) console.log(data[0], data[1]);
        }}
      </AsyncAwait>
    );
  }
}

export default AnotherComponent;
