import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Router,hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {setState} from './action_creators';

//import Voting from './components/Voting';
import {VotingContainer} from './components/Voting';
import App from './components/App';
//import Results from './components/Results';
import {ResultsContainer} from './components/Results';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';

require('./css/style.css');

//const pair = ['Trainspotting', '28DaysLater'];

//const store = createStore(reducer);



/*store.dispatch({
	type: 'SET_STATE',
	state: {
		vote: {
			pair: ['Sunshine', '28DaysLater'],
			tally: {Sunshine: 2}
		}
	}
});*/

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => 
	//store.dispatch({type: 'SET_STATE', state})
	store.dispatch(setState(state))
	);

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
	)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <Route component={App}>
	<Route path="/" component={VotingContainer} />
	<Route path="/results" component={ResultsContainer} />
</Route>;

/*ReactDOM.render(
	<Voting pair={pair} />,
	document.getElementById('app')
	);*/

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
	)