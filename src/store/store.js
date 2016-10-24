'use strict';

import {createStore, combineReducers} from 'redux';
import FilterReducer from './Filter/FilterReducer';

export default createStore(combineReducers({filterState: FilterReducer}));
