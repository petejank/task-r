'use strict';

import './assets/race-box.scss';
import './assets/race-loader.scss';

import React from 'react';
import {connect} from 'react-redux';
import store from 'store/store';

import RaceBoxHeader from './RaceBoxHeader';
import RaceBoxInfo from './RaceBoxInfo';
import RaceBoxEntries from './RaceBoxEntries';
import RaceFilters from 'components/RaceFilters/RaceFilters';

import * as constants from './Constants.js';
import $ from 'jquery';
import R from 'ramda';

const stateToProps = (store) => ({
  filterState: store.filterState
});

const RaceBox = React.createClass({
  getInitialState() {
    return {
      dataFetched: false,
      race: null
    };
  },
  componentDidMount() {
    let races, rates;
    $.when($.getJSON(constants.RACES_URL), $.getJSON(constants.RATES_URL)).then((racesResult, ratesResult) => {
      races = racesResult[0].data.races;
      rates = ratesResult[0];

      // Set initial values
      this.setState({
        dataFetched: true,
        race: getHighestPurseRace(races, this.props.filterState, rates)
      });

      // On change re-pick race
      store.subscribe(() => {
        this.setState({
          race: getHighestPurseRace(races, store.getState().filterState, rates)
        });
      });
    });
  },
  render() {
    return (
      this.state.dataFetched ?
        <section>
          <RaceFilters/>
          {
            this.state.race &&
            <section className="race-box">
              <RaceBoxHeader
                country={this.state.race.event.country}
                title={this.state.race.event.title}
                time={this.state.race.post_time}/>
              <RaceBoxInfo
                runners={this.state.race.num_runners}
                distance={this.state.race.distance}
                amount={this.state.race.purse.amount}
                currency={this.state.race.purse.currency}
                raceType={this.state.race.race_type}/>
              <RaceBoxEntries
                idRace={this.state.race.id_race}
                runners={this.state.race.runners}/>
            </section>
          }
        </section>
      : <div className="race-loader">
          <div className="race-loader__animation"></div>
        </div>
    );
  }
});

export default connect(stateToProps)(RaceBox);

function getHighestPurseRace(races, filterState, rates) {
  const activeFilters = R.map(item => item.symbol, R.filter(R.propEq('active', true), filterState));
  const activeRaces = R.filter(
    race => activeFilters.indexOf(race.race_type) !== -1 && race.post_time > constants.BASE_TIME, races
  );

  if (activeRaces.length) {
    return R.last(R.sort((race, nextRace) => getAmount(race, rates) - getAmount(nextRace, rates), activeRaces));
  } else {
    return null;
  }
}

function getAmount(race, rates) {
  return race.purse.currency === 'EUR' ? race.purse.amount * rates['EUR'] : race.purse.amount;
}
