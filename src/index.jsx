import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import './index.css';

import Album from './Album';
import Header from './Header';
import HomePage from './HomePage';
import NotFound from './NotFound';


const sections = [
  { title: 'Home', url: '/#' },
  { title: 'Projects', url: '/projects' },
  { title: 'Exploration', url: '/exploration' },
  { title: 'Analysis', url: '/analysis' },
  { title: 'Repository', url: '/repository' },
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
                    <HomePage />
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
