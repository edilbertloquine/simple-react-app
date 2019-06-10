import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../../actions/postsActions';

import Post from '../posts/Post';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  onEditClick = id => {
    this.props.history.push(`/posts/${id}/edit`);
  };

  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  render() {
    const { posts, loading } = this.props.posts;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts/create" className="btn btn-primary">
                Add Post
              </Link>
              <h1 className="display-4">Dashboard</h1>
              <div className="row">
                {posts === null || loading ? (
                  <h4>Loading</h4>
                ) : (
                  posts.map((post, index) => (
                    <Post
                      key={index}
                      post={post}
                      onEditClick={() => this.onEditClick(post._id)}
                      onDeleteClick={() => this.onDeleteClick(post._id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(withRouter(Dashboard));
