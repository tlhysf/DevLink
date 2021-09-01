import React, { Component } from 'react';

export default class NotFound extends Component {
	goBack = () => {
		this.props.history.go(-2);
	};
	render() {
		return (
			<div>
				<button
					className='btn btn-light mb-3 float-left'
					onClick={this.goBack}>
					Back
				</button>
				<p className='display-4 text-center'>Page Not Found</p>
			</div>
		);
	}
}
