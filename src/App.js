import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

// Style
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages and Components
import { ToastContainer } from 'react-toastify';
import { Navbar } from './components/Navbar/Navbar';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Create } from './pages/Create/Create';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import { Project } from './pages/Project/Project';
import { SignUp } from './pages/SignUp/SignUp';
import { Users } from './components/Users/Users';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      {user && <Sidebar />}
      <div className="container">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/projects/:id" element={<Project />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
      {user && <Users />}
      <ToastContainer />
    </div>
  );
}

export default App;
