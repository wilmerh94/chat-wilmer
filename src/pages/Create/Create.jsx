// Style
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useFetching } from '../../Hooks/useCollection';
import { useFireStore } from '../../Hooks/useFireStore';
import './Create.css';

const formDataDefault = {
  name: '',
  details: '',
  dueDate: '',
  category: '',
  assignedUsers: []
};

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
];
export const Create = () => {
  const { listings } = useFetching('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const [formData, setFormData] = useState(formDataDefault);
  const [formError, setFormError] = useState(null);
  const { name, details, dueDate, category, assignedUsers } = formData;
  const { createProject, response } = useFireStore('projects');

  useEffect(() => {
    if (listings) {
      const options = listings.map(user => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [listings]);

  const handleChange = e => {
    e.preventDefault();
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const selectChange = e => {
    if (typeof e.value === 'string') {
      setFormData(prevState => ({
        ...prevState,
        category: e.value
      }));
    }

    if (Array.isArray(e)) {
      setFormData(prevState => ({
        ...prevState,
        assignedUsers: e.map(u => {
          return {
            displayName: u.value.displayName,
            photoURL: u.value.imgUrl,
            id: u.value.id
          };
        })
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError('Please select a category');
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user');
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    };

    const project = {
      ...formData,
      comments: [],
      createdBy
    };
    await createProject(project);
  };
  useEffect(() => {
    if (response.success) {
      setFormData(formDataDefault);
      toast.success('Project added with success!');
    }
    if (response.error) {
      toast.error(response.error);
    }
  }, [response]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            type="text"
            onChange={handleChange}
            id="name"
            required
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            type="text"
            onChange={handleChange}
            id="details"
            value={details}
            required
          />
        </label>
        <label>
          <span>Set due Date:</span>
          <input
            type="date"
            onChange={handleChange}
            id="dueDate"
            required
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={selectChange}
            instanceId="category"
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            instanceId="assignedUsers"
            options={users}
            onChange={selectChange}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};
