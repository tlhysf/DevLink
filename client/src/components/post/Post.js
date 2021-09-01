import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showActions: false,
		};
	}

	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	onUnhideClick = () => {
		this.setState({ showActions: !this.state.showActions });
	};

	render() {
		const { post, loading } = this.props.post;

		let postContent;

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem
						post={post}
						showActions={this.state.showActions}
						onFeed={false}
					/>
					<CommentForm postId={post._id} />
					<CommentList comments={post.comments} postId={post._id} />
				</div>
			);
		}
		return (
			<div className='post'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<Link className='btn btn-light mb-3' to='/feed'>
								Back
							</Link>
							<button
								className='btn btn-light mb-3 float-right'
								onClick={this.onUnhideClick}>
								<i className='fas fa-low-vision'></i>
							</button>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
