import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	onFormSubmit(event) {
		event.preventDefault();

		const { user } = this.props.auth;
		const { postId } = this.props;

		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};

		this.props.addComment(newComment, postId);
		this.setState({ text: '' });
	}

	render() {
		const errors = this.state.errors;
		return (
			<div className='post-form mb-3'>
				<div className='card card-info'>
					<div className='card-body'>
						<form onSubmit={this.onFormSubmit}>
							<div className='form-group'>
								<TextAreaFieldGroup
									name='text'
									placeholder='Add a comment...'
									value={this.state.text}
									onChange={this.onChange}
									errors={errors.text}></TextAreaFieldGroup>
							</div>
							<button type='submit' className='btn btn-dark'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
