import { Route, Routes } from 'react-router-dom';

// Style
import './App.css';

// Pages and Components
import { Create } from './pages/Create/Create';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import { Project } from './pages/Project/Project';
import { SignUp } from './pages/SignUp/SignUp';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
 return (
  <div className='App'>
   <Sidebar />
   <div className='container'>
    <Navbar />
    <Routes>
     <Route exact path='/' element={<Dashboard />} />
     <Route exact path='/create' element={<Create />} />
     <Route exact path='/login' element={<Login />} />
     <Route exact path='/sign-up' element={<SignUp />} />
     <Route exact path='/projects/:id' element={<Project />} />
    </Routes>
   </div>
  </div>
 );
}

export default App;
