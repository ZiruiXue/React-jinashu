import React, { Component } from 'react';
import Headers from './common/header';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import Home from './pages/home';
import Detail from './pages/detail';
import store from './store';

// exact 只有路径完全相等时，才会显示
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Headers />
          <BrowserRouter>
            <div>
              {/* 根路径，渲染home */}
              <Route path='/' exact component={Home}></Route>
              <Route path='/detail' exact component={Detail}></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;


