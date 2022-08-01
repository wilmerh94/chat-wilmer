// Style
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { useFetching } from '../../Hooks/useCollection';
import './Dashboard.css';

export const Dashboard = () => {
  const { listings, error } = useFetching('projects');
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {listings && <ProjectList projects={listings} />}
    </div>
  );
};
