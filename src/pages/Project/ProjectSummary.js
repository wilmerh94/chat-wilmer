import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../components/Avatar/Avatar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useFireStore } from '../../Hooks/useFireStore';

export const ProjectSummary = ({ project }) => {
  const { deleteDocument, response } = useFireStore('projects');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = e => {
    deleteDocument(project.id);
    if (!response.error) {
      navigate('/');
    }
  };
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsers.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};
