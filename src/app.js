'use strict';

import 'assets/styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from 'store/store';
import PageContext from 'components/PageContext/PageContext';

ReactDOM.render((
  <Provider store={store}>
    <article>
      <PageContext/>
    </article>
  </Provider>
), document.getElementById('wrapper'));
