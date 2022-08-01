import { Avatar } from '../../components/Avatar/Avatar';

export const ProjectSummary = ({ project }) => {
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">Project due by {project.dueDate}</p>
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
    </div>
  );
};
