import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import './index.css';

import Album from './Album';
import NotFound from './NotFound';
import Header from './Header';


const sections = [
  { title: 'Home', url: '#' },
  { title: 'Projects', url: '/projects' },
  { title: 'Exploration', url: '#' },
  { title: 'Analysis', url: '#' },
  { title: 'Repository', url: '#' },
];

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Container className='top-container'>
            <Header className='header' sections={sections} />
            <Container style={{ padding: '0 50px' }}>
              <div className='site-content'>
                <Switch>
                  <Route exact path='/'>
                    <Album />
                  </Route>
                  <Route path='/projects'>
                    <Album />
                  </Route>
                  <Route path='*'>
                    <NotFound />
                  </Route>
                </Switch>
              </div>
            </Container>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
