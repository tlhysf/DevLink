import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
	onDeleteClick(commentId) {
		this.props.deleteComment(this.props.postId, commentId);
	}

	render() {
		const { comment, auth } = this.props;
		return (
			<div className='card card-body mb-3'>
				<div className='row'>
					<div className='col-md-2'>
						<Link to={`/profile/user/${comment.user}`}>
							<img
								className='rounded-circle d-none d-md-block'
								src={comment.avatar}
								alt={comment.name}
							/>
						</Link>
						<br />
						<p className='text-center'>{comment.name}</p>
					</div>
					<div className='col-md-10'>
						<p className='lead'>{comment.text}</p>
						{auth.user.id === comment.user ? (
							<button
								type='button'
								className='btn btn-danger mr-1'
								onClick={this.onDeleteClick.bind(
									this,
									comment._id
								)}>
								<i className='fas fa-times' />
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
