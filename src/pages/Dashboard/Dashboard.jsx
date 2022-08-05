import { ProjectList } from '../../components/ProjectList/ProjectList';
import { useFetching } from '../../Hooks/useCollection';
import { ProjectFilter } from './ProjectFilter';
import { useState } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
// Style
import './Dashboard.css';

export const Dashboard = () => {
  const { user } = useAuthContext();
  const { listings, error, isLoading } = useFetching('projects');
  const [currentFilter, setCurrentFilter] = useState('all');

  const changeFilter = newFilter => {
    setCurrentFilter(newFilter);
  };

  const projectsFilter = listings
    ? listings.filter(listing => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            listing.assignedUsers.forEach(u => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            console.log(listing.category, currentFilter);
            return listing.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {isLoading && <p>Loading....</p>}
      {error && <p className="error">{error}</p>}
      {listings && (
        <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      )}
      {listings && <ProjectList projects={projectsFilter} />}
    </div>
  );
};
