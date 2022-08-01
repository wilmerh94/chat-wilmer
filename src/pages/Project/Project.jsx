import { useDocument } from '../../Hooks/useDocument';
// Style
import './Project.css';
import { ProjectComments } from './ProjectComments';
import { ProjectSummary } from './ProjectSummary';
export const Project = () => {
  const { document, error } = useDocument('projects');
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>

    // {document.TimeStamp.toDate().toDateString()}
  );
};
