import React from 'react';

const Post = props => {
  return (
    <div className="col-md-8 col-md-offset-2 m-2">
      <div className="card">
        <div className="card-header">Author</div>
        <div className="card-body">
          <h3>{props.post.title}</h3>
          <p>{props.post.content}</p>
          <button
            onClick={props.onEditClick}
            className="btn btn-primary text-white m-1"
          >
            Edit
          </button>
          <button
            onClick={props.onDeleteClick}
            className="btn btn-danger text-white m-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
