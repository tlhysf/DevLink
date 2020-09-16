import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
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

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			// change skills from array to CSV string to display in edit-profile form
			const skillsCSV = profile.skills.join(',');

			// if profile field is empty, replace it with an empty string
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location)
				? profile.location
				: '';
			profile.github = !isEmpty(profile.github) ? profile.github : '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.linkedIn = !isEmpty(profile.social.linkedIn)
				? profile.social.linkedIn
				: '';
			profile.stackOverFlow = !isEmpty(profile.social.stackOverFlow)
				? profile.social.stackOverFlow
				: '';

			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCSV,
				github: profile.github,
				bio: profile.bio,
				linkedIn: profile.linkedIn,
				stackOverFlow: profile.stackOverFlow,
			});
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
							<Link
								to='/dashboard'
								className='btn btn-light'
								style={{ marginBottom: '15px' }}>
								Back
							</Link>
							<h2 className='display-4 text-center'>
								Edit Profile
							</h2>

							{/*
							<br></br>
							<h6 className='text-center mb-4'>
								Upload New Avatar
							</h6>
							<UploadAvatar />
							<br></br>
							*/}

							<small className='d-block pd-3'>
								*required fields
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name='handle'
									placeholder='*Profile Handle'
									value={this.state.handle}
									errors={errors.handle}
									info='Choose a unique handle for your profile URL!'
									onChange={this.onChange}
								/>

								<SelectListGroup
									name='status'
									placeholder='*status'
									value={this.state.status}
									errors={errors.status}
									options={options}
									info='Where you are at in your career?'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='company'
									placeholder='Company'
									value={this.state.company}
									errors={errors.company}
									info='Your employer or your own company!'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='website'
									placeholder='Website'
									value={this.state.website}
									errors={errors.website}
									info='Your professional Portfolio!'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='location'
									placeholder='Location'
									value={this.state.location}
									errors={errors.location}
									info='City/State/Country'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='skills'
									placeholder='*Skills'
									value={this.state.skills}
									errors={errors.skills}
									info='Use comma separated values!'
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name='github'
									placeholder='Github username'
									value={this.state.github}
									errors={errors.github}
									info='Share your latest repos!'
									onChange={this.onChange}
								/>

								<TextAreaFieldGroup
									name='bio'
									placeholder='Bio'
									value={this.state.bio}
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

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
);
