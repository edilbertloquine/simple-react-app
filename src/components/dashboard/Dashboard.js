import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../../actions/postsActions';

// import Post from '../posts/Post';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  onEditClick = id => {
    this.props.history.push(`/posts/${id}/edit`);
  };

  onDeleteClick = id => {
    console.log(id);
    // this.props.deletePost();
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
                    <div key={index} className="col-md-8 col-md-offset-2 m-2">
                      <div className="card">
                        <div className="card-header">Author</div>
                        <div className="card-body">
                          <h3>{post.title}</h3>
                          <p>{post.content}</p>
                          <button
                            onClick={() => this.onEditClick(post._id)}
                            className="btn btn-primary text-white m-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => this.onDeleteClick(post._id)}
                            className="btn btn-danger text-white m-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
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
