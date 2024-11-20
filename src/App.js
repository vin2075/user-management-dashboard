import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import AddEditUser from './components/AddEditUser';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard users={users} setUsers={setUsers} />} />
        <Route path="/add-user" element={<AddEditUser users={users} setUsers={setUsers} />} />
        <Route path="/edit-user/:id" element={<AddEditUser users={users} setUsers={setUsers} />} />
      </Routes>
    </Router>
  );
}

export default App;
