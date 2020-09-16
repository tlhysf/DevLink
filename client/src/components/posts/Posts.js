import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {} from '../../actions/postActions';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.post;

		let postsContent;

		if (posts === null || loading) {
			postsContent = <Spinner></Spinner>;
		} else {
			postsContent = <PostFeed posts={posts} />;
		}

		return (
			<div>
				<div className='feed'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12'>
								<PostForm />
								<br></br>
								{postsContent}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
