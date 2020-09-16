import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileActions";

class AddEdu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: "",
			degree: "",
			fieldOfStudy: "",
			description: "",
			from: "",
			to: "",
			current: false,
			disabled: false,
			errors: {},
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onCheck() {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newEducation = {
			school: this.state.school,
			degree: this.state.degree,
			fieldOfStudy: this.state.fieldOfStudy,
			description: this.state.description,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
		};

		this.props.addEducation(newEducation, this.props.history);
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="edit-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link
								to="/dashboard"
								className="btn btn-light"
								style={{ marginBottom: "15px" }}>
								Go Back
							</Link>
							<h2 className="display-4 text-center" style={{ marginBottom: "15px" }} >Add Education</h2>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name="school"
									placeholder="School"
									value={this.state.school}
									errors={errors.school}
									info="School/Institution/University"
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name="degree"
									placeholder="Degree"
									value={this.state.degree}
									errors={errors.degree}
									info="Degree or diploma title/Level of education"
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name="fieldOfStudy"
									placeholder="Field of Study"
									value={this.state.fieldOfStudy}
									errors={errors.fieldOfStudy}
									info="E.g. computer science, engineering etc."
									onChange={this.onChange}
								/>

								<h6 className="text-muted"> From Date:</h6>
								<TextFieldGroup
									name="from"
									type="date"
									value={this.state.from}
									errors={errors.from}
									onChange={this.onChange}
								/>

								<h6 className="text-muted">To Date:</h6>
								<TextFieldGroup
									name="to"
									type="date"
									value={this.state.to}
									errors={errors.to}
									onChange={this.onChange}
									disabled={this.state.disabled ? "disabled" : ""}
								/>

								<div className="form-check mb-4">
									<input
										name="current"
										type="checkbox"
										className="form-check-input"
										value={this.state.current}
										checked={this.state.current}
										id="current"
										onChange={this.onCheck}
									/>
									<label htmlFor="current" className="form-check-label">
										Current
									</label>
								</div>

								<TextAreaFieldGroup
									name="description"
									placeholder="Description"
									value={this.state.description}
									errors={errors.description}
									info="Courses, projects and achievements etc."
									onChange={this.onChange}
								/>

								<input
									type="submit"
									value="Save"
									className="btn btn-info btn-block mt-4"></input>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEdu.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEdu));
