import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

// Style
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// Pages and Components
import { Create } from './pages/Create/Create';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import { Project } from './pages/Project/Project';
import { SignUp } from './pages/SignUp/SignUp';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
 return (
  <div className='App'>
   <>
    <Sidebar />
    <div className='container'>
     <Navbar />
     <Routes>
      <Route exact path='/' element={<PrivateRoute />}>
       <Route path='/' element={<Dashboard />} />
      </Route>
      <Route exact path='/create' element={<PrivateRoute />}>
       <Route path='/create' element={<Create />} />
      </Route>
      <Route exact path='/projects/:id' element={<PrivateRoute />}>
       <Route path='/projects/:id' element={<Project />} />
      </Route>
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/sign-up' element={<SignUp />} />
     </Routes>
    </div>
    <ToastContainer />
   </>
  </div>
 );
}

export default App;
