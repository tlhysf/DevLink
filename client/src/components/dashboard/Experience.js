import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {deleteExp} from "../../actions/profileActions";

class Experience extends Component {

    onDeleteClick(id){
        this.props.deleteExp(id);
    }

	render() {
		const experience = this.props.experience.map((exp) => (
			<tr key={exp._id}>
				<td>{exp.title}</td>
				<td>{exp.company}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment>
                    {" - "}
                    {exp.to !== null ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Present"}
				</td>
				<td>
                    <button
                        onClick={this.onDeleteClick.bind(this, exp._id)} 
                        className="btn btn-danger">
                        Delete
                    </button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-4 text-muted">Experiences</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Company</th>
							<th>Years</th>
							<th></th>
						</tr>
					</thead>
					{experience}
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
    deleteExp: PropTypes.func.isRequired
};

export default connect(null, {deleteExp})(Experience);
