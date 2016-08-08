import React from 'react';
import {List, Map} from 'immutable';

/*const pair = List.of('Trainspotting', '28DaysLater');
const tally = Map({'Trainspotting': 5, '28DaysLater': 4});

export default React.createClass({
	render: function() {
		return React.cloneElement(this.props.children, 
			{
				pair: pair,
				tally: tally
			}
			);
	}
});*/


/*export default React.createClass({
	render: function() {
		return React.cloneElement(this.props.children);
	}
});*/

export default React.createClass({
	render: function() {
		return this.props.children;
	}
});