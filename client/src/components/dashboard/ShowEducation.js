import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { removeEducation } from '../../actions/profile';

class ShowEducation extends Component {
  onDeleteClick = id => {
    this.props.removeEducation(id);
  };
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="MM/YYYY">{edu.from}</Moment> - {''}
          {edu.to === null ? (
            ' Current'
          ) : (
            <Moment format="MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-sm btn-danger active"
          >
            Remove Education
          </button>
        </td>
      </tr>
    ));

    return (
      null
      // <div>
      //   <h3 className="mb-4">Education</h3>
      //   <table className="table">
      //     <thead>
      //       <tr>
      //         <th>School</th>
      //         <th>Degree</th>
      //         <th>Years</th>
      //         <th />
      //       </tr>
      //       {education}
      //     </thead>
      //   </table>
      // </div>
    );
  }
}

ShowEducation.propTypes = {
  removeEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeEducation }
)(ShowEducation);
