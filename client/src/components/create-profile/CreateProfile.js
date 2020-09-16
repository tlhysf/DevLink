import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			github: '',
			bio: '',
			linkedIn: '',
			stackOverFlow: '',
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			github: this.state.github,
			bio: this.state.bio,
			linkedIn: this.state.linkedIn,
			stackOverFlow: this.state.stackOverFlow,
		};

		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder='LinkedIn Profile'
						name='linkedIn'
						icon='fab fa-linkedin'
						value={this.state.linkedIn}
						onChange={this.onChange}
						errors={errors.linkedIn}
					/>
					<InputGroup
						placeholder='StackOverFlow Profile'
						name='stackOverFlow'
						icon='fab fa-stack-overflow'
						value={this.state.stackOverFlow}
						onChange={this.onChange}
						errors={errors.stackOverFlow}
					/>
				</div>
			);
		}

		const options = [
			{ label: '*Select professional status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' },
		];

		return (
			<div className='edit-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h2 className='display-4 text-center'>
								Create Your Profile
							</h2>
							<p className='lead text-center'>
								Fill as many fields to make your profile stand
								out.
							</p>
							<small className='d-block pd-3'>
								*required fields
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name='handle'
									placeholder='*Profile Handle'
									value={this.state.value}
									errors={errors.handle}
									info='Choose a unique handle for your profile URL!'
									onChange={this.onChange}
								/>

								<SelectListGroup
									name='status'
									placeholder='*status'
									value={this.state.value}
									errors={errors.status}
									options={options}
									info='Where you are at in your career?'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='company'
									placeholder='Company'
									value={this.state.value}
									errors={errors.company}
									info='Your employer or your own company!'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='website'
									placeholder='Website'
									value={this.state.value}
									errors={errors.website}
									info='Your professional Portfolio!'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='location'
									placeholder='Location'
									value={this.state.value}
									errors={errors.location}
									info='City/State/Country'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='skills'
									placeholder='*Skills'
									value={this.state.value}
									errors={errors.skills}
									info='Use comma separated values!'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='github'
									placeholder='Github username'
									value={this.state.value}
									errors={errors.github}
									info='Share your latest repos!'
									onChange={this.onChange}
								/>

								<TextAreaFieldGroup
									name='bio'
									placeholder='Bio'
									value={this.state.value}
									errors={errors.bio}
									info='Describe yourself briefly.'
									onChange={this.onChange}
								/>

								<div className='mb-3'>
									<button
										type='button'
										onClick={() => {
											this.setState((prevState) => ({
												displaySocialInputs: !prevState.displaySocialInputs,
											}));
										}}
										className='btn btn-light'>
										Add social network links
									</button>
									<span className='text-muted m-3'>
										Optional
									</span>
								</div>

								{socialInputs}

								<input
									type='submit'
									value='Save Profile'
									className='btn btn-info btn-block mt-4'></input>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
	withRouter(CreateProfile)
);
