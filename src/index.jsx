import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Button variant='contained' color='primary'>
          Hello World
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
