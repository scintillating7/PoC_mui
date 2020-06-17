import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div className='error-placeholder__error-msg'>
        <h1>{'Oops! We can\'t seem to find the page you\'re looking for...'}</h1>
        <p>
        Either URL is not valid, or you do not have access.
        Please contact administrator for more information.
        </p>
      </div>
    );
  }
}

export default NotFound;
