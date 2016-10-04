import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Activities } from '../api/activities.js';

export default class Repository extends Component {
  renderActivities() {
    return (
      this.props.activities ?
      this.props.activities.map((activity) => (
        <Activity
          key = {activity._id}
          id = {activity._id}
          type = {activity.type}
          name = {activity.name}
          plane = {activity.plane}
          object = {activity.object}
        />
      )) : <li>No activity</li>
    );
  }

  render() {
    return(
      <div >
        <h1>Activities</h1>
        <ul>
          {this.renderActivities()}
        </ul>
      </div>
    );
  }
}


Repository.propTypes = {
  activities: PropTypes.array.isRequired,
};

class Activity extends Component{

  render() {
    return (
      <div className = "activity-short">
        <li>
          <p>
          <b>{this.props.type}: </b>
          Plane {this.props.plane} - {this.props.name}
          </p>
        </li>
      </div>

    );
  }
}

export default createContainer(() => {
  return {
    activities: Activities.find({}).fetch(),
  };
}, Repository);
