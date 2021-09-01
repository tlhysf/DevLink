import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import {
	deletePost,
	addLikeFromFeed,
	removeLikeFromFeed,
	addLikeFromPost,
	removeLikeFromPost,
} from '../../actions/postActions';

class PostItem extends Component {
	onDeleteClick(id) {
		this.props.deletePost(id);
		if (!this.props.onFeed) {
			this.props.history.push('/feed');
		}
	}

	onUnlikeClick(id) {
		if (this.props.onFeed) {
			this.props.removeLikeFromFeed(id);
		} else {
			this.props.removeLikeFromPost(id);
		}
	}

	onLikeClick(id) {
		if (this.props.onFeed) {
			this.props.addLikeFromFeed(id);
		} else {
			this.props.addLikeFromPost(id);
		}
	}

	findUserLike(likes) {
		const { auth } = this.props;

		if (likes.filter((like) => like.user === auth.user.id).length > 0) {
			return true;
		} else return false;
	}

	render() {
		const { post, auth, showActions } = this.props;
		return (
			<div className='card card-body mb-3'>
				<div className='row'>
					<div className='col-md-2'>
						<Link to={`/profile/user/${auth.user.id}`}>
							<img
								className='rounded-circle d-none d-md-block'
								src={post.avatar}
								alt={post.name}
							/>
						</Link>
						<br />
						<p className='text-center'>{post.name}</p>
					</div>
					<div className='col-md-10'>
						<p className='lead'>{post.text}</p>
					</div>
				</div>
				<div style={{ margin: 'auto' }}>
					{showActions ? (
						<span>
							<button
								type='button'
								className='btn btn-light mr-1'
								onClick={this.onLikeClick.bind(this, post._id)}>
								<i
									className={classnames('fas fa-thumbs-up', {
										'text-info': this.findUserLike(
											post.likes
										),
									})}
								/>
								<span className='badge badge-light'>
									{post.likes.length}
								</span>
							</button>
							<button
								type='button'
								className='btn btn-light mr-1'
								onClick={this.onUnlikeClick.bind(
									this,
									post._id
								)}>
								<i className='text-secondary fas fa-thumbs-down'></i>
							</button>
							<Link
								to={`/posts/${post._id}`}
								className='btn btn-info mr-1'>
								Comment
							</Link>
							{post.user === auth.user.id ? (
								<button
									type='button'
									className='btn btn-danger mr-1'
									onClick={this.onDeleteClick.bind(
										this,
										post._id
									)}>
									<i className='fas fa-times' />
								</button>
							) : null}
						</span>
					) : null}
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	deletePost,
	addLikeFromFeed,
	removeLikeFromFeed,
	addLikeFromPost,
	removeLikeFromPost,
})(withRouter(PostItem));
