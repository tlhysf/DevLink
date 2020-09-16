import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class ProfileCreds extends Component {
	render() {
		const { experience, education } = this.props.profile;

		const expItems = experience.map((exp) => (
			<li key={exp._id} className='list-group-item'>
				<h4>{exp.company}</h4>
				<p className='text-muted'>
					{exp.company === null ? null : <span>{exp.location}</span>}
				</p>
				<p>
					<Moment format='MM/DD/YYYY'>{exp.from}</Moment>
					{' - '}
					{exp.current === true ? (
						'Present'
					) : (
						<Moment format='MM/DD/YYYY'>{exp.to}</Moment>
					)}
				</p>
				<p>
					<div>
						<strong>{'Position'}</strong>
						<p>{exp.title}</p>
					</div>
				</p>
				<div>
					{isEmpty(exp.description) ? null : (
						<div>
							<strong>{'Description'}</strong>
							<p>{exp.description}</p>
						</div>
					)}
				</div>
			</li>
		));

		const eduItems = education.map((edu) => (
			<li key={edu._id} className='list-group-item'>
				<h4>{edu.degree}</h4>
				<p>
					{edu.fieldOfStudy === null ? null : (
						<span>{edu.fieldOfStudy}</span>
					)}
				</p>
				<p>
					<Moment format='MM/DD/YYYY'>{edu.from}</Moment>
					{' - '}
					{edu.current === true ? (
						'Present'
					) : (
						<Moment format='MM/DD/YYYY'>{edu.to}</Moment>
					)}
				</p>
				<p>
					<div>
						<strong>{'From'}</strong>
						<p>{edu.school}</p>
					</div>
				</p>
				<div>
					{isEmpty(edu.description) ? null : (
						<div>
							<strong>{'Description'}</strong>
							<p>{edu.description}</p>
						</div>
					)}
				</div>
			</li>
		));

		return (
			<div class='row'>
				<div class='col-md-6'>
					<h3 class='text-center text-info'>Experience</h3>
					<ul class='list-group'>{expItems}</ul>
				</div>
				<div class='col-md-6'>
					<h3 class='text-center text-info'>Education</h3>
					<ul class='list-group'>
						<ul class='list-group'>{eduItems}</ul>
					</ul>
				</div>
			</div>
		);
	}
}

export default ProfileCreds;
