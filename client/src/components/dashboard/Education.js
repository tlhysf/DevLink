import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {deleteEdu} from "../../actions/profileActions";

class Education extends Component {

    onDeleteClick(id){
        this.props.deleteEdu(id);
    }

	render() {
		const education = this.props.education.map((item) => (
			<tr key={item._id}>
				<td>{item.school}</td>
				<td>{item.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{item.from}</Moment>
                    {" - "}
                    {item.to !== null ? <Moment format="YYYY/MM/DD">{item.to}</Moment> : "Present"}
				</td>
				<td>
                    <button
                        onClick={this.onDeleteClick.bind(this, item._id)} 
                        className="btn btn-danger">
                        Delete
                    </button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-4 text-muted">Education</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th></th>
						</tr>
					</thead>
					{education}
				</table>
			</div>
		);
	}
}

Education.propTypes = {
    deleteEdu: PropTypes.func.isRequired
};

export default connect(null, {deleteEdu})(Education);
