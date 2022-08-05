import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar/Avatar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useFireStore } from '../../Hooks/useFireStore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
export const ProjectComments = ({ project }) => {
  const params = useParams();
  const { updatedDocument, response } = useFireStore('projects');
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();
  const handleChange = e => {
    e.preventDefault();
    setNewComment(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random()
    };

    await updatedDocument(params.id, {
      comments: [...project.comments, commentToAdd]
    });
    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map(comment => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true
                  })}
                </p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea onChange={handleChange} id="comment" required></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};
