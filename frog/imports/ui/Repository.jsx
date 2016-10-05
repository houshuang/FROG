import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Activities } from '../api/activities.js';

export default class Repository extends Component {

  constructor(props) {
		super(props);

		this.state = {

      plane: [],
      type: [],

    }
	}


  toggleFilterPlane(planeNumber) {

    let index = this.state.plane.indexOf(planeNumber);
    let newPlane = this.state.plane;

    if(index != -1) {
      newPlane = newPlane.filter(num => num != planeNumber);
    } else {
      newPlane.push(planeNumber);
    }

    this.setState({
      plane: newPlane,
    });
  }

  toggleFilterType(value) {

    let index = this.state.type.indexOf(value);
    let newType = this.state.type;

    if(index != -1) {
      newType = newType.filter(val => val != value);
    } else {
      newType.push(value);
    }

    this.setState({
      type: newType,
    });
  }

  renderActivities() {
    let filteredActivities = this.props.activities;


    this.state.plane.map((number) => (
      filteredActivities = filteredActivities.filter(activity =>
        activity.plane != number)
    ));

    this.state.type.map((value) => (
      filteredActivities = filteredActivities.filter(activity =>
        activity.type != value)
    ));

    return (
      filteredActivities ?
      filteredActivities.map((activity) => (
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
        <label className="filter-plane">
            Show only plane(s):
            <div className="plane-checkbox">
  						<input
  							type="checkbox"
  							readOnly
  							checked={this.state.plane.indexOf(1) == -1}
  							onClick={this.toggleFilterPlane.bind(this, 1)}
  						/>1<br/>

              <input
  							type="checkbox"
  							readOnly
                checked={this.state.plane.indexOf(2) == -1}
                onClick={this.toggleFilterPlane.bind(this, 2)}
  						/>2<br />

              <input
  							type="checkbox"
  							readOnly
                checked={this.state.plane.indexOf(3) == -1}
                onClick={this.toggleFilterPlane.bind(this, 3)}
  						/>3<br/>
            </div>

            Show only the following type(s) of lectures:
            <div className="type-checkbox">
  						<input
  							type="checkbox"
  							readOnly
  							checked={this.state.type.indexOf("lecture") == -1}
  							onClick={this.toggleFilterType.bind(this, "lecture")}
  						/>Lecture<br/>

              <input
  							type="checkbox"
  							readOnly
                checked={this.state.type.indexOf("quizz") == -1}
                onClick={this.toggleFilterType.bind(this, "quizz")}
  						/>Quizz<br />

              <input
  							type="checkbox"
  							readOnly
                checked={this.state.type.indexOf("video") == -1}
                onClick={this.toggleFilterType.bind(this, "video")}
  						/>Video<br/>
            </div>
        </label>
        <ul>
          {this.renderActivities()}
        </ul>
      </div>
    );
  }
}


Repository.propTypes = {
  activities: PropTypes.array.isRequired,
  //planes: PropTypes.array.isRequired,
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
