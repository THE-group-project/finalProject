import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { removeExperience } from '../../actions/profile';

class ShowExperience extends Component {
  onDeleteClick = id => {
    this.props.removeExperience(id);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="MM/YYYY">{exp.from}</Moment> - {''}
          {exp.to === null ? (
            ' Current'
          ) : (
            <Moment format="MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-sm btn-danger active"
          >
            Remove Experience
          </button>
        </td>
      </tr>
    ));

    return (
      null
      // <div>
      //   <h3 className="mb-4">Experience</h3>
      //   <table className="table">
      //     <thead>
      //       <tr>
      //         <th>Company</th>
      //         <th>Title</th>
      //         <th>Years</th>
      //         <th />
      //       </tr>
      //       {experience}
      //     </thead>
      //   </table>
      // </div>
    );
  }
}

ShowExperience.propTypes = {
  removeExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeExperience }
)(ShowExperience);
