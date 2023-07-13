import logo from './logo.svg';
import './App.css';
import UserForm from './component/userForm';
import { Route, Routes } from 'react-router-dom';
import UserList from './component/userList';
import EditUserForm from './component/editForm';

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserList />} />
      <Route path='/createUser' element={<UserForm />} />
      <Route path='/editUser/:id' element={<EditUserForm />} />
    </Routes>
  );
}

export default App;
